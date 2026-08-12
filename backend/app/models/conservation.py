import uuid
import enum
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Enum, Float, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base

class PriorityLevel(str, enum.Enum):
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class DemandLevel(str, enum.Enum):
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"
    VERY_HIGH = "VERY_HIGH"

class ConservationScore(Base):
    __tablename__ = "conservation_scores"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    species_id = Column(UUID(as_uuid=True), ForeignKey("species.id"), nullable=False)
    
    observation_trend_score = Column(Float, default=0.0)
    geographic_concentration_score = Column(Float, default=0.0)
    habitat_threat_score = Column(Float, default=0.0)
    disturbance_score = Column(Float, default=0.0)
    rarity_score = Column(Float, default=0.0)
    data_confidence_score = Column(Float, default=0.0)
    
    total_score = Column(Float, default=0.0)
    priority_level = Column(Enum(PriorityLevel), default=PriorityLevel.LOW)
    recommendation = Column(Text, nullable=True)
    
    calculated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    species = relationship("Species", back_populates="conservation_scores")


class MedicinalDemand(Base):
    __tablename__ = "medicinal_demands"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    species_id = Column(UUID(as_uuid=True), ForeignKey("species.id"), nullable=False)
    
    demand_level = Column(Enum(DemandLevel), default=DemandLevel.LOW)
    market_notes = Column(Text, nullable=True)
    cultivation_feasibility = Column(Text, nullable=True)
    propagation_notes = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    species = relationship("Species", back_populates="medicinal_demands")
