from pydantic import BaseModel
from typing import List, Optional
from app.models.threat import ThreatType, Severity
from app.models.observation import VerificationStatus

class TrendData(BaseModel):
    date: str
    count: int

class SpeciesAnalytics(BaseModel):
    species_id: str
    scientific_name: str
    total_observations: int
    verified_observations: int

class DashboardStats(BaseModel):
    total_observations: int
    verified_observations: int
    pending_observations: int
    total_species: int
    active_threats: int
    high_priority_species: int
    recent_trends: List[TrendData]

class YearlyTrend(BaseModel):
    year: int
    count: int

class TrendsByYear(BaseModel):
    trends: List[YearlyTrend]

class SpeciesDistributionItem(BaseModel):
    species_id: str
    scientific_name: str
    count: int

class SpeciesDistribution(BaseModel):
    distribution: List[SpeciesDistributionItem]

class ThreatSummaryItem(BaseModel):
    threat_type: ThreatType
    severity: Severity
    count: int

class ThreatSummary(BaseModel):
    summary: List[ThreatSummaryItem]

class VerificationStatsItem(BaseModel):
    status: VerificationStatus
    count: int

class VerificationStats(BaseModel):
    stats: List[VerificationStatsItem]
