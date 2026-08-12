import uuid
import enum
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, Enum, Float, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from app.database import Base
from app.models.observation import VerificationStatus

class ThreatType(str, enum.Enum):
    DEFORESTATION = "DEFORESTATION"
    ILLEGAL_COLLECTION = "ILLEGAL_COLLECTION"
    HABITAT_LOSS = "HABITAT_LOSS"
    FIRE = "FIRE"
    MINING = "MINING"
    GRAZING = "GRAZING"
    POLLUTION = "POLLUTION"
    INVASIVE_SPECIES = "INVASIVE_SPECIES"
    OTHER = "OTHER"

class Severity(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class ThreatReport(Base):
    __tablename__ = "threat_reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    reporter_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    geom = Column(Geometry(geometry_type='POINT', srid=4326), nullable=False)
    
    threat_type = Column(Enum(ThreatType), nullable=False)
    severity = Column(Enum(Severity), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    photo_url = Column(String, nullable=True)
    
    verification_status = Column(Enum(VerificationStatus), default=VerificationStatus.PENDING)
    reported_date = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    is_demo = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    reporter = relationship("User")
