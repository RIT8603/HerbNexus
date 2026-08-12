import asyncio
import os
import random
from datetime import datetime, timedelta, timezone
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from dotenv import load_dotenv
from geoalchemy2.elements import WKTElement

# Load env before importing models if needed, though we can define db url directly
load_dotenv()

# We need the sync driver for postgres: psycopg2 or just default
# The user specified SYNC_DATABASE_URL in .env.example
SYNC_DB_URL = os.getenv("SYNC_DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/herbnexus")

engine = create_engine(SYNC_DB_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

from app.models.user import User, Role
from app.models.species import Species
from app.models.observation import Observation, LocationSensitivity, VerificationStatus, FloweringStatus
from app.models.threat import ThreatReport, ThreatType, Severity
from app.models.conservation import ConservationScore, PriorityLevel, MedicinalDemand, DemandLevel
from app.database import Base

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def seed_data():
    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # 1. Users
        users_data = [
            {"email": "admin@herbnexus.org", "pwd": "admin123", "name": "Admin User", "role": Role.ADMIN},
            {"email": "expert@herbnexus.org", "pwd": "expert123", "name": "Expert Botanist", "role": Role.EXPERT},
            {"email": "researcher@herbnexus.org", "pwd": "researcher123", "name": "Research Scientist", "role": Role.RESEARCHER},
            {"email": "observer@herbnexus.org", "pwd": "observer123", "name": "Field Observer", "role": Role.OBSERVER},
            {"email": "conservation@herbnexus.org", "pwd": "conservation123", "name": "Conservation Auth", "role": Role.CONSERVATION_AUTHORITY},
            {"email": "public@herbnexus.org", "pwd": "public123", "name": "Public User", "role": Role.PUBLIC},
        ]
        
        users = {}
        for ud in users_data:
            u = db.query(User).filter_by(email=ud["email"]).first()
            if not u:
                u = User(email=ud["email"], hashed_password=get_password_hash(ud["pwd"]), full_name=ud["name"], role=ud["role"])
                db.add(u)
                db.flush()
            users[ud["role"]] = u
            
        # 2. Species
        species_data = [
            {"sci": "Withania somnifera", "com": "Ashwagandha", "fam": "Solanaceae", "gen": "Withania", "rare": False, "dem": DemandLevel.HIGH, "pri": PriorityLevel.MODERATE},
            {"sci": "Rauvolfia serpentina", "com": "Sarpagandha", "fam": "Apocynaceae", "gen": "Rauvolfia", "rare": True, "dem": DemandLevel.VERY_HIGH, "pri": PriorityLevel.CRITICAL},
            {"sci": "Bacopa monnieri", "com": "Brahmi", "fam": "Plantaginaceae", "gen": "Bacopa", "rare": False, "dem": DemandLevel.HIGH, "pri": PriorityLevel.MODERATE},
            {"sci": "Tinospora cordifolia", "com": "Guduchi", "fam": "Menispermaceae", "gen": "Tinospora", "rare": False, "dem": DemandLevel.MODERATE, "pri": PriorityLevel.LOW},
            {"sci": "Saraca asoca", "com": "Ashoka", "fam": "Fabaceae", "gen": "Saraca", "rare": True, "dem": DemandLevel.HIGH, "pri": PriorityLevel.HIGH},
            {"sci": "Centella asiatica", "com": "Gotu Kola", "fam": "Apiaceae", "gen": "Centella", "rare": False, "dem": DemandLevel.HIGH, "pri": PriorityLevel.LOW},
            {"sci": "Phyllanthus emblica", "com": "Amla", "fam": "Phyllanthaceae", "gen": "Phyllanthus", "rare": False, "dem": DemandLevel.MODERATE, "pri": PriorityLevel.LOW},
            {"sci": "Nardostachys jatamansi", "com": "Jatamansi", "fam": "Caprifoliaceae", "gen": "Nardostachys", "rare": True, "dem": DemandLevel.VERY_HIGH, "pri": PriorityLevel.CRITICAL}
        ]
        
        db_species_list = []
        for sd in species_data:
            sp = db.query(Species).filter_by(scientific_name=sd["sci"]).first()
            if not sp:
                sp = Species(
                    scientific_name=sd["sci"],
                    common_name=sd["com"],
                    family=sd["fam"],
                    genus=sd["gen"],
                    is_rare=sd["rare"],
                    description=f"{sd['com']} description",
                    medicinal_relevance="High relevance in traditional medicine",
                    conservation_notes="Requires monitoring"
                )
                db.add(sp)
                db.flush()
                
                # Demand
                md = MedicinalDemand(species_id=sp.id, demand_level=sd["dem"])
                db.add(md)
                
                # Conservation Score
                cs = ConservationScore(species_id=sp.id, priority_level=sd["pri"], total_score=random.uniform(30, 95))
                db.add(cs)
                
            db_species_list.append(sp)
            
        db.commit()

        # 3. Observations (25+)
        india_bounds = {"min_lat": 8.0, "max_lat": 37.0, "min_lon": 68.0, "max_lon": 97.0}
        
        for i in range(25):
            sp = random.choice(db_species_list)
            lat = random.uniform(india_bounds["min_lat"], india_bounds["max_lat"])
            lon = random.uniform(india_bounds["min_lon"], india_bounds["max_lon"])
            
            # For Jatamansi make it Himalayan
            if sp.scientific_name == "Nardostachys jatamansi":
                lat = random.uniform(27.0, 35.0)
                lon = random.uniform(77.0, 88.0)
                
            geom = WKTElement(f'POINT({lon} {lat})', srid=4326)
            
            obs_date = datetime.now(timezone.utc) - timedelta(days=random.randint(1, 1400)) # Spanning back to ~2022
            
            sens = LocationSensitivity.PUBLIC
            if sp.is_rare:
                sens = random.choice([LocationSensitivity.SENSITIVE, LocationSensitivity.HIGHLY_SENSITIVE])
            
            if sp.scientific_name == "Nardostachys jatamansi":
                sens = LocationSensitivity.HIGHLY_SENSITIVE
                
            obs = Observation(
                observer_id=users[random.choice([Role.OBSERVER, Role.PUBLIC, Role.RESEARCHER])].id,
                species_id=sp.id,
                latitude=lat,
                longitude=lon,
                geom=geom,
                location_sensitivity=sens,
                observation_date=obs_date,
                verification_status=random.choice(list(VerificationStatus)),
                is_demo=True,
                ai_species_suggestion=sp.scientific_name,
                ai_confidence=random.uniform(0.6, 0.99),
                ai_model_version="herbnexus-mock-v1"
            )
            db.add(obs)
            
        # 4. Threats (8+)
        for i in range(10):
            lat = random.uniform(india_bounds["min_lat"], india_bounds["max_lat"])
            lon = random.uniform(india_bounds["min_lon"], india_bounds["max_lon"])
            geom = WKTElement(f'POINT({lon} {lat})', srid=4326)
            
            threat = ThreatReport(
                reporter_id=users[random.choice([Role.OBSERVER, Role.CONSERVATION_AUTHORITY])].id,
                latitude=lat,
                longitude=lon,
                geom=geom,
                threat_type=random.choice(list(ThreatType)),
                severity=random.choice(list(Severity)),
                title=f"Threat report {i}",
                description="Observed habitat destruction in the area.",
                is_demo=True
            )
            db.add(threat)
            
        db.commit()
        print("Seed data successfully created!")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
