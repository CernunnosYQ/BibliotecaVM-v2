from typing import Any
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import as_declarative

from sqlalchemy import (
    ARRAY,
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
    Text,
)


@as_declarative()
class Base:
    id: Any
    __name__: str

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower() + "s"


class Book(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(75), nullable=False)
    author = Column(String(75), nullable=False)
    isbn = Column(String(20))
    synopsis = Column(Text)
    is_available = Column(Boolean, default=True)
    loan_from = Column(DateTime)
    loan_to = Column(DateTime)
    tags = Column(ARRAY(String))


def create_new_book(book, db):
    book = Book(**book.__dict__)
    db.add(book)
    db.commit()
    db.refresh(book)
    return book


def get_all_books(db):
    all_books = db.query(Book).all()
    return all_books


def get_book_by_id(id, db):
    book = db.query(Book).filter(Book.id == id).first()
    return book


def update_book_by_id(id, book, db):
    old_book = db.query(Book).filter(Book.id == id).first()
    if not old_book:
        return {"detail": f"Book with ID {id} not found."}

    for key, value in book.__dict__.items():
        setattr(old_book, key, value)
    db.commit()
    db.refresh(old_book)
    return old_book


def delete_book_by_id(id, db):
    book = db.query(Book).filter(Book.id == id)
    if not book:
        return {"detail": f"Book with ID {id} not found."}

    book.delete()
    db.commit()
    return {"success": True}
