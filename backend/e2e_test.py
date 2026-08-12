import httpx
import json

BASE_URL = "http://127.0.0.1:8000/api"

def run_tests():
    print("Starting E2E API Test...")
    with httpx.Client() as client:
        # 1. Login as Field Observer
        print("1. Login Observer...")
        login_data = {"username": "observer@herbnexus.org", "password": "observer123"}
        resp = client.post(f"{BASE_URL}/auth/login", data=login_data)
        if resp.status_code != 200:
            print(f"Login failed: {resp.text}")
            return
        token = resp.json()["access_token"]
        auth_headers = {"Authorization": f"Bearer {token}"}
        
        # 2. Upload Observation (with dummy species ID for now)
        print("2. Get Species List...")
        resp = client.get(f"{BASE_URL}/species/")
        if resp.status_code != 200:
             print(f"Failed to get species: {resp.text}")
             return
        species_id = resp.json()[0]["id"]
        
        print("3. Submit Observation...")
        obs_data = {
            "species_id": species_id,
            "latitude": 30.0,
            "longitude": 75.0,
            "location_sensitivity": "PUBLIC",
            "habitat_type": "Forest",
            "plant_condition": "Healthy",
            "approximate_count": 5,
            "height_cm": 20.0,
            "flowering_status": "VEGETATIVE",
            "notes": "E2E Test observation",
            "ai_species_suggestion": "Ashwagandha",
            "ai_confidence": 0.95,
            "ai_model_version": "v1.0"
        }
        resp = client.post(f"{BASE_URL}/observations/", json=obs_data, headers=auth_headers)
        if resp.status_code != 200:
            print(f"Submit observation failed: {resp.text}")
            return
        obs = resp.json()
        obs_id = obs["id"]
        print(f"Observation created with ID {obs_id}")
        
        # 4. Expert Login & Verification
        print("4. Login Expert...")
        login_data = {"username": "expert@herbnexus.org", "password": "expert123"}
        resp = client.post(f"{BASE_URL}/auth/login", data=login_data)
        if resp.status_code != 200:
            print(f"Expert login failed: {resp.text}")
            return
        expert_token = resp.json()["access_token"]
        expert_headers = {"Authorization": f"Bearer {expert_token}"}
        
        print("5. Verify Observation...")
        verify_data = {
            "status": "VERIFIED",
            "comments": "Looks good",
            "species_id_confirmed": species_id
        }
        resp = client.post(f"{BASE_URL}/expert/reviews/{obs_id}", json=verify_data, headers=expert_headers)
        if resp.status_code != 200:
            print(f"Verification failed: {resp.text}")
            return
        print("Verification successful!")

        # 6. Check Threat Report creation
        print("6. Submit Threat Report...")
        threat_data = {
            "latitude": 30.1,
            "longitude": 75.1,
            "threat_type": "DEFORESTATION",
            "severity": "HIGH",
            "title": "Logging in area",
            "description": "Logging near known medicinal plants",
            "photo_url": "http://example.com/photo.jpg"
        }
        resp = client.post(f"{BASE_URL}/threats/", json=threat_data, headers=auth_headers)
        if resp.status_code != 200:
            print(f"Threat report failed: {resp.text}")
            return
        print("Threat report created successfully.")
        
        # 7. Check Analytics
        print("7. Get Dashboard Stats...")
        resp = client.get(f"{BASE_URL}/analytics/dashboard-stats", headers=auth_headers)
        if resp.status_code != 200:
            print(f"Analytics failed: {resp.text}")
            return
        print("Dashboard stats retrieved successfully.")

        # 8. Check Map
        print("8. Get Map Observations...")
        resp = client.get(f"{BASE_URL}/map/observations", headers=auth_headers)
        if resp.status_code != 200:
            print(f"Map observations failed: {resp.text}")
            return
        print("Map observations retrieved successfully.")

        # 9. Check Conservation Priorities
        print("9. Calculate Conservation Priority...")
        resp = client.post(f"{BASE_URL}/conservation/calculate/{species_id}", headers=auth_headers)
        if resp.status_code != 200:
            print(f"Conservation calculation failed: {resp.text}")
            return
        print("Conservation priority calculated.")

        print("10. Get Conservation Priorities...")
        resp = client.get(f"{BASE_URL}/conservation/priorities", headers=auth_headers)
        if resp.status_code != 200:
            print(f"Get conservation priorities failed: {resp.text}")
            return
        print("Conservation priorities retrieved.")

        # 11. Check AI endpoint
        print("11. AI Identify...")
        # create dummy file
        files = {'file': ('dummy.jpg', b'dummy content', 'image/jpeg')}
        resp = client.post(f"{BASE_URL}/ai/identify", files=files)
        if resp.status_code != 200:
            print(f"AI Identify failed: {resp.text}")
            return
        print("AI Identify succeeded.")

        print("E2E Test Completed Successfully!")

if __name__ == "__main__":
    run_tests()
