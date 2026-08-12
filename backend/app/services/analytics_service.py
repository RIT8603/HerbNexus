from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, extract
from sqlalchemy.future import select
from datetime import datetime, timedelta, timezone
from typing import Optional

from app.models.user import User
from app.models.observation import Observation, VerificationStatus
from app.models.species import Species
from app.models.threat import ThreatReport, ThreatType, Severity
from app.models.conservation import ConservationScore, PriorityLevel
from app.schemas.analytics import (
    DashboardStats, TrendData, TrendsByYear, YearlyTrend,
    SpeciesDistribution, SpeciesDistributionItem,
    ThreatSummary, ThreatSummaryItem,
    VerificationStats, VerificationStatsItem
)

class AnalyticsService:
    @staticmethod
    async def get_dashboard_stats(db: AsyncSession) -> DashboardStats:
        total_observations = await db.scalar(select(func.count()).select_from(Observation)) or 0
        verified_observations = await db.scalar(select(func.count()).select_from(Observation).where(Observation.verification_status == VerificationStatus.VERIFIED)) or 0
        pending_observations = await db.scalar(select(func.count()).select_from(Observation).where(Observation.verification_status == VerificationStatus.PENDING)) or 0
        total_species = await db.scalar(select(func.count()).select_from(Species)) or 0
        active_threats = await db.scalar(select(func.count()).select_from(ThreatReport).where(ThreatReport.verification_status != VerificationStatus.REJECTED)) or 0
        high_priority_species = await db.scalar(select(func.count()).select_from(ConservationScore).where(ConservationScore.priority_level.in_([PriorityLevel.HIGH, PriorityLevel.CRITICAL]))) or 0
        
        # Mock trend data for last 7 days
        trends = []
        today = datetime.now(timezone.utc).date()
        for i in range(6, -1, -1):
            date_str = (today - timedelta(days=i)).strftime("%Y-%m-%d")
            trends.append(TrendData(date=date_str, count=total_observations // 7 + i))
            
        return DashboardStats(
            total_observations=total_observations,
            verified_observations=verified_observations,
            pending_observations=pending_observations,
            total_species=total_species,
            active_threats=active_threats,
            high_priority_species=high_priority_species,
            recent_trends=trends
        )

    @staticmethod
    async def get_trends(db: AsyncSession, species_id: Optional[str] = None) -> TrendsByYear:
        query = select(extract('year', Observation.observation_date).label('year'), func.count().label('count')).select_from(Observation)
        if species_id:
            query = query.where(Observation.species_id == species_id)
        query = query.group_by('year').order_by('year')
        
        result = await db.execute(query)
        trends = [YearlyTrend(year=int(row.year), count=row.count) for row in result.all()]
        return TrendsByYear(trends=trends)

    @staticmethod
    async def get_species_distribution(db: AsyncSession) -> SpeciesDistribution:
        query = select(Species.id, Species.scientific_name, func.count(Observation.id).label('count')).join(Observation, Species.id == Observation.species_id, isouter=True).group_by(Species.id, Species.scientific_name)
        result = await db.execute(query)
        distribution = [SpeciesDistributionItem(species_id=str(row.id), scientific_name=row.scientific_name, count=row.count) for row in result.all()]
        return SpeciesDistribution(distribution=distribution)
        
    @staticmethod
    async def get_threat_summary(db: AsyncSession) -> ThreatSummary:
        query = select(ThreatReport.threat_type, ThreatReport.severity, func.count().label('count')).select_from(ThreatReport).group_by(ThreatReport.threat_type, ThreatReport.severity)
        result = await db.execute(query)
        summary = [ThreatSummaryItem(threat_type=row.threat_type, severity=row.severity, count=row.count) for row in result.all()]
        return ThreatSummary(summary=summary)
        
    @staticmethod
    async def get_verification_stats(db: AsyncSession) -> VerificationStats:
        query = select(Observation.verification_status, func.count().label('count')).select_from(Observation).group_by(Observation.verification_status)
        result = await db.execute(query)
        stats = [VerificationStatsItem(status=row.verification_status, count=row.count) for row in result.all()]
        return VerificationStats(stats=stats)

analytics_service = AnalyticsService()
