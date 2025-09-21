# Google Gen AI Integration

To use Google Gen AI (Gemini/PaLM) for document simplification, add your API key as an environment variable or directly in the code where indicated.

## How to Add Your API Key
1. Get your API key from Google Cloud Console (after enabling the Gen AI API).
2. Add it to a `.env` file in the backend directory as:
   ```
   GOOGLE_GENAI_API_KEY=your-key-here
   ```
   Or, paste it directly in the code where marked.

## Integration Details
- The backend will call Google Gen AI API to simplify and summarize text.
- You can use the `google.generativeai` Python package for Gemini/PaLM.

---

**Note:** Do not commit your API key to public repositories.
