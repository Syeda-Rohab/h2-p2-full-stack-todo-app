from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application configuration from environment variables"""

    DATABASE_URL: str
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_DAYS: int = 7
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]
    APP_NAME: str = "Todo API - Phase III"
    DEBUG: bool = True

    # Phase III: AI Configuration
    OPENAI_API_KEY: str = "sk-proj-your-openai-key-here"
    OPENAI_MODEL: str = "gpt-4o-mini"
    OPENAI_MAX_TOKENS: int = 300

    # Feature Flags
    ENABLE_AI_CHAT: bool = True
    ENABLE_VOICE: bool = True
    ENABLE_SUGGESTIONS: bool = True

    class Config:
        env_file = ".env"


settings = Settings()
