export type UserRole = 'PUBLIC' | 'OBSERVER' | 'EXPERT' | 'RESEARCHER' | 'CONSERVATION_AUTHORITY' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Species {
  id: string;
  scientific_name: string;
  common_name: string;
  family: string;
  genus: string;
  description: string;
  medicinal_relevance: string;
  conservation_notes: string;
  is_rare: boolean;
  created_at: string;
}

export interface ObservationImage {
  id: string;
  observation_id: string;
  image_url: string;
  image_order: number;
}

export interface Observation {
  id: string;
  observer_id: string;
  species_id: string;
  species?: Species;
  latitude: number;
  longitude: number;
  location_sensitivity: string;
  observation_date: string;
  habitat_type: string;
  plant_condition: string;
  approximate_count: number;
  height_cm: number;
  flowering_status: string;
  notes: string;
  verification_status: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NEEDS_MORE_INFO';
  ai_species_suggestion: string;
  ai_confidence: number;
  ai_model_version: string;
  is_demo: boolean;
  images: ObservationImage[];
  created_at: string;
}

export interface ExpertReview {
  id: string;
  observation_id: string;
  expert_id: string;
  expert?: User;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NEEDS_MORE_INFO';
  species_id_confirmed: string;
  comments: string;
  created_at: string;
}

export interface ThreatReport {
  id: string;
  reporter_id: string;
  latitude: number;
  longitude: number;
  threat_type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  photo_url: string;
  verification_status: string;
  reported_date: string;
  is_demo: boolean;
  created_at: string;
}

export interface ConservationScore {
  id: string;
  species_id: string;
  species?: Species;
  observation_trend_score: number;
  geographic_concentration_score: number;
  habitat_threat_score: number;
  disturbance_score: number;
  rarity_score: number;
  data_confidence_score: number;
  total_score: number;
  priority_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommendation: string;
  calculated_at: string;
}

export interface MedicinalDemand {
  id: string;
  species_id: string;
  demand_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  market_notes: string;
  cultivation_feasibility: string;
  propagation_notes: string;
}

export interface AIIdentificationResult {
  species: string;
  confidence: number;
  alternatives: { species: string; confidence: number }[];
  model_version: string;
  disclaimer: string;
}

export interface DashboardStats {
  total_species: number;
  verified_observations: number;
  pending_observations: number;
  active_threats: number;
  high_priority_species: number;
  total_observations: number;
}

export interface TrendData {
  period: string;
  count: number;
}
