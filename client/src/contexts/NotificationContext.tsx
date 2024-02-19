import { createContext, useContext, useState, ReactNode } from "react";

type NotificationContextType = {
  notification: { type: string, message: string }
  sendNotification: (type: string, message: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState({ 'type': 'none', 'message': '' })

  const sendNotification = (type: string, message: string): void => {
    setNotification({ type, message })
  }

  return (
    <NotificationContext.Provider value={{ notification, sendNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}