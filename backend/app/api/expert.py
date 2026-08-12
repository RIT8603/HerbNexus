from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database import get_db
from app.models.user import User, Role
from app.schemas.review import ReviewCreate, ReviewResponse
from app.auth.jwt import require_role, get_current_user
from app.services.review_service import review_service

router = APIRouter(prefix="/expert", tags=["expert"])

@router.post("/reviews/{observation_id}", response_model=ReviewResponse)
async def create_review(
    observation_id: str,
    review_in: ReviewCreate,
    current_user: User = Depends(require_role([Role.EXPERT, Role.ADMIN])),
    db: AsyncSession = Depends(get_db)
):
    return await review_service.create_review(db, review_in, observation_id, current_user.id)

@router.get("/reviews/history", response_model=List[ReviewResponse])
async def get_review_history(
    current_user: User = Depends(require_role([Role.EXPERT, Role.ADMIN])),
    db: AsyncSession = Depends(get_db)
):
    return await review_service.get_reviews(db, expert_id=current_user.id)
