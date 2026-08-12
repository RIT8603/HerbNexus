from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.database import get_db
from app.models.species import Species
from app.schemas.species import SpeciesResponse, SpeciesCreate

router = APIRouter(prefix="/species", tags=["species"])

@router.get("/", response_model=List[SpeciesResponse])
async def list_species(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Species).offset(skip).limit(limit))
    return result.scalars().all()

@router.get("/{species_id}", response_model=SpeciesResponse)
async def get_species(species_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Species).where(Species.id == species_id))
    species = result.scalars().first()
    if not species:
        raise HTTPException(status_code=404, detail="Species not found")
    return species

@router.post("/", response_model=SpeciesResponse)
async def create_species(species_in: SpeciesCreate, db: AsyncSession = Depends(get_db)):
    species = Species(**species_in.model_dump())
    db.add(species)
    await db.commit()
    await db.refresh(species)
    return species
