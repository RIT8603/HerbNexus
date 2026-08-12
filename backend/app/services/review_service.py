from uuid import UUID
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.models.review import ExpertReview
from app.models.observation import Observation, VerificationStatus
from app.models.audit import AuditLog
from app.schemas.review import ReviewCreate

class ReviewService:
    @staticmethod
    async def create_review(db: AsyncSession, review_in: ReviewCreate, observation_id: UUID, expert_id: UUID) -> ExpertReview:
        # Check if observation exists
        obs_result = await db.execute(select(Observation).where(Observation.id == observation_id))
        obs = obs_result.scalars().first()
        
        if not obs:
            raise HTTPException(status_code=404, detail="Observation not found")
            
        # Create review
        review = ExpertReview(
            observation_id=observation_id,
            expert_id=expert_id,
            **review_in.model_dump()
        )
        
        # Update observation status
        obs.verification_status = review_in.status
        if review_in.species_id_confirmed:
            obs.species_id = review_in.species_id_confirmed
            
        # Create audit log
        audit = AuditLog(
            user_id=expert_id,
            action="EXPERT_REVIEW",
            entity_type="OBSERVATION",
            entity_id=observation_id,
            details={"status": review_in.status.value, "species_id_confirmed": str(review_in.species_id_confirmed) if review_in.species_id_confirmed else None}
        )
        
        db.add(review)
        db.add(audit)
        await db.commit()
        await db.refresh(review)
        
        # Load relationships
        result = await db.execute(
            select(ExpertReview)
            .options(selectinload(ExpertReview.expert), selectinload(ExpertReview.species_confirmed))
            .where(ExpertReview.id == review.id)
        )
        return result.scalars().first()
        
    @staticmethod
    async def get_reviews(db: AsyncSession, expert_id: UUID = None) -> list[ExpertReview]:
        query = select(ExpertReview).options(selectinload(ExpertReview.expert), selectinload(ExpertReview.species_confirmed))
        if expert_id:
            query = query.where(ExpertReview.expert_id == expert_id)
            
        result = await db.execute(query)
        return result.scalars().all()

review_service = ReviewService()
