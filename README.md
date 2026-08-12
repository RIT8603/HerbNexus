# HerbNexus — AI-Powered Botanical Intelligence & Conservation Platform

Tagline: Identify. Verify. Track. Protect.

## Overview
HerbNexus transforms scattered plant observations into verified, geo-spatial, time-based botanical intelligence. It helps researchers and conservation organizations identify, monitor, protect, and conserve rare and medicinal plants.

## Features
- **Role-Based Access Control**: 6 roles (PUBLIC, OBSERVER, EXPERT, RESEARCHER, CONSERVATION_AUTHORITY, ADMIN)
- **Spatial Intelligence**: MapLibre GL based GIS mapping with PostGIS backend for clustering and filtering.
- **Privacy Engine**: High-risk sensitive locations are obfuscated/jittered automatically for unauthorized roles.
- **AI Identification**: Preliminary mock AI model identifying botanical images.
- **Expert Review System**: Human-in-the-loop verification pipeline for botanical records.
- **Analytics & Conservation Prioritization**: Rule-based scoring to determine conservation urgency.

## Architecture
- **Frontend**: Next.js App Router, Tailwind CSS, shadcn/ui, MapLibre GL JS, Recharts, Lucide Icons.
- **Backend**: FastAPI, SQLAlchemy (Async), GeoAlchemy2, Pydantic v2.
- **Database**: PostgreSQL with PostGIS extension.
- **Auth**: JWT based access tokens with bcrypt password hashing.

## Setup Instructions

### Environment Setup
Create a `.env` in the `backend/` directory (see `.env.example`).
Create a `.env.local` in the `frontend/` directory (see `.env.local.example`).

### Database (Docker required for PostGIS)
```bash
docker run --name herbnexus-db -e POSTGRES_USER=herbnexus -e POSTGRES_PASSWORD=herbnexus_dev_password -e POSTGRES_DB=herbnexus -p 5432:5432 -d postgis/postgis:15-3.3
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python seed.py
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Seed Data & Demo Accounts
- admin@herbnexus.org / admin123
- expert@herbnexus.org / expert123
- researcher@herbnexus.org / researcher123
- observer@herbnexus.org / observer123
- conservation@herbnexus.org / conservation123
- public@herbnexus.org / public123

## Scientific Limitations
- AI Identification is currently a simulated mock service and must not be treated as scientifically rigorous without expert human verification.
- Observation trends shown in analytics are not statistically equivalent to true biological population estimates.
- Conservation priorities provided by the system are indicators and do not replace official IUCN Red List or national extinction risk assessments.

## Security & Privacy Model
Sensitive plant coordinate data is heavily protected. The backend obfuscates coordinates via GeoAlchemy2 based on the requester's JWT scope before the data ever leaves the server. Do not rely on frontend-only hiding.
