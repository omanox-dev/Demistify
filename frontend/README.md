# Demistify Frontend (React + Vite)

This is the React frontend for Demistify (Vite + React + MUI).

## Requirements

- Node.js 18+ and npm (or yarn)

## Setup

1. From the `frontend/` folder install dependencies:

   npm install

2. Start the dev server:

   npm run dev

3. Build for production:

   npm run build

4. Lint the code:

   npm run lint

## Environment / API URL

- The frontend expects the backend API to be available at `http://localhost:8000` by default.
- If you run the backend on a different host or port, update the fetch URLs in `src/*` or set up a small proxy in `vite.config.js`.

## Notes

- Do not commit `node_modules/` or local environment files.
- The frontend stores JWT tokens in `localStorage` (MVP). For production consider secure http-only cookies.
- The `FileUpload` component accepts PDF, DOC, DOCX, TXT and enforces a 10MB max file size by default.
