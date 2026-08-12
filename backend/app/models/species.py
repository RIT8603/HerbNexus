import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base

class Species(Base):
    __tablename__ = "species"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    scientific_name = Column(String, unique=True, index=True, nullable=False)
    common_name = Column(String, nullable=True)
    family = Column(String, nullable=True)
    genus = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    medicinal_relevance = Column(Text, nullable=True)
    conservation_notes = Column(Text, nullable=True)
    is_rare = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    observations = relationship("Observation", back_populates="species")
    conservation_scores = relationship("ConservationScore", back_populates="species")
    medicinal_demands = relationship("MedicinalDemand", back_populates="species")
