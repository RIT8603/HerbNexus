from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database import get_db
from app.models.user import User
from app.schemas.threat import ThreatCreate, ThreatResponse
from app.auth.jwt import get_current_user
from app.services.threat_service import threat_service

router = APIRouter(prefix="/threats", tags=["threats"])

@router.post("/", response_model=ThreatResponse)
async def create_threat(
    threat_in: ThreatCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await threat_service.create_threat(db, threat_in, current_user.id)

@router.get("/", response_model=List[ThreatResponse])
async def get_threats(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await threat_service.get_threats(db, skip, limit)
