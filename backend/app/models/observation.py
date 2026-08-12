import uuid
import enum
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, Enum, Float, ForeignKey, Integer, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from app.database import Base

class LocationSensitivity(str, enum.Enum):
    PUBLIC = "PUBLIC"
    SENSITIVE = "SENSITIVE"
    HIGHLY_SENSITIVE = "HIGHLY_SENSITIVE"

class VerificationStatus(str, enum.Enum):
    PENDING = "PENDING"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"
    NEEDS_MORE_INFO = "NEEDS_MORE_INFO"

class FloweringStatus(str, enum.Enum):
    VEGETATIVE = "VEGETATIVE"
    BUDDING = "BUDDING"
    FLOWERING = "FLOWERING"
    FRUITING = "FRUITING"
    SEEDING = "SEEDING"

class Observation(Base):
    __tablename__ = "observations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    observer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    species_id = Column(UUID(as_uuid=True), ForeignKey("species.id"), nullable=True)
    
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    geom = Column(Geometry(geometry_type='POINT', srid=4326), nullable=False)
    location_sensitivity = Column(Enum(LocationSensitivity), default=LocationSensitivity.PUBLIC)
    
    observation_date = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    habitat_type = Column(String, nullable=True)
    plant_condition = Column(String, nullable=True)
    approximate_count = Column(Integer, nullable=True)
    height_cm = Column(Float, nullable=True)
    flowering_status = Column(Enum(FloweringStatus), nullable=True)
    notes = Column(Text, nullable=True)
    
    verification_status = Column(Enum(VerificationStatus), default=VerificationStatus.PENDING)
    
    ai_species_suggestion = Column(String, nullable=True)
    ai_confidence = Column(Float, nullable=True)
    ai_model_version = Column(String, nullable=True)
    
    is_demo = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    observer = relationship("User")
    species = relationship("Species", back_populates="observations")
    images = relationship("ObservationImage", back_populates="observation", cascade="all, delete-orphan")
    reviews = relationship("ExpertReview", back_populates="observation")


class ObservationImage(Base):
    __tablename__ = "observation_images"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    observation_id = Column(UUID(as_uuid=True), ForeignKey("observations.id"), nullable=False)
    image_url = Column(String, nullable=False)
    image_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    observation = relationship("Observation", back_populates="images")
