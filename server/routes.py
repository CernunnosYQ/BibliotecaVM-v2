from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from session import get_db
from schemas import BookCreate, BookShow, BookUpdate
from models import (
    get_all_books,
    get_book_by_id,
    create_new_book,
    update_book_by_id,
    delete_book_by_id,
)

router = APIRouter()


@router.get("/get/books", response_model=list[BookShow])
def get_books(db: Session = Depends(get_db)):
    """Get all books"""

    return get_all_books(db)


@router.get("/get/book/{id}", response_model=BookShow)
def get_book(id: int, db: Session = Depends(get_db)):
    """Get one book by id"""

    book = get_book_by_id(db=db, id=id)
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Book not found"
        )

    return BookShow(**book.__dict__)


@router.post(
    "/create/book", response_model=BookShow, status_code=status.HTTP_201_CREATED
)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    """Create a new book"""

    book = create_new_book(db=db, book=book)
    return BookShow(**book.__dict__)


@router.put("/update/book/{id}", response_model=BookShow)
def update_book(id: int, book: BookUpdate, db: Session = Depends(get_db)):
    """Update an existing book"""

    book = update_book_by_id(id=id, book=book, db=db)
    if isinstance(book, dict):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=book.get("detail")
        )

    return BookShow(**book.__dict__)


@router.delete("/delete/book/{id}", status_code=status.HTTP_200_OK)
def delete_book(id: int, db: Session = Depends(get_db)):
    """Delete a book by its id"""

    message = delete_book_by_id(id=id, db=db)
    if not message.get("success"):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=message.get("detail")
        )

    return {"message": "Successfully deleted book"}
