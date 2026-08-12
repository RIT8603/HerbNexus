<div align="center">

# 🌱 HerbNexus
**AI-Powered Botanical Intelligence & Conservation Platform**

*Identify. Verify. Track. Protect.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-PostGIS-336791?style=for-the-badge&logo=postgresql)](https://postgis.net/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

</div>

## 📖 Table of Contents
- [What is HerbNexus?](#-what-is-herbnexus)
- [Why HerbNexus?](#-why-herbnexus)
- [How It Works](#-how-it-works)
- [Core Features](#-core-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Deployment Guide](#-deployment-guide)
- [Security & Privacy](#-security--privacy)

---

## 🌍 What is HerbNexus?

**HerbNexus** is a state-of-the-art spatial intelligence platform designed for the conservation of rare, vulnerable, and highly-demanded medicinal plant species. 

It transforms scattered botanical observations—contributed by citizens and researchers—into verified, geo-spatial data. Through a human-in-the-loop AI verification pipeline, HerbNexus empowers conservation authorities with the intelligence they need to map species distribution, monitor emerging poaching threats, and prioritize conservation efforts effectively.

---

## ❓ Why HerbNexus?

The demand for wild-harvested medicinal plants has skyrocketed, putting tremendous pressure on fragile ecosystems. Traditional conservation methods are often too slow, lacking real-time data and actionable insights.

HerbNexus solves this by providing:
1. **Real-Time Data Collection**: Crowdsourced field data from observers across the globe.
2. **AI-Assisted Processing**: Immediate preliminary identification of uploaded plant species.
3. **Data Security**: Protection of sensitive locations to prevent poaching of highly-demanded species.
4. **Actionable Analytics**: Conversion of raw data into prioritized conservation targets for authorities.

---

## ⚙️ How It Works

The platform operates on a robust data lifecycle pipeline:

1. **Observe**: Field workers and the public upload images, coordinates, and habitat metadata.
2. **Identify**: Our AI engine provides a preliminary species identification with a confidence score.
3. **Verify**: Qualified botanists and experts review the AI predictions and field data to ensure scientific accuracy.
4. **Obfuscate**: If a species is marked as "Sensitive", the backend automatically applies a spatial jitter to the coordinates, protecting the exact location from unauthorized users.
5. **Analyze**: Verified data flows into the PostGIS engine, where it is clustered and analyzed for threat modeling and population health tracking.
6. **Act**: Conservation authorities use the resulting intelligence to deploy resources and establish protected zones.

---

## ✨ Core Features

| Feature | Description |
|---------|-------------|
| 🔐 **RBAC System** | Strict Role-Based Access Control (Public, Observer, Expert, Researcher, Conservation Authority, Admin). |
| 🗺️ **Spatial Intelligence** | Real-time map rendering using MapLibre GL and advanced geospatial querying via PostGIS. |
| 🛡️ **Privacy Engine** | Automatic coordinate obfuscation to protect sensitive plant species from poaching. |
| 🧠 **AI Integration** | Preliminary identification engine that accelerates the verification workflow. |
| 📊 **Advanced Analytics** | Interactive charts, heatmaps, and threat progression modeling using Recharts. |
| ✅ **Human-in-the-Loop** | Dedicated portal for experts to review, approve, reject, or request more information on observations. |

---

## 🛠️ Technology Stack

HerbNexus is built on a modern, robust, and scalable architecture.

### Frontend
- **Framework**: Next.js 15 (App Router, Server Components)
- **Styling**: Tailwind CSS v4, `shadcn/ui` components
- **Mapping**: MapLibre GL JS
- **Visualization**: Recharts
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python)
- **ORM**: SQLAlchemy 2.0 (Async) with GeoAlchemy2
- **Validation**: Pydantic v2
- **Authentication**: JWT with bcrypt hashing

### Database
- **Engine**: PostgreSQL 15+
- **Spatial Extension**: PostGIS 3+

---

## 📂 Project Structure

```text
HerbNexus/
├── backend/
│   ├── app/
│   │   ├── api/            # FastAPI Route Handlers (Controllers)
│   │   ├── auth/           # JWT & Security Logic
│   │   ├── models/         # SQLAlchemy ORM Models
│   │   ├── schemas/        # Pydantic Schemas (Input/Output validation)
│   │   └── services/       # Core Business Logic & DB Transactions
│   ├── tests/              # Pytest Test Suites
│   ├── init-db.sql         # PostGIS Database Initialization
│   └── seed.py             # Database Seeding Utility
│
├── frontend/
│   ├── app/                # Next.js App Router Pages & Layouts
│   │   ├── admin/          # Admin Dashboard
│   │   ├── conservation/   # Conservation Authority Views
│   │   ├── expert/         # Expert Verification Portal
│   │   ├── observations/   # Observation Submission & Views
│   │   ├── research/       # Researcher Analytics & Heatmaps
│   │   └── species/        # Public Species Directory
│   ├── components/         # Reusable React/UI Components
│   ├── lib/                # API Client, Auth Context, Utilities
│   └── types/              # TypeScript Definitions
│
└── docker-compose.yml      # Container orchestration for PostgreSQL/PostGIS
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- Docker & Docker Compose (for the PostGIS Database)

### 1. Database Setup
Start the PostGIS database using the provided Docker Compose configuration:
```bash
docker-compose up -d
```
*(This automatically pulls the PostGIS image and exposes it on port 5433).*

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Activate Virtual Environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed the database with mock data
python seed.py

# Start the FastAPI Server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit **http://localhost:3000** in your browser.

---

## 🚢 Deployment Guide

HerbNexus is designed to be cloud-native and easily deployable.

### Backend Deployment (e.g., Render, Railway, AWS ECS)
1. Provide a managed PostgreSQL database with the **PostGIS extension** enabled (e.g., AWS RDS PostgreSQL with PostGIS, or Supabase).
2. Set the `DATABASE_URL` environment variable in your production environment.
3. Deploy the FastAPI application using Gunicorn with Uvicorn workers:
   ```bash
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
   ```

### Frontend Deployment (e.g., Vercel, Netlify)
1. Connect your GitHub repository to Vercel.
2. Set the Framework Preset to **Next.js**.
3. Add the `NEXT_PUBLIC_API_URL` environment variable pointing to your deployed backend URL.
4. Deploy. The Next.js build process (`npm run build`) will automatically compile the application using Turbopack/Webpack.

---

## 🛡️ Security & Privacy

### Coordinate Obfuscation
Sensitive plant data is heavily protected. The backend applies a spatial jitter (`ST_Translate`) to the coordinates of sensitive species via GeoAlchemy2 *before* the data leaves the server. 
- **Public/Observers**: Receive jittered coordinates (up to ~5km randomization).
- **Experts/Researchers**: Receive exact coordinates.

### Scientific Limitations & Disclaimers
- **AI Identification**: Currently a simulated mock service. It must not be treated as scientifically rigorous without human verification.
- **Data Extrapolation**: Observation trends shown in analytics are field indicators, not statistically equivalent to true biological population estimates.
- **Prioritization**: Conservation priorities provided by the system do not replace official IUCN Red List assessments.

---

<div align="center">
  <i>Built with ❤️ for conservation.</i>
</div>
