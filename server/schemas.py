from datetime import datetime
from pydantic import BaseModel, ConfigDict, validator
from typing import Optional, List


class BookCreate(BaseModel):
    title: str
    author: str
    editorial: str
    isbn: Optional[str] = None
    synopsis: Optional[str] = None
    tags: Optional[List[str]] = []


class BookShow(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    author: str
    title: str
    isbn: Optional[str]
    editorial: str
    synopsis: str
    is_available: bool
    loan_from: Optional[datetime]
    loan_to: Optional[datetime]
    tags: List[str]


class BookUpdate(BookCreate):
    synopsis: Optional[str] = None
    is_available: bool
    loan_from: Optional[datetime] = None
    loan_to: Optional[datetime] = None
    tags: List[str] = []

    @validator("loan_from", "loan_to")
    def check_dates(cls, v, values, **kwargs):
        if not values.get("is_available"):
            if not values.get("loan_from") and values.get("loan_to"):
                raise ValueError(
                    "If the book is on loan it needs to have a loan date and a return date"
                )
            if values.get("loan_from") > values.get("loan_to"):
                raise ValueError("The return date must be later than the loan date")
        return v
