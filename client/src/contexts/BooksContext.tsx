import { createContext, useContext, useState, ReactNode } from "react";
import { BookProps } from "../components/BookTable";

type BooksContextType = {
  notification: { type: string, message: string }
  sendNotification: (type: string, message: string) => void
  modal_action: string
  modal_target: number | null
  changeModalAction: (action: string, id?: number) => void
  books_list: BookProps[]
  updateBooks: () => Promise<void>
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState({ 'type': 'none', 'message': '' })
  const [modal_action, setModalAction] = useState('')
  const [modal_target, setModalTarget] = useState<number | null>(null)
  const [books_list, setBooks] = useState<BookProps[]>([])

  const sendNotification = (type: string, message: string): void => {
    setNotification({ type, message })
  }

  const changeModalAction = (action: string, id?: number): void => {
    setModalAction(action)
    setModalTarget(id || null)
  }

  const updateBooks = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8000/api/get/books')
      const result = await response.json()
      if (result.detail) {
        sendNotification('error', `Error al obtener los libros: ${result.detail}`)
        setBooks([])
      } else {
        setBooks(result)
      }
    } catch (error) {
      sendNotification('error', String(error))
      setBooks([])
    }
  }

  return (
    <BooksContext.Provider value={{
      notification, sendNotification,
      modal_action, modal_target, changeModalAction,
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