# Demystify Backend

This is the FastAPI backend for Demystify: AI-Powered Legal Document Simplifier.

## Features
- Upload legal documents (PDF, DOCX, TXT)
- AI-powered simplification and summarization endpoints
- Connects to Google Gen AI API (integration required)

## Setup
1. Create a virtual environment:
   ```sh
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```
2. Install dependencies:
   ```sh
   pip install fastapi uvicorn python-multipart
   ```
3. Run the server:
   ```sh
   uvicorn main:app --reload
   ```

## Endpoints
- `POST /upload` - Upload a legal document
- `POST /simplify` - Simplify and summarize document content

## Note
- Google Gen AI API integration is required for full functionality. Add your API key and integration code in `main.py`.
