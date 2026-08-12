from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from geoalchemy2.elements import WKTElement

from app.models.threat import ThreatReport
from app.schemas.threat import ThreatCreate

class ThreatService:
    @staticmethod
    async def create_threat(db: AsyncSession, threat_in: ThreatCreate, reporter_id: UUID) -> ThreatReport:
        geom = WKTElement(f'POINT({threat_in.longitude} {threat_in.latitude})', srid=4326)
        
        threat = ThreatReport(
            reporter_id=reporter_id,
            geom=geom,
            **threat_in.model_dump()
        )
        
        db.add(threat)
        await db.commit()
        await db.refresh(threat)
        return threat

    @staticmethod
    async def get_threats(db: AsyncSession, skip: int = 0, limit: int = 100) -> list[ThreatReport]:
        result = await db.execute(
            select(ThreatReport)
            .options(selectinload(ThreatReport.reporter))
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()

threat_service = ThreatService()
