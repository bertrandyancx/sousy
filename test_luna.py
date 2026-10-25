"""Connectivity check for the course model through Portkey."""

import os
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI


load_dotenv(Path(__file__).resolve().parent / ".env")
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

client = OpenAI(
    api_key=os.environ["PORTKEY_API_KEY"],
    base_url="https://api.portkey.ai/v1",
)
response = client.chat.completions.create(
    model="gpt-6-luna",
    messages=[{"role": "user", "content": "Reply with the single word: connected"}],
)
print(response.choices[0].message.content)

