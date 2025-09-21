# Demystify Backend

This is the FastAPI backend for Demystify: AI-Powered Legal Document Simplifier.

# Demistify Backend

This describes how to run and develop the FastAPI backend for Demistify.

## Requirements
- Python 3.11+
- A virtual environment (recommended)

## Install
1. Create and activate a virtual environment:

   python -m venv .venv
   .\\.venv\\Scripts\\Activate.ps1   # PowerShell

2. Install dependencies (create `requirements.txt` if missing):

   pip install -r requirements.txt

## Environment
Create a `.env` file in the `backend/` folder (do NOT commit it). Example variables are in `../.env.example`.

Required environment variables:

- SECRET_KEY - JWT secret key used by the backend
- GOOGLE_GENAI_API_KEY - (optional) API key for Google GenAI (Gemini) integration
- DATABASE_URL - (optional) SQLite URL, default: `sqlite:///./demistify.db`

## Run locally

From the `backend/` folder:

   uvicorn main:app --reload --host 0.0.0.0 --port 8000

The API will be available at `http://localhost:8000/`.

## API endpoints (summary)
- GET / - health check
- POST /register - register a new user. JSON body: `{ "email": "...", "password": "..." }`.
- POST /login - OAuth2 password flow. `application/x-www-form-urlencoded` with `username` and `password`.
- GET /me - returns current user (requires Bearer token)
- POST /segment_clauses - JSON `{ "text": "..." }` returns segmented clauses and risk
- POST /upload - file upload (multipart/form-data)
- POST /simplify - protected endpoint (form param `text`) returns `simplified` and `summary` (rate-limited)

## Tests
Run tests from the repo root (pytest will discover backend tests):

   pytest -q

Note: `test_genai_model_support.py` requires a valid `GOOGLE_GENAI_API_KEY`.

## Notes
- Do NOT commit `.env` or `demistify.db` containing real data.
- If you need to purge secrets from git history, use `git-filter-repo` or BFG (ask for help).
