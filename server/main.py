from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def index():
    """Welcome for everyone"""

    return {"message": "Hello World! This is a simple private library manager and my first API with FastAPI"}

@app.get("/books/")
async def get_book_list():
    """Main API route, returns the full book list"""

    return {"books": ["This", "is", "the", "booklist"]}

@app.post("/books/")
async def add_new_book():
    """Create a new book data, needs authentication"""

    return {"message": "Book registry successfully created"}

@app.get("/books/{book_id}")
async def get_book(book_id):
    """Get book data by ID"""

    return {"message": f"This is the book with ID {book_id}"}

@app.put("/books/{book_id}")
async def edit_book(book_id):
    """Overides a book data"""

    return {"message": f"Book registry with ID {book_id} successfully modified"}

@app.delete("/books/{book_id}")
async def delete_book(book_id):
    """Delete a book data"""

    return {"message": f"Book registry with ID {book_id} successfully deleted"}