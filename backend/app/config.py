from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    SYNC_DATABASE_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 1440
    STORAGE_TYPE: str = "local"
    STORAGE_PATH: str = "./uploads"
    MAP_TILE_URL: str = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    AI_MODEL_PATH: str = "models/mock_model.pkl"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
