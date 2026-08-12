from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional
from app.models.conservation import PriorityLevel, DemandLevel
from app.schemas.species import SpeciesResponse

class ConservationScoreResponse(BaseModel):
    id: UUID
    species_id: UUID
    observation_trend_score: float
    geographic_concentration_score: float
    habitat_threat_score: float
    disturbance_score: float
    rarity_score: float
    data_confidence_score: float
    total_score: float
    priority_level: PriorityLevel
    recommendation: Optional[str] = None
    calculated_at: datetime
    
    species: Optional[SpeciesResponse] = None
    
    model_config = ConfigDict(from_attributes=True)

class MedicinalDemandResponse(BaseModel):
    id: UUID
    species_id: UUID
    demand_level: DemandLevel
    market_notes: Optional[str] = None
    cultivation_feasibility: Optional[str] = None
    propagation_notes: Optional[str] = None
    updated_at: datetime
    
    species: Optional[SpeciesResponse] = None

    model_config = ConfigDict(from_attributes=True)
