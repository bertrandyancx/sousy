# Sous-easy — Cooking Companion

Sous-easy is a voice-first cooking companion for newer cooks. It converts a recipe into detailed, timed, adaptive instructions and keeps the next action visible while the cook's hands are busy.

## Run locally

1. Create and activate a local environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

2. Copy `.env.example` to `.env` and add `PORTKEY_API_KEY` if you want to test the AI planner. Never commit `.env`.

3. Start the app:

   ```bash
   python app.py
   ```

4. Open <http://localhost:8000> on a phone or in a mobile-sized browser window.

## Deploy on Render

1. Push this project to a GitHub repository. Do not upload `.env`; add `PORTKEY_API_KEY` in Render's Environment settings.
2. In Render, choose **New → Blueprint** and select the repository. Render will detect `render.yaml`.
3. Set the `PORTKEY_API_KEY` secret when Render asks for it, then deploy.
4. Open the generated `https://sous-easy-....onrender.com` URL. Keep the Render service running; no local Terminal or Cloudflare Tunnel is needed.

The Render service uses the `PORT` assigned by Render, binds to all interfaces, and exposes `/api/health` for service checks.

The carbonara demo plan is available without an API key. The optional `/api/analyze` endpoint sends recipe planning requests through Portkey using `gpt-6-luna`.

The current social/account interactions are front-end prototypes: profile details, follows, saved inspirations, and dark mode persist in browser storage. Production email accounts and Google OAuth will require an authentication provider and server-side user storage.

## Voice features

The app uses the browser's Speech Synthesis and Speech Recognition APIs. Microphone access is required for listening mode. Wake Lock is requested while guided cooking is active when the browser supports it. A text and tap-based fallback remains available when browser voice features are unavailable.

## Seed recipe

The initial plan is based on [Simple pasta carbonara](https://www.bestrecipes.com.au/recipes/simple-pasta-carbonara-recipe/atxefq1n), supplied as the first test recipe. It is a 4-serving, approximately 30-minute recipe.
