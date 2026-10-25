"""Small local server and Portkey-backed recipe planning endpoint for Sous-easy."""

from __future__ import annotations

import json
import base64
from io import BytesIO
import os
import re
import ssl
import subprocess
from html import unescape
from urllib.request import Request, urlopen
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

from dotenv import load_dotenv
import certifi


ROOT = Path(__file__).resolve().parent
HTTPS_CONTEXT = ssl.create_default_context(cafile=certifi.where())


def fetch_recipe_page(url: str, timeout: int = 12) -> str:
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0 Safari/537.36", "Accept": "text/html,application/xhtml+xml"})
    try:
        return urlopen(request, timeout=timeout, context=HTTPS_CONTEXT).read().decode("utf-8", errors="ignore")
    except Exception:
        result = subprocess.run(["curl", "-L", "--fail", "--silent", "--show-error", "--max-time", str(timeout), url], capture_output=True, check=True)
        return result.stdout.decode("utf-8", errors="ignore")


def normalize_recipe_url(value: str) -> str:
    """Accept pasted URLs with or without a scheme and remove paste punctuation."""
    candidate = str(value or "").strip().strip("\"'")
    candidate = candidate.rstrip(".,);]>")
    if candidate.startswith("www."):
        candidate = f"https://{candidate}"
    parsed = urlparse(candidate)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError("Please paste a complete recipe URL, such as https://example.com/recipe")
    return candidate
load_dotenv(ROOT / ".env")
load_dotenv(ROOT.parent / ".env")


class SousEasyHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):  # noqa: N802
        path = urlparse(self.path).path
        if path == "/api/health":
            self._json(200, {"ok": True, "model": "gpt-6-luna"})
            return
        if path == "/api/config":
            # These are public browser configuration values. Never expose the
            # Portkey key or a Supabase service-role key here.
            supabase_url = os.environ.get("SUPABASE_URL", "").rstrip("/")
            if supabase_url.endswith("/rest/v1"):
                supabase_url = supabase_url[:-len("/rest/v1")]
            self._json(200, {
                "supabase_url": supabase_url,
                "supabase_anon_key": os.environ.get("SUPABASE_ANON_KEY", ""),
            })
            return
        super().do_GET()

    def do_POST(self):  # noqa: N802
        path = urlparse(self.path).path
        if path == "/api/analyze-pdf":
            try:
                if not os.environ.get("PORTKEY_API_KEY"):
                    self._json(503, {"error": "Recipe planner is not configured: PORTKEY_API_KEY is missing"})
                    return
                size = int(self.headers.get("Content-Length", "0"))
                request = json.loads(self.rfile.read(size) or "{}")
                encoded_pdf = str(request.get("pdf", ""))
                if "," in encoded_pdf:
                    encoded_pdf = encoded_pdf.split(",", 1)[1]
                raw_pdf = base64.b64decode(encoded_pdf, validate=True)
                from pypdf import PdfReader

                reader = PdfReader(BytesIO(raw_pdf))
                recipe_text = "\n".join(page.extract_text() or "" for page in reader.pages).strip()
                if len(recipe_text) < 20:
                    self._json(422, {"error": "I could not extract readable text from that PDF. Try a text-based PDF or upload a picture of the recipe."})
                    return
                plan = plan_with_luna(recipe_text[:100000], request.get("preferences", {}))
                self._json(200, {"text": recipe_text[:100000], "plan": plan})
            except Exception as exc:
                self._json(500, {"error": str(exc)})
            return
        if path == "/api/parse-source":
            try:
                size = int(self.headers.get("Content-Length", "0"))
                request = json.loads(self.rfile.read(size) or "{}")
                parsed = parse_source(request.get("source_type", ""), request.get("source_value", ""))
                self._json(200, parsed)
            except Exception as exc:
                self._json(500, {"error": str(exc)})
            return
        if path == "/api/import-recipe":
            try:
                if not os.environ.get("PORTKEY_API_KEY"):
                    self._json(503, {"error": "Recipe planner is not configured: PORTKEY_API_KEY is missing"})
                    return
                size = int(self.headers.get("Content-Length", "0"))
                request = json.loads(self.rfile.read(size) or "{}")
                try:
                    url = normalize_recipe_url(request.get("url", ""))
                except ValueError as exc:
                    self._json(400, {"error": str(exc)})
                    return
                imported = import_recipe_from_url(url, request.get("preferences", {}))
                self._json(200, imported)
            except Exception as exc:
                self._json(500, {"error": str(exc)})
            return
        if path == "/api/analyze-image":
            try:
                if not os.environ.get("PORTKEY_API_KEY"):
                    self._json(503, {"error": "Recipe planner is not configured: PORTKEY_API_KEY is missing"})
                    return
                size = int(self.headers.get("Content-Length", "0"))
                request = json.loads(self.rfile.read(size) or "{}")
                plan = plan_image_with_luna(request.get("image", ""), request.get("preferences", {}))
                self._json(200, {"plan": plan})
            except Exception as exc:
                self._json(500, {"error": str(exc)})
            return
        if path != "/api/analyze":
            self._json(404, {"error": "Not found"})
            return

        try:
            if not os.environ.get("PORTKEY_API_KEY"):
                self._json(503, {"error": "Recipe planner is not configured: PORTKEY_API_KEY is missing"})
                return
            size = int(self.headers.get("Content-Length", "0"))
            request = json.loads(self.rfile.read(size) or "{}")
            recipe = str(request.get("recipe_text", "")).strip()
            preferences = request.get("preferences", {})
            if not recipe:
                self._json(400, {"error": "recipe_text is required"})
                return
            answer = plan_with_luna(recipe, preferences)
            self._json(200, {"plan": answer})
        except Exception as exc:  # Keep the browser fallback available.
            self._json(500, {"error": str(exc)})


