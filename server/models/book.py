from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship, subqueryload, joinedload, Session, Load

from models.base import Base
from models.tag import add_tags, update_tags, remove_all_tags
from schemas import BookCreate, BookUpdate


class Book(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(75), nullable=False)
    author = Column(String(75), nullable=False)
    isbn = Column(String(20))
    editorial = Column(String(50))
    synopsis = Column(Text)
    book_type = Column(String(25))
    is_available = Column(Boolean, default=True)
    tags = relationship("Tag", secondary="booktags")


def create_new_book(book: BookCreate, db: Session) -> Book:
    book = book.__dict__
    tags = book.pop("tags")

    new_book = Book(**book)

    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    add_tags(new_book.id, tags, db)
    db.commit()
    db.refresh(new_book)

    return get_book_by_id(new_book.id, db)


def get_all_books(db: Session) -> list[Book]:
    all_books = db.query(Book).options(joinedload(Book.tags)).all()
    return all_books


def get_book_by_id(book_id: int, db: Session) -> Book:
    book = (
        db.query(Book)
        .filter(Book.id == book_id)
        .options(subqueryload(Book.tags))
        .first()
    )
    return book


def update_book_by_id(book_id: int, book: BookUpdate, db: Session) -> Book | dict:
    old_book = db.query(Book).filter(Book.id == book_id).first()
    if not old_book:
        return {"detail": f"Book with ID {book_id} not found."}

    updated_book = book.__dict__.copy()
    tags = updated_book.pop("tags")

    for key, value in updated_book.items():
        setattr(old_book, key, value)

    update_tags(old_book.id, tags, db)
    db.commit()

    return get_book_by_id(book_id, db)


def delete_book_by_id(book_id: int, db: Session) -> dict:
    book = db.query(Book).filter(Book.id == book_id)
    if not book:
        return {"detail": f"Book with ID {book_id} not found."}

    remove_all_tags(book_id, db)
    book.delete()
    db.commit()
    return {"success": True}
