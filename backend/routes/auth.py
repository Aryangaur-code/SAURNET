from fastapi import APIRouter, HTTPException, status
from schemas.models import LoginRequest, RegisterRequest, AuthResponse, UserProfile

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest):
    # Mock authentication validation
    if payload.email == "sujata@saurnet.com" and payload.password == "password":
        user = UserProfile(name="Sujata Patel", email=payload.email, array_size="residential")
        return AuthResponse(success=True, token="mock_jwt_token_sujata", user=user)
    elif payload.password == "password123":
        user = UserProfile(name="Demo User", email=payload.email, array_size="commercial")
        return AuthResponse(success=True, token="mock_jwt_token_demo", user=user)
    
    # Generic login success for any user for ease of mockup testing
    user = UserProfile(name=payload.email.split("@")[0].capitalize(), email=payload.email, array_size="residential")
    return AuthResponse(success=True, token="mock_jwt_token_generic", user=user)

@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterRequest):
    user = UserProfile(name=payload.name, email=payload.email, array_size=payload.array_size)
    return AuthResponse(success=True, token="mock_jwt_token_registered", user=user)
