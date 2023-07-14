from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    'http://localhost:5173',
    'https://localhost:5173',
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index():
    """Welcome for everyone"""

    return {"message": "Hello World! This is a simple private library manager and my first API with FastAPI"}


@app.get("/books/")
async def search_book(skip: int = 0, limit: int = 10):
    """Main API route.
    
    Returns the complete booklist, accepts some filter params"""

    return {"books": ["Books", "from", skip, "to", skip + limit]}


@app.post("/books/")
async def add_new_book():
    """Create a new book data, needs authentication"""

    return {"message": "Book data was successfully created"}


@app.get("/books/{book_id}")
async def get_book(book_id: int):
    """Get book data by ID"""

    return {"message": f"This is the book with ID {book_id}"}


@app.put("/books/{book_id}")
async def edit_book(book_id: int):
    """Overides a book data"""

    return {"message": f"Book registry with ID {book_id} was successfully modified"}


@app.delete("/books/{book_id}")
async def delete_book(book_id: int):
    """Delete a book data"""

    return {"message": f"Book registry with ID {book_id} was successfully deleted"}