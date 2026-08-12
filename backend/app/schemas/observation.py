from pydantic import BaseModel, ConfigDict, Field
from uuid import UUID
from datetime import datetime
from typing import Optional, List
from app.models.observation import LocationSensitivity, VerificationStatus, FloweringStatus
from app.schemas.user import UserResponse
from app.schemas.species import SpeciesResponse

class ObservationImageResponse(BaseModel):
    id: UUID
    image_url: str
    image_order: int
    model_config = ConfigDict(from_attributes=True)

class ObservationBase(BaseModel):
    latitude: float
    longitude: float
    location_sensitivity: LocationSensitivity = LocationSensitivity.PUBLIC
    habitat_type: Optional[str] = None
    plant_condition: Optional[str] = None
    approximate_count: Optional[int] = None
    height_cm: Optional[float] = None
    flowering_status: Optional[FloweringStatus] = None
    notes: Optional[str] = None

class ObservationCreate(ObservationBase):
    species_id: Optional[UUID] = None

class ObservationResponse(ObservationBase):
    id: UUID
    observer_id: UUID
    species_id: Optional[UUID] = None
    observation_date: datetime
    verification_status: VerificationStatus
    ai_species_suggestion: Optional[str] = None
    ai_confidence: Optional[float] = None
    ai_model_version: Optional[str] = None
    is_demo: bool
    created_at: datetime
    
    observer: Optional[UserResponse] = None
    species: Optional[SpeciesResponse] = None
    images: List[ObservationImageResponse] = []
    
    model_config = ConfigDict(from_attributes=True)

class ObservationListResponse(BaseModel):
    items: List[ObservationResponse]
    total: int

class AIIdentificationResponse(BaseModel):
    predictions: List[dict]  # e.g., [{"scientific_name": "...", "confidence": 0.95}]
    model_version: str
    disclaimer: str = "Preliminary mock AI prediction. Not a substitute for expert review."
