import random
from uuid import UUID
from datetime import datetime
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException
from geoalchemy2.elements import WKTElement

from app.models.observation import Observation, LocationSensitivity, VerificationStatus
from app.models.user import User, Role
from app.schemas.observation import ObservationCreate

class ObservationService:
    @staticmethod
    def _apply_privacy_jitter(latitude: float, longitude: float) -> tuple[float, float]:
        lat_jitter = random.uniform(0.05, 0.1) * random.choice([-1, 1])
        lon_jitter = random.uniform(0.05, 0.1) * random.choice([-1, 1])
        return latitude + lat_jitter, longitude + lon_jitter

    @staticmethod
    def _can_view_exact_location(user: Optional[User], sensitivity: LocationSensitivity) -> bool:
        if sensitivity == LocationSensitivity.PUBLIC:
            return True
        if not user:
            return False
        if sensitivity in [LocationSensitivity.SENSITIVE, LocationSensitivity.HIGHLY_SENSITIVE]:
            return user.role in [Role.EXPERT, Role.RESEARCHER, Role.CONSERVATION_AUTHORITY, Role.ADMIN]
        return False

    @staticmethod
    def enforce_privacy(obs: Observation, current_user: Optional[User] = None) -> Observation:
        if not ObservationService._can_view_exact_location(current_user, obs.location_sensitivity):
            obs.latitude, obs.longitude = ObservationService._apply_privacy_jitter(obs.latitude, obs.longitude)
        return obs

    @staticmethod
    async def get_observations(db: AsyncSession, current_user: Optional[User] = None, skip: int = 0, limit: int = 100) -> List[Observation]:
        result = await db.execute(
            select(Observation)
            .options(selectinload(Observation.species), selectinload(Observation.observer), selectinload(Observation.images))
            .offset(skip)
            .limit(limit)
        )
        observations = result.scalars().all()
        return [ObservationService.enforce_privacy(obs, current_user) for obs in observations]

    @staticmethod
    async def get_observations_with_filters(
        db: AsyncSession, 
        current_user: Optional[User],
        species_id: Optional[str] = None,
        verification_status: Optional[VerificationStatus] = None,
        date_from: Optional[datetime] = None,
        date_to: Optional[datetime] = None
    ) -> List[Observation]:
        query = select(Observation).options(
            selectinload(Observation.species), 
            selectinload(Observation.observer), 
            selectinload(Observation.images)
        )
        
        if species_id:
            query = query.where(Observation.species_id == species_id)
        if verification_status:
            query = query.where(Observation.verification_status == verification_status)
        if date_from:
            query = query.where(Observation.observation_date >= date_from)
        if date_to:
            query = query.where(Observation.observation_date <= date_to)
            
        result = await db.execute(query)
        observations = result.scalars().all()
        return [ObservationService.enforce_privacy(obs, current_user) for obs in observations]

    @staticmethod
    async def get_observation_by_id(db: AsyncSession, obs_id: UUID, current_user: Optional[User] = None) -> Observation:
        result = await db.execute(
            select(Observation)
            .options(selectinload(Observation.species), selectinload(Observation.observer), selectinload(Observation.images))
            .where(Observation.id == obs_id)
        )
        obs = result.scalars().first()
        if not obs:
            raise HTTPException(status_code=404, detail="Observation not found")
        return ObservationService.enforce_privacy(obs, current_user)

    @staticmethod
    async def create_observation(db: AsyncSession, obj_in: ObservationCreate, user_id: UUID) -> Observation:
        geom = WKTElement(f'POINT({obj_in.longitude} {obj_in.latitude})', srid=4326)
        db_obs = Observation(**obj_in.model_dump(), observer_id=user_id, geom=geom)
        db.add(db_obs)
        await db.commit()
        return await ObservationService.get_observation_by_id(db, db_obs.id, None)

observation_service = ObservationService()
