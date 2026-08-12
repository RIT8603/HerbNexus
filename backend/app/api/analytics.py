from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from app.database import get_db
from app.schemas.analytics import DashboardStats, TrendsByYear, SpeciesDistribution, ThreatSummary, VerificationStats
from app.services.analytics_service import analytics_service

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/dashboard-stats", response_model=DashboardStats)
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    return await analytics_service.get_dashboard_stats(db)

@router.get("/trends", response_model=TrendsByYear)
async def get_trends(species_id: Optional[str] = Query(None), db: AsyncSession = Depends(get_db)):
    return await analytics_service.get_trends(db, species_id)

@router.get("/species-distribution", response_model=SpeciesDistribution)
async def get_species_distribution(db: AsyncSession = Depends(get_db)):
    return await analytics_service.get_species_distribution(db)

@router.get("/threat-summary", response_model=ThreatSummary)
async def get_threat_summary(db: AsyncSession = Depends(get_db)):
    return await analytics_service.get_threat_summary(db)

@router.get("/verification-stats", response_model=VerificationStats)
async def get_verification_stats(db: AsyncSession = Depends(get_db)):
    return await analytics_service.get_verification_stats(db)
