import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Enum, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.observation import VerificationStatus

class ExpertReview(Base):
    __tablename__ = "expert_reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    observation_id = Column(UUID(as_uuid=True), ForeignKey("observations.id"), nullable=False)
    expert_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    status = Column(Enum(VerificationStatus), nullable=False)
    species_id_confirmed = Column(UUID(as_uuid=True), ForeignKey("species.id"), nullable=True)
    comments = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    observation = relationship("Observation", back_populates="reviews")
    expert = relationship("User")
    species_confirmed = relationship("Species")