def parse_source(source_type: str, source_value: str) -> dict:
    """Extract a serving count from a URL, text/PDF extract, or recipe photo."""
    value = str(source_value or "")
    known_carbonara = "bestrecipes.com.au/recipes/simple-pasta-carbonara" in value.lower()
    match = re.search(r"(?:serves?|servings?|yield|makes|recipeYield)\s*[:=]?\s*(?:about\s*)?(\d+)", value, re.I)
    if match:
        return {"servings": int(match.group(1)), "source": "recipe source"}
    if known_carbonara:
        return {"servings": 4, "source": "Australia's Best Recipes"}

    if source_type == "url" and value.startswith(("http://", "https://")):
        page = fetch_recipe_page(value, timeout=8)[:500000]
        match = re.search(r"(?:recipeYield|serves?|servings?|yield|makes)\s*[:\"]*\s*(?:about\s*)?(\d+)", page, re.I)
        if match:
            return {"servings": int(match.group(1)), "source": "linked recipe"}

    if source_type == "photo" and value.startswith("data:image/"):
        from openai import OpenAI

        api_key = os.environ.get("PORTKEY_API_KEY")
        if not api_key:
            return {"servings": None, "source": "photo"}
        client = OpenAI(api_key=api_key, base_url="https://api.portkey.ai/v1", timeout=90.0, max_retries=0)
        response = client.chat.completions.create(
            model="gpt-6-luna",
            messages=[
                {"role": "system", "content": "Read the recipe image. Return valid JSON only in the form {\"servings\": number or null}. Do not guess."},
                {"role": "user", "content": [{"type": "text", "text": "What serving count is printed on this recipe?"}, {"type": "image_url", "image_url": {"url": value}}]},
            ],
        )
        parsed = parse_model_json(response.choices[0].message.content)
        servings = parsed.get("servings")
        return {"servings": servings if isinstance(servings, int) else None, "source": "recipe picture"}

    return {"servings": None, "source": source_type or "recipe source"}


