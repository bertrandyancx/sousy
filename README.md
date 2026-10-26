# Sous-easy — Cooking Companion

Live app: <https://sous-easy.onrender.com>

Sous-easy is a voice-first kitchen expeditor for newer cooks. It turns a URL, PDF, or recipe photo into exact, timed, beginner-friendly instructions, coordinates recipe components such as sauce, protein, and starch, monitors safety and timing, and adapts when the cook reports a problem.

## Run locally

From the project folder:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Open <http://localhost:8000>. The server also accepts the `PORT` environment variable.

The app loads secrets from `.env` in the project folder first and then from the parent folder. For the course setup, put `.env` one level above this repo as described in the project requirements. Never commit a real `.env` or API key.

Copy `.env.example` to `.env` when working locally. `PORTKEY_API_KEY` is required for recipe planning. `SUPABASE_URL` and `SUPABASE_ANON_KEY` enable real accounts and social features; if they are absent locally, the login screen exposes an explicit local-demo button. Production Render has the Supabase values configured.

## Validate the model connection

```bash
python test_luna.py
```

The test sends one safe connectivity request through Portkey using `gpt-6-luna`. It does not print the API key.

## Agent architecture

Each planning run is bounded to eight model calls and follows this pipeline:

1. Recipe Reader Agent extracts trusted cooking facts from untrusted URL/PDF/image text.
2. Component Agents work on parallel stations such as sauce, protein, starch, and garnish.
3. Safety Auditor identifies cross-contamination, heat, timing, and equipment hazards.
4. Kitchen Expeditor combines the station plans into one dependency-aware schedule.
5. The browser scheduler controls timers, wake lock, voice, and user completion; the model never directly controls a stove or device.
6. Recovery Agent revises the next actions when the cook reports a problem.

The `/api/metrics` endpoint reports real run and token counts without exposing secrets. AI requests have a per-run call budget, input-size limits, and a simple rate limit. The planner validates the returned JSON before it reaches the browser scheduler.

## Voice and safety

The browser uses Speech Synthesis and Speech Recognition. If microphone permission is unavailable, the app switches to manual completion. Wake Lock is requested during guided cooking when supported. Urgent heat and smoke reports trigger a deterministic safety action before any recovery-agent response.

Recipe source text is treated as untrusted data. The application rejects common embedded role changes, secret requests, and tool instructions before planning, and the prompts repeat that boundary. The model can propose a plan, but the application owns timers, dependencies, safety overrides, and the final next action.

## Deployment on Render

The repository includes `render.yaml`. Create a Render Blueprint from the GitHub repository, then add these environment variables in the service:

- `PORTKEY_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Render supplies `PORT`; the app binds to all interfaces and exposes `/api/health`.

## Test flow

1. Open the live URL and create an account or use the local demo only during local development.
2. Import the carbonara test URL or another recipe.
3. Confirm the exact ingredient amounts, component plan, equipment, and detailed steps.
4. Start cooking and report a normal completion plus one issue such as “the sauce is too thick.”
5. Confirm the recovery warning and revised next action.
6. Finish the plan and confirm the recipe moves from New Recipes to Past recipes.
7. Check `/api/metrics` and record the token counts for the report.
