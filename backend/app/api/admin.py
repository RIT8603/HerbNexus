from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.database import get_db
from app.models.user import User, Role
from app.schemas.user import UserResponse
from app.auth.jwt import require_role

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/users", response_model=List[UserResponse])
async def list_users(
    skip: int = 0, 
    limit: int = 100, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_role([Role.ADMIN]))
):
    result = await db.execute(select(User).offset(skip).limit(limit))
    return result.scalars().all()
