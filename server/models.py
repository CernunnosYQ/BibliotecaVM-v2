from typing import Any
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import as_declarative

from sqlalchemy import (
    ARRAY,
    Boolean,
    Column,
    Integer,
    String,
    Text,
)

from security import Hasher


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
    editorial = Column(String(50))
    synopsis = Column(Text)
    book_type = Column(String(25))  # e.g., ["hardcover", "paperback", "digital"]
    is_available = Column(Boolean, default=True)
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


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    is_superuser = Column(Boolean, default=False)


def get_user(username, db):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return {"detail": f'User "{username}" does not exist.'}

    return user


def create_new_user(user, db):
    new_user = User(
        username=user.username, password_hash=Hasher.hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"success": True}


def delete_user(username, db):
    user = db.query(User).filter(User.username == username)
    if not user:
        return {"detail": f'User "{username}" does not exist.'}

    user.delete()
    db.commit()
    return {"success": True}
