from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any

# Authentication Schemas
class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)
    array_size: str = Field(default="residential")

class UserProfile(BaseModel):
    name: str
    email: EmailStr
    array_size: str

class AuthResponse(BaseModel):
    success: bool
    token: str
    user: UserProfile

# Telemetry Schemas
class WeatherResponse(BaseModel):
    condition: str
    temperature: float
    uv_index: int
    wind_speed: float
    cloud_coverage: int

class IrradianceResponse(BaseModel):
    ghi: int
    status: str
    percent: int

class Alert(BaseModel):
    id: int
    device: str
    msg: str
    severity: str
    time: str

class KPICard(BaseModel):
    title: str
    value: str
    desc: str
    trend: str

class DashboardResponse(BaseModel):
    kpis: List[KPICard]
    weather: WeatherResponse
    irradiance: IrradianceResponse
    alerts: List[Alert]
    health_score: float

# Analytics & Reports Schemas
class ArrayComparisonItem(BaseModel):
    name: str
    panel_type: str
    capacity: str
    daily_yield: str
    avg_temp: str
    status: str

class MonthlyDataPoint(BaseModel):
    name: str
    generation: float
    savings: float

class AnalyticsResponse(BaseModel):
    yield_comparison: List[ArrayComparisonItem]
    monthly_data: List[MonthlyDataPoint]

class ReportRequest(BaseModel):
    template: str
    scope: str
    period: str

class ReportRow(BaseModel):
    date: str
    ghi_index: str
    solar_yield: str
    co2_offsets: str
    earnings: str

class ReportResponse(BaseModel):
    status: str
    file_id: str
    download_url: str
    row_count: int
    data_preview: List[ReportRow]

# AI Assistant & CV Schemas
class ChatRequest(BaseModel):
    text: str

class ChatResponse(BaseModel):
    reply: str
    timestamp: str

class CVUploadResponse(BaseModel):
    success: bool
    filename: str
    scan_type: str
    risk_score: int
    severity: str
    desc: str
    anomalies: List[str]
    recommendations: List[str]
