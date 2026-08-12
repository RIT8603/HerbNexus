from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional
from app.models.threat import ThreatType, Severity
from app.models.observation import VerificationStatus
from app.schemas.user import UserResponse

class ThreatBase(BaseModel):
    latitude: float
    longitude: float
    threat_type: ThreatType
    severity: Severity
    title: str
    description: str
    photo_url: Optional[str] = None

class ThreatCreate(ThreatBase):
    pass

class ThreatResponse(ThreatBase):
    id: UUID
    reporter_id: UUID
    verification_status: VerificationStatus
    reported_date: datetime
    is_demo: bool
    created_at: datetime
    
    reporter: Optional[UserResponse] = None
    
    model_config = ConfigDict(from_attributes=True)

class ThreatListResponse(BaseModel):
    items: list[ThreatResponse]
    total: int
