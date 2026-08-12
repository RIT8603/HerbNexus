import hashlib
from typing import List, Dict, Any

MOCK_SPECIES_DB = [
    {"scientific_name": "Withania somnifera", "common_name": "Ashwagandha"},
    {"scientific_name": "Rauvolfia serpentina", "common_name": "Sarpagandha"},
    {"scientific_name": "Bacopa monnieri", "common_name": "Brahmi"},
    {"scientific_name": "Tinospora cordifolia", "common_name": "Guduchi"},
    {"scientific_name": "Saraca asoca", "common_name": "Ashoka"},
    {"scientific_name": "Centella asiatica", "common_name": "Gotu Kola"},
    {"scientific_name": "Phyllanthus emblica", "common_name": "Amla"},
    {"scientific_name": "Nardostachys jatamansi", "common_name": "Jatamansi"}
]

class AIService:
    @staticmethod
    def identify_species_mock(filename: str) -> Dict[str, Any]:
        """
        Mock AI identification returning top-3 predictions.
        Uses a deterministic hash of image filename to pick from known species.
        """
        hash_val = int(hashlib.md5(filename.encode()).hexdigest(), 16)
        
        predictions = []
        for i in range(3):
            idx = (hash_val + i) % len(MOCK_SPECIES_DB)
            species = MOCK_SPECIES_DB[idx]
            conf = max(0.95 - (i * 0.15) - ((hash_val % 10) / 100), 0.1)
            predictions.append({
                "scientific_name": species["scientific_name"],
                "common_name": species["common_name"],
                "confidence": round(conf, 4)
            })
            
        # Sort by confidence descending
        predictions.sort(key=lambda x: x["confidence"], reverse=True)
            
        return {
            "predictions": predictions,
            "model_version": "herbnexus-mock-v1",
            "disclaimer": "HerbNexus provides data-driven intelligence to support research and conservation prioritization. AI predictions, observation trends, and conservation priority indicators do not replace expert review, field surveys, or official conservation assessments."
        }

ai_service = AIService()
