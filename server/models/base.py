from sqlalchemy.orm import as_declarative
from sqlalchemy.ext.declarative import declared_attr

from typing import Any


@as_declarative()
class Base:
    id: Any
    __name__: str

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower() + "s"
