from fastapi import APIRouter, UploadFile, File, Form
from schemas.models import ChatRequest, ChatResponse, ReportRequest, ReportResponse, CVUploadResponse
from services.mock_data import MockDataService

router = APIRouter(tags=["Operations"])

@router.post("/cv/upload", response_model=CVUploadResponse)
async def upload_cv_image(
    file: UploadFile = File(...),
    scan_type: str = Form("thermal") # Accepts form parameters matching multipart/form-data
):
    # Retrieve filename and simulate CV analysis
    filename = file.filename or "unknown_panel_scan.jpg"
    return MockDataService.process_cv_upload(filename, scan_type)

@router.post("/ai/chat", response_model=ChatResponse)
def ai_chat(payload: ChatRequest):
    return MockDataService.process_chat(payload.text)

@router.post("/reports/generate", response_model=ReportResponse)
def generate_report(payload: ReportRequest):
    return MockDataService.generate_report(payload.template, payload.scope, payload.period)
