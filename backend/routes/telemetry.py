from fastapi import APIRouter
from schemas.models import DashboardResponse, WeatherResponse, IrradianceResponse
from services.mock_data import MockDataService

router = APIRouter(tags=["Telemetry"])

@router.get("/dashboard", response_model=DashboardResponse)
def get_dashboard():
    return MockDataService.get_dashboard_data()

@router.get("/weather", response_model=WeatherResponse)
def get_weather():
    return MockDataService.get_dashboard_data().weather

@router.get("/solar-irradiance", response_model=IrradianceResponse)
def get_irradiance():
    return MockDataService.get_dashboard_data().irradiance
