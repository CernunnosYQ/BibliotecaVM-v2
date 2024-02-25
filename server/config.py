import os
import json
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(os.getcwd()) / ".env"
load_dotenv(dotenv_path=env_path)


class Settings:
    PROJECT_NAME: str = "BibliotecaVM"
    PROJECT_VERSION: str = "v2.0.0"

    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")
    DB_HOST: str = os.getenv("DB_HOST")
    DB_PORT: str = os.getenv("DB_PORT")
    DB_NAME: str = os.getenv("DB_NAME")
    DB_URL: str = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

    SECRET_KEY: str = os.getenv("SECRET_KEY")
    JWT_ALGORITHM: str = "HS512"
    EXP_MINS = 30

    CORS_ORIGINS: list[str] = (
        json.loads(os.getenv("CORS_ORIGINS")) if os.getenv("CORS_ORIGINS") else []
    )


settings = Settings()
