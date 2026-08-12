from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.models.conservation import ConservationScore, PriorityLevel, MedicinalDemand, DemandLevel
from app.models.species import Species
from app.models.observation import Observation

class ConservationService:
    @staticmethod
    def calculate_priority(total_score: float) -> PriorityLevel:
        if total_score >= 80:
            return PriorityLevel.CRITICAL
        elif total_score >= 60:
            return PriorityLevel.HIGH
        elif total_score >= 40:
            return PriorityLevel.MODERATE
        return PriorityLevel.LOW

    @staticmethod
    async def calculate_species_score(db: AsyncSession, species_id: UUID) -> ConservationScore:
        species_result = await db.execute(select(Species).where(Species.id == species_id))
        species = species_result.scalars().first()
        
        obs_result = await db.execute(select(Observation).where(Observation.species_id == species_id))
        observations = obs_result.scalars().all()
        
        obs_count = len(observations)
        rarity = 20 if species.is_rare else 5
        confidence = min(obs_count * 0.5, 15)
        trend = 10.0
        threat = 15.0
        disturbance = 5.0
        
        total = rarity + confidence + trend + threat + disturbance
        priority = ConservationService.calculate_priority(total)
        
        score_result = await db.execute(select(ConservationScore).where(ConservationScore.species_id == species_id))
        existing_score = score_result.scalars().first()
        
        if existing_score:
            existing_score.rarity_score = rarity
            existing_score.data_confidence_score = confidence
            existing_score.observation_trend_score = trend
            existing_score.habitat_threat_score = threat
            existing_score.disturbance_score = disturbance
            existing_score.total_score = total
            existing_score.priority_level = priority
            score = existing_score
        else:
            score = ConservationScore(
                species_id=species_id,
                rarity_score=rarity,
                data_confidence_score=confidence,
                observation_trend_score=trend,
                habitat_threat_score=threat,
                disturbance_score=disturbance,
                total_score=total,
                priority_level=priority
            )
            db.add(score)
            
        await db.commit()
        return await ConservationService.get_priority_by_species(db, str(species_id))

    @staticmethod
    async def get_all_priorities(db: AsyncSession) -> list[ConservationScore]:
        result = await db.execute(
            select(ConservationScore).options(selectinload(ConservationScore.species))
        )
        return result.scalars().all()

    @staticmethod
    async def get_priority_by_species(db: AsyncSession, species_id: str) -> ConservationScore:
        result = await db.execute(
            select(ConservationScore).options(selectinload(ConservationScore.species)).where(ConservationScore.species_id == species_id)
        )
        return result.scalars().first()

    @staticmethod
    async def get_recommendations(db: AsyncSession):
        query = select(Species, MedicinalDemand, ConservationScore).join(
            MedicinalDemand, Species.id == MedicinalDemand.species_id
        ).join(
            ConservationScore, Species.id == ConservationScore.species_id, isouter=True
        ).where(
            Species.is_rare == True,
            MedicinalDemand.demand_level.in_([DemandLevel.HIGH, DemandLevel.VERY_HIGH])
        )
        result = await db.execute(query)
        
        recommendations = []
        for sp, md, cs in result.all():
            recommendations.append({
                "species": {
                    "id": str(sp.id),
                    "scientific_name": sp.scientific_name,
                    "common_name": sp.common_name
                },
                "demand_level": md.demand_level.value,
                "conservation_score": cs.total_score if cs else None,
                "priority_level": cs.priority_level.value if cs else None,
                "recommendation_text": "Consider controlled propagation or authorized cultivation research to reduce pressure on wild populations.",
                "disclaimer": "This is a research/conservation recommendation only. It does not imply that cultivation is authorized or safe without proper regulatory review."
            })
        return recommendations

conservation_service = ConservationService()
