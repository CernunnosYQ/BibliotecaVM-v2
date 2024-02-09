from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from typing import Generator

from config import settings

DB_URL = settings.DB_URL
engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
