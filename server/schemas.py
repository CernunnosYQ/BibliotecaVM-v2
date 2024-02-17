from datetime import datetime
from pydantic import BaseModel, ConfigDict, validator
from typing import Optional, List


class BookCreate(BaseModel):
    title: str
    author: str
    editorial: str
    book_type: str
    isbn: Optional[str] = None
    synopsis: Optional[str] = None
    is_available: Optional[bool] = True
    tags: Optional[List[str]] = []


class BookShow(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    author: str
    title: str
    isbn: Optional[str]
    editorial: str
    synopsis: str
    book_type: str
    is_available: bool
    tags: List[str]


class BookUpdate(BookCreate):
    pass
