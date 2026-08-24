import sys
import os

# Ensure backend directory is in python module path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, telemetry, analytics, operations

app = FastAPI(
    title="SaurNet AI API",
    description="Backend microservices for AI-powered Solar Energy Management Platform",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Modular Routers
app.include_router(auth.router)
app.include_router(telemetry.router)
app.include_router(analytics.router)
app.include_router(operations.router)

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "service": "SaurNet AI API",
        "version": "1.0.0",
        "endpoints": [
            "/auth/login",
            "/auth/register",
            "/dashboard",
            "/analytics",
            "/alerts",
            "/weather",
            "/solar-irradiance",
            "/cv/upload",
            "/ai/chat",
            "/reports/generate"
        ]
    }
