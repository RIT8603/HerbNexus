from fastapi import APIRouter, UploadFile, File
from app.schemas.observation import AIIdentificationResponse
from app.services.ai_service import ai_service
from app.services.storage_service import storage_service

router = APIRouter(prefix="/ai", tags=["ai"])

@router.post("/identify", response_model=AIIdentificationResponse)
async def identify_image(file: UploadFile = File(...)):
    # Save file temporarily or permanently
    file_path = await storage_service.save_file(file)
    
    # Run mock identification
    result = ai_service.identify_species_mock(file.filename)
    return result
