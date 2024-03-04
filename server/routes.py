from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from session import get_db
from schemas import BookCreate, BookShow, BookUpdate, UserCreate, Token
from models.book import (
    get_all_books,
    get_book_by_id,
    create_new_book,
    update_book_by_id,
    delete_book_by_id,
    search_books_by_tag,
)
from models.user import get_user, create_new_user
from security import (
    Hasher,
    create_access_token,
    validate_access_token,
)

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


@router.get("/get/books")
async def get_books(db: Session = Depends(get_db)):
    """Get all books"""

    books = [BookShow(**book.__dict__) for book in get_all_books(db=db)]
    return {"success": True, "data": books}


@router.get("/get/book/{id}")
async def get_book(id: int, db: Session = Depends(get_db)):
    """Get one book by id"""

    book = get_book_by_id(db=db, book_id=id)
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Book not found"
        )

    return {"success": True, "data": BookShow(**book.__dict__)}


@router.post("/create/book", status_code=status.HTTP_201_CREATED)
async def create_book(
    book: BookCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    """Create a new book"""

    validation = validate_access_token(token=token)
    if not validation.get("success"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=validation.get("detail")
        )
    else:
        book = create_new_book(db=db, book=book)
        return {
            "success": True,
            "data": BookShow(**book.__dict__),
            "token": validation["token"],
        }


@router.put("/update/book/{id}")
async def update_book(
    id: int,
    book: BookUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    """Update an existing book"""

    validation = validate_access_token(token=token)
    if not validation.get("success"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=validation.get("detail")
        )
    else:
        book = update_book_by_id(book_id=id, book=book, db=db)
        if isinstance(book, dict):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=book.get("detail")
            )

        return {
            "success": True,
            "data": BookShow(**book.__dict__),
            "token": validation["token"],
        }


@router.delete("/delete/book/{id}", status_code=status.HTTP_200_OK)
async def delete_book(
    id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    """Delete a book by its id"""

    validation = validate_access_token(token=token)
    if not validation.get("success"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=validation.get("detail")
        )
    else:
        message = delete_book_by_id(book_id=id, db=db)
        if not message.get("success"):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=message.get("detail")
            )

        return {
            "success": True,
            "detail": "Successfully dedleted book",
            "token": validation["token"],
        }


@router.get("/get/tag/{tag}")
def get_books_with_tag(tag: str, db: Session = Depends(get_db)):
    """Get all books with the specified tag."""

    books = [
        BookShow(**book.__dict__) for book in search_books_by_tag(tag_name=tag, db=db)
    ]
    return {"success": True, "data": books}


def authenticate_user(username, password, db):
    user = get_user(username=username, db=db)
    if not user or not Hasher.verify_password(password, user.password_hash):
        return False
    return user


@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = authenticate_user(
        username=form_data.username, password=form_data.password, db=db
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    access_token = create_access_token(data={"sub": user.username})

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_new_user(user: UserCreate, db: Session = Depends(get_db)):
    user = create_new_user(user, db)
    return {"success": True}
