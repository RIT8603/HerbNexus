from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional
from app.models.observation import VerificationStatus
from app.schemas.user import UserResponse
from app.schemas.species import SpeciesResponse

class ReviewBase(BaseModel):
    status: VerificationStatus
    species_id_confirmed: Optional[UUID] = None
    comments: Optional[str] = None

class ReviewCreate(ReviewBase):
    pass

class ReviewResponse(ReviewBase):
    id: UUID
    observation_id: UUID
    expert_id: UUID
    created_at: datetime
    
    expert: Optional[UserResponse] = None
    species_confirmed: Optional[SpeciesResponse] = None
    
    model_config = ConfigDict(from_attributes=True)