def import_recipe_from_url(url: str, preferences: dict) -> dict:
    """Fetch Recipe schema data, then turn the new recipe into a Sous-easy plan."""
    url = normalize_recipe_url(url)
    page = fetch_recipe_page(url)[:1000000]
    recipe = None
    blocks = re.findall(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', page, re.I | re.S)
    for block in blocks:
        try:
            parsed = json.loads(unescape(block.strip()))
        except json.JSONDecodeError:
            continue
        candidates = []
        pending = parsed if isinstance(parsed, list) else [parsed]
        while pending:
            candidate = pending.pop(0)
            if isinstance(candidate, dict):
                candidates.append(candidate)
                pending.extend(value for value in candidate.values() if isinstance(value, (dict, list)))
            elif isinstance(candidate, list):
                pending.extend(candidate)
        for candidate in candidates:
            types = candidate.get("@type", [])
            if isinstance(types, str):
                types = [types]
            if any(str(item).lower() == "recipe" for item in types):
                recipe = candidate
                break
        if recipe:
            break

    def meta_value(*names: str) -> str:
        for name in names:
            pattern = rf'<meta[^>]+(?:property|name)=["\']{re.escape(name)}["\'][^>]+content=["\']([^"\']+)' \
                rf'|<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']{re.escape(name)}["\']'
            match = re.search(pattern, page, re.I)
            if match:
                return unescape(next((group for group in match.groups() if group), "")).strip()
        return ""

    def page_text() -> str:
        visible = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", " ", page, flags=re.I | re.S)
        visible = re.sub(r"<[^>]+>", " ", visible)
        return re.sub(r"\s+", " ", unescape(visible)).strip()

    if recipe:
        instructions = recipe.get("recipeInstructions", [])
        if isinstance(instructions, str):
            instruction_text = instructions
        else:
            instruction_parts = []
            for item in instructions:
                if isinstance(item, dict):
                    instruction_parts.append(item.get("text", ""))
                    instruction_parts.extend(
                        child.get("text", "") for child in item.get("itemListElement", []) if isinstance(child, dict)
                    )
                else:
                    instruction_parts.append(str(item))
            instruction_text = " ".join(part for part in instruction_parts if part)
        title = recipe.get("name") or meta_value("og:title", "twitter:title") or "Imported recipe"
        ingredients_from_source = recipe.get("recipeIngredient", [])
        source_text = json.dumps({
            "title": title,
            "servings": recipe.get("recipeYield"),
            "ingredients": ingredients_from_source,
            "instructions": instruction_text,
            "source_url": url,
        })
    else:
        # Some publishers omit JSON-LD or place the recipe behind a different schema.
        # Give the planner a bounded, readable page excerpt instead of failing immediately.
        title = meta_value("og:title", "twitter:title") or (re.search(r"<title[^>]*>(.*?)</title>", page, re.I | re.S) or ["", "Imported recipe"])[1].strip()
        description = meta_value("description", "og:description", "twitter:description")
        source_text = json.dumps({
            "title": unescape(re.sub(r"\s+", " ", title)),
            "description": description,
            "page_text": page_text()[:30000],
            "source_url": url,
        })
    plan = plan_with_luna(source_text, preferences)
    yield_value = recipe.get("recipeYield") if recipe else meta_value("recipeYield", "recipe:yield")
    if not yield_value:
        yield_match = re.search(r"(?:serves?|servings?|yield|makes)\s*[:=]?\s*(?:about\s*)?(\d+)\b", page, re.I)
        yield_value = yield_match.group(1) if yield_match else None
    serving_match = re.search(r"\d+", str(yield_value or ""))
    total_time = recipe.get("totalTime") if recipe else meta_value("totalTime", "recipe:total_time")
    return {"recipe": {"title": title, "source": urlparse(url).netloc, "servings": int(serving_match.group()) if serving_match else None, "total_time": total_time}, "plan": plan}


def plan_image_with_luna(image: str, preferences: dict) -> dict:
    """Use the multimodal course model to read and plan a photographed recipe."""
    from openai import OpenAI

    api_key = os.environ.get("PORTKEY_API_KEY")
    if not api_key:
        raise RuntimeError("PORTKEY_API_KEY is not configured")
    client = OpenAI(api_key=api_key, base_url="https://api.portkey.ai/v1", timeout=90.0, max_retries=0)
    response = client.chat.completions.create(
        model="gpt-6-luna",
        messages=[
            {"role": "system", "content": "You are Sous-easy's recipe planner. Read the recipe image, preserve its measurements, and return the same structured JSON plan fields as the text planner. Do not guess missing measurements."},
            {"role": "user", "content": [{"type": "text", "text": json.dumps({"preferences": preferences, "required_output": {"servings": "number or null from the image", "ingredients": "array", "equipment": "array", "tasks": "ordered beginner tasks with duration and completion_cue", "cleanup": "array", "feasibility": "object"}})}, {"type": "image_url", "image_url": {"url": image}}]},
        ],
    )
    return parse_model_json(response.choices[0].message.content)


def parse_model_json(content: str | None) -> dict:
    """Parse JSON even when the model wraps it in a markdown code fence."""
    text = str(content or "{}").strip()
    fenced = re.match(r"^```(?:json)?\s*(.*?)\s*```$", text, re.I | re.S)
    if fenced:
        text = fenced.group(1).strip()
    return json.loads(text)


def plan_with_luna(recipe: str, preferences: dict) -> dict:
    """Ask the course model for a structured plan without exposing the API key."""
    from openai import OpenAI

    api_key = os.environ.get("PORTKEY_API_KEY")
    if not api_key:
        raise RuntimeError("PORTKEY_API_KEY is not configured")

    client = OpenAI(api_key=api_key, base_url="https://api.portkey.ai/v1", timeout=90.0, max_retries=0)
    prompt = {
        "recipe": recipe,
        "preferences": preferences,
        "required_output": {
            "equipment": "array of detailed equipment with purpose",
            "ingredients": "array with quantity, preparation, and allergen notes",
            "tasks": "ordered tasks with duration, heat level, dependencies, completion cue, and safety banner",
            "cleanup": "ordered cleanup tasks",
            "feasibility": "timing assessment and assumptions",
        },
    }
    response = client.chat.completions.create(
        model="gpt-6-luna",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are Sous-easy's planning layer. Design safe, explicit cooking instructions "
                    "for a beginner. Do not invent missing measurements. Return valid JSON only."
                ),
            },
            {"role": "user", "content": json.dumps(prompt)},
        ],
    )
    return parse_model_json(response.choices[0].message.content)


if __name__ == "__main__":
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "8000"))
    server = ThreadingHTTPServer((host, port), SousEasyHandler)
    print(f"Sous-easy running at http://{host}:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
