import { createContext, useContext, useState, ReactNode } from "react";

type ModalContextType = {
  notification: { type: string, message: string }
  sendNotification: (type: string, message: string) => void
  modal_action: string
  changeModalAction: (action: string) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState({ 'type': 'none', 'message': '' })
  const [modal_action, setModalAction] = useState('')

  const sendNotification = (type: string, message: string): void => {
    setNotification({ type, message })
  }

  const changeModalAction = (action: string): void => {
    setModalAction(action)
  }

  return (
    <ModalContext.Provider value={{ notification, sendNotification, modal_action, changeModalAction }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}