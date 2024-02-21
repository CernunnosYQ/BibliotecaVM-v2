import { BookProps } from "../components/BookTable";

const API_URL = 'http://localhost:8000/api'

const getAllBooks = async (): Promise<{ success: boolean, data: BookProps[] }> => {
  try {
    const response = await fetch(`${API_URL}/get/books`)
    const books = await response.json()
    return (
      books.detail
        ? { success: false, data: [] }
        : { success: true, data: books }
    )
  } catch (error) {
    return { success: false, data: [] }
  }
}

const getBook = async (id: number): Promise<{ success: boolean, data: BookProps | null }> => {
  try {
    const response = await fetch(`${API_URL}/get/book/${id}`)
    const book = await response.json()

    return (
      book.detail
        ? { success: false, data: null }
        : { success: true, data: book }
    )
  } catch (error) {
    return { success: false, data: null }
  }
}

const createNewBook = async (bookData: BookProps): Promise<{ success: boolean, detail: string }> => {
  try {
    const response = await fetch(`${API_URL}/create/book`, {
      method: 'POST',
      body: JSON.stringify(bookData),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()

    if (response.status === 201) {
      return { success: true, detail: 'Book created successfully.' }
    } else {
      return { success: false, detail: data.detail ? data.detail : 'An error occurred while creating the book.' }
    }
  } catch (error) {
    return { success: false, detail: 'Failed to add book' };
  }
}

const updateBook = async (book_data: BookProps): Promise<{ success: boolean; detail: string }> => {
  try {
    const response = await fetch(`${API_URL}/update/book/${book_data.id}`, {
      method: 'PUT',
      body: JSON.stringify(book_data),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()

    if (response.status === 200) {
      return { success: true, detail: 'Book updated successfuly' }
    } else {
      return { success: false, detail: data.detail ? data.detail : 'Error updating the book' }
    }
  } catch (error) {
    return { success: false, detail: 'Error updating the book' }
  }
}

const deleteBook = async (id: number): Promise<{ success: boolean, detail: string }> => {
  try {
    const response = await fetch(`${API_URL}/delete/book/${id}`, { method: 'DELETE' })
    const data = await response.json()

    if (response.status === 200) {
      return { success: true, detail: "The book was deleted" }
    } else {
      return { success: false, detail: data.detail ? data.detail : "Could not delete the book." }
    }
  } catch (error) {
    return { success: false, detail: "Could not delete the book." }
  }
}

export {
  getAllBooks,
  getBook,
  createNewBook,
  updateBook,
  deleteBook,
};