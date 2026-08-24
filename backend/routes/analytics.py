from fastapi import APIRouter
from typing import List
from schemas.models import AnalyticsResponse, Alert
from services.mock_data import MockDataService

router = APIRouter(tags=["Analytics & Alerts"])

@router.get("/analytics", response_model=AnalyticsResponse)
def get_analytics():
    return MockDataService.get_analytics_data()

@router.get("/alerts", response_model=List[Alert])
def get_alerts():
    return MockDataService.get_alerts()
