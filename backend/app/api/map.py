from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Any, Dict, Optional
from datetime import datetime

from app.database import get_db
from app.services.observation_service import observation_service
from app.services.threat_service import threat_service
from app.models.observation import VerificationStatus

router = APIRouter(prefix="/map", tags=["map"])

@router.get("/observations")
async def get_map_observations(
    species_id: Optional[str] = Query(None),
    verification_status: Optional[VerificationStatus] = Query(None),
    date_from: Optional[datetime] = Query(None),
    date_to: Optional[datetime] = Query(None),
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    obs = await observation_service.get_observations_with_filters(
        db, None, species_id, verification_status, date_from, date_to
    )
    
    features = []
    for o in obs:
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [o.longitude, o.latitude]
            },
            "properties": {
                "id": str(o.id),
                "species": o.species.scientific_name if o.species else "Unknown",
                "sensitivity": o.location_sensitivity.value,
                "verification_status": o.verification_status.value
            }
        })
        
    return {
        "type": "FeatureCollection",
        "features": features
    }

@router.get("/threats")
async def get_map_threats(db: AsyncSession = Depends(get_db)) -> Dict[str, Any]:
    threats = await threat_service.get_threats(db, 0, 1000)
    
    features = []
    for t in threats:
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [t.longitude, t.latitude]
            },
            "properties": {
                "id": str(t.id),
                "threat_type": t.threat_type.value,
                "severity": t.severity.value,
                "verification_status": t.verification_status.value
            }
        })
        
    return {
        "type": "FeatureCollection",
        "features": features
    }
