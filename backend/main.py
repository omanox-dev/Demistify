
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends, status, Request as FastAPIRequest
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, ValidationError
from typing import Optional, List
import os
import logging
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from dotenv import load_dotenv
import google.generativeai as genai
import uvicorn
from fastapi import Request
import re
from sqlmodel import SQLModel, Field, Session, create_engine, select
from models import User

app = FastAPI()
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(429, _rate_limit_exceeded_handler)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("demistify")

@app.get("/")
def read_root():
    return {"message": "Demistify backend is running"}

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "demistify-secret-key")  # Loaded from .env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

# SQLite database setup
DATABASE_URL = "sqlite:///./demistify.db"
engine = create_engine(DATABASE_URL, echo=False)
SQLModel.metadata.create_all(engine)

class UserIn(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Utility functions
def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    from datetime import datetime, timedelta
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_user(email: str):
    with Session(engine) as session:
        statement = select(User).where(User.email == email)
        user = session.exec(statement).first()
        return user

def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(email)
    if user is None:
        raise credentials_exception
    return user

@app.post("/register", response_model=Token)
def register(user: UserIn):
    try:
        user = UserIn(email=user.email, password=user.password)
    except ValidationError as ve:
        logger.warning(f"Registration failed: Invalid email format: {user.email}")
        raise HTTPException(status_code=400, detail="Invalid email format")
    with Session(engine) as session:
        existing = get_user(user.email)
        if existing:
            logger.warning(f"Registration failed: Email already registered: {user.email}")
            raise HTTPException(status_code=400, detail="Email already registered")
        hashed = get_password_hash(user.password)
        db_user = User(email=user.email, hashed_password=hashed)
        session.add(db_user)
        session.commit()
        logger.info(f"User registered: {user.email}")
        access_token = create_access_token({"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        logger.warning(f"Login failed for email: {form_data.username}")
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    logger.info(f"User logged in: {form_data.username}")
    access_token = create_access_token({"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    return {"email": current_user.email}

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Clause Segmentation Endpoint ---
def rule_based_clause_segmentation(text: str) -> List[str]:
    """
    Simple rule-based segmentation: splits by numbered sections, bullet points, or double newlines.
    This can be improved with NLP in future versions.
    """
    # Split by section numbers (e.g., 1., 2., 3.), bullet points, or double newlines
    clauses = re.split(r"(?:\n\d+\.\s|\n-\s|\n\*\s|\n{2,})", text)
    # Remove empty clauses and strip whitespace
    return [clause.strip() for clause in clauses if clause.strip()]

# Rule-based risk detection for clauses
def detect_risk_for_clause(clause: str) -> str:
    clause_lower = clause.lower()
    high_risk_keywords = ["penalty", "termination", "liability", "indemnify", "breach", "forfeit", "waiver"]
    medium_risk_keywords = ["notice", "amendment", "dispute", "arbitration", "late fee", "interest"]
    if any(word in clause_lower for word in high_risk_keywords):
        return "High"
    elif any(word in clause_lower for word in medium_risk_keywords):
        return "Medium"
    else:
        return "Low"

@app.post("/segment_clauses")
async def segment_clauses(request: Request):
    data = await request.json()
    text = data.get("text", "")
    # Use rule-based segmentation for now
    clauses = rule_based_clause_segmentation(text)
    clause_data = []
    # Try AI-based risk detection if GenAI API key is set
    from dotenv import load_dotenv
    import os
    load_dotenv()
    GOOGLE_GENAI_API_KEY = os.getenv("GOOGLE_GENAI_API_KEY", "")
    use_ai = bool(GOOGLE_GENAI_API_KEY)
    if use_ai:
        import google.generativeai as genai
        genai.configure(api_key=GOOGLE_GENAI_API_KEY)
        # Always use 'models/gemini-1.5-flash-latest' for GenAI output
        try:
            model = genai.GenerativeModel('models/gemini-1.5-flash-latest')
            for clause in clauses:
                prompt = f"Analyze the following legal clause and assign a risk level (Low, Medium, High):\n\nClause: {clause}"
                try:
                    response = model.generate_content(prompt)
                    ai_text = response.text if hasattr(response, 'text') else str(response)
                    # Extract risk from AI response (simple parsing)
                    risk = "Low"
                    if "high" in ai_text.lower():
                        risk = "High"
                    elif "medium" in ai_text.lower():
                        risk = "Medium"
                    clause_data.append({"clause": clause, "risk": risk, "ai_explanation": ai_text})
                except Exception as e:
                    clause_data.append({"clause": clause, "risk": "Unknown", "ai_explanation": f"AI error: {str(e)}"})
            return {"clauses": clause_data}
        except Exception as e:
            pass  # fallback to rule-based if AI fails
    # Fallback: rule-based risk detection
    for clause in clauses:
        risk = detect_risk_for_clause(clause)
        clause_data.append({"clause": clause, "risk": risk, "ai_explanation": "[Mocked AI] Rule-based risk assigned."})
    return {"clauses": clause_data}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    # For MVP, just return file name and size
    return {"filename": file.filename, "size": len(content)}


# Load API key from .env or environment
load_dotenv()
GOOGLE_GENAI_API_KEY = os.getenv("GOOGLE_GENAI_API_KEY", "")

from slowapi.errors import RateLimitExceeded

@app.post("/simplify")
@limiter.limit("5/minute")
async def simplify(request: FastAPIRequest, text: str = Form(...), current_user: User = Depends(get_current_user)):
    # Input validation: limit text length and basic sanitization
    if not isinstance(text, str) or len(text) < 10:
        logger.warning(f"Simplify failed: Text too short")
        raise HTTPException(status_code=400, detail="Text is too short for simplification.")
    if len(text) > 10000:
        logger.warning(f"Simplify failed: Text too long")
        raise HTTPException(status_code=400, detail="Text is too long. Limit to 10,000 characters.")
    # Remove dangerous characters (basic sanitization)
    text = text.replace("\x00", " ").replace("\r", " ")
    if not GOOGLE_GENAI_API_KEY:
        simplified = f"[SIMPLIFIED] {text[:200]}... (No API key set)"
        summary = f"[SUMMARY] {text[:100]}... (No API key set)"
        return {"simplified": simplified, "summary": summary}
    try:
        genai.configure(api_key=GOOGLE_GENAI_API_KEY)
        # List available models for this API key
        available_models = []
        try:
            models = genai.list_models()
            available_models = [m.name for m in models]
            logger.info(f"Available GenAI models: {available_models}")
        except Exception as e:
            logger.warning(f"Could not list GenAI models: {e}")
            available_models = []

        # Always use 'models/gemini-1.5-flash-latest' for GenAI output
        try:
            model = genai.GenerativeModel('models/gemini-1.5-flash-latest')
            prompt = f"Simplify and summarize the following legal document in plain English.\n\nDocument:\n{text}"
            response = model.generate_content(prompt)
            ai_text = response.text if hasattr(response, 'text') else str(response)
            simplified = ai_text
            summary = ai_text[:min(300, len(ai_text))] + ("..." if len(ai_text) > 300 else "")
        except Exception as e:
            logger.warning(f"GenAI error: {e}")
            simplified = f"[SIMPLIFIED MOCK] {text[:200]}... (AI unavailable)"
            summary = f"[SUMMARY MOCK] {text[:100]}... (AI unavailable)"
        logger.info(f"AI summary generated for user: {getattr(current_user, 'email', 'unknown')}")
        return {"simplified": simplified, "summary": summary}
    except Exception as e:
        logger.error(f"AI error: {str(e)}")
        return JSONResponse(status_code=500, content={"error": str(e)})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
