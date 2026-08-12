from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Any

from app.database import get_db
from app.schemas.conservation import ConservationScoreResponse
from app.services.conservation_service import conservation_service

router = APIRouter(prefix="/conservation", tags=["conservation"])

@router.get("/priorities", response_model=List[ConservationScoreResponse])
async def get_priorities(db: AsyncSession = Depends(get_db)):
    return await conservation_service.get_all_priorities(db)

@router.get("/priorities/{species_id}", response_model=ConservationScoreResponse)
async def get_priority(species_id: str, db: AsyncSession = Depends(get_db)):
    score = await conservation_service.get_priority_by_species(db, species_id)
    if not score:
        raise HTTPException(status_code=404, detail="Priority score not found")
    return score

@router.post("/calculate/{species_id}", response_model=ConservationScoreResponse)
async def calculate_score(species_id: str, db: AsyncSession = Depends(get_db)):
    return await conservation_service.calculate_species_score(db, species_id)

@router.get("/recommendations")
async def get_recommendations(db: AsyncSession = Depends(get_db)) -> List[Any]:
    return await conservation_service.get_recommendations(db)
