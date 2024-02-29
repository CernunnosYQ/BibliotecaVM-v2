import { createContext, useContext, useState, ReactNode } from "react";
import { BookProps } from "../components/Book";

import { getAllBooks } from "../utils/crud";

type BooksContextType = {
  notification: { type: string, message: string }
  sendNotification: (type: string, message: string) => void
  books_list: BookProps[]
  updateBooks: () => Promise<void>
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState({ 'type': 'none', 'message': '' })
  const [books_list, setBooks] = useState<BookProps[]>([])

  const sendNotification = (type: string, message: string): void => {
    setNotification({ type, message })
  }

  const updateBooks = async (): Promise<void> => {
    let { success, data } = await getAllBooks()
    if (success) {
      setBooks(data)
    } else {
      sendNotification('error', 'Error retreiving books')
    }
  }

  return (
    <BooksContext.Provider value={{
      notification, sendNotification,
      books_list, updateBooks
    }}>
      {children}
    </BooksContext.Provider>
  )
}

export const useBooks = (): BooksContextType => {
  const context = useContext(BooksContext)
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider')
  }
  return context
}