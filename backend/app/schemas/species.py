from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional, List

class SpeciesBase(BaseModel):
    scientific_name: str
    common_name: Optional[str] = None
    family: Optional[str] = None
    genus: Optional[str] = None
    description: Optional[str] = None
    medicinal_relevance: Optional[str] = None
    conservation_notes: Optional[str] = None
    is_rare: bool = False

class SpeciesCreate(SpeciesBase):
    pass

class SpeciesResponse(SpeciesBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class SpeciesListResponse(BaseModel):
    items: List[SpeciesResponse]
    total: int
