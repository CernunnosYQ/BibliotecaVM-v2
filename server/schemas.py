from datetime import datetime
from pydantic import BaseModel, ConfigDict
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
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


Tag = Annotated[str, BeforeValidator(lambda tag: tag.tag)]


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
    tags: List[Tag]


class BookUpdate(BookCreate):
    pass


class UserCreate(BaseModel):
    username: str
    password: str


class UserShow(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
