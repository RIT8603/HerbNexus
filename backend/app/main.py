from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.database import engine, Base
from app.api import auth, observations, ai, expert, species, threats, analytics, conservation, map, admin

app = FastAPI(
    title="HerbNexus API",
    description="Backend API for HerbNexus — AI-Powered Botanical Intelligence & Conservation Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create static dir if not exists
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.on_event("startup")
async def startup():
    # Create tables
    async with engine.begin() as conn:
        # await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

# Include Routers
app.include_router(auth.router, prefix="/api")
app.include_router(observations.router, prefix="/api")
app.include_router(ai.router, prefix="/api")
app.include_router(expert.router, prefix="/api")
app.include_router(species.router, prefix="/api")
app.include_router(threats.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(conservation.router, prefix="/api")
app.include_router(map.router, prefix="/api")
app.include_router(admin.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the HerbNexus API"}
