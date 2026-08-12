from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.database import get_db
from app.models.user import User
from app.schemas.observation import ObservationCreate, ObservationResponse
from app.auth.jwt import get_current_user
from app.services.observation_service import observation_service

router = APIRouter(prefix="/observations", tags=["observations"])

# Helper dependency to allow optional authentication
async def get_optional_user(db: AsyncSession = Depends(get_db)) -> Optional[User]:
    # In a real scenario, this would try to parse the token but not fail if absent
    # For simplicity, returning None for now unless we implement proper optional auth
    return None

@router.post("/", response_model=ObservationResponse)
async def create_observation(
    obs_in: ObservationCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await observation_service.create_observation(db, obs_in, current_user.id)

@router.get("/", response_model=List[ObservationResponse])
async def get_observations(
    skip: int = 0, 
    limit: int = 100, 
    # Use optional user to determine privacy
    db: AsyncSession = Depends(get_db)
):
    # Pass None for user for now (Public view)
    return await observation_service.get_observations(db, None, skip, limit)

@router.get("/{obs_id}", response_model=ObservationResponse)
async def get_observation(
    obs_id: str,
    db: AsyncSession = Depends(get_db)
):
    return await observation_service.get_observation_by_id(db, obs_id, None)
