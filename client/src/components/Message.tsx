import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCircleExclamation, faTriangleExclamation, faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useBooks } from '../contexts/BooksContext';
import { useEffect, useState } from 'react';


const NOTIFICATION_TYPES = [
  { type: 'info', classes: 'bg-sky-100 border-sky-500 text-sky-700', icon: faCircleInfo },
  { type: 'warn', classes: 'bg-amber-100 border-amber-500 text-amber-700', icon: faCircleExclamation },
  { type: 'error', classes: 'bg-red-100 border-red-500 text-red-700', icon: faTriangleExclamation },
  { type: 'success', classes: 'bg-emerald-100 border-emerald-500 text-emerald-700', icon: faCircleCheck },
]

export default function Message() {
  const { notification, sendNotification } = useBooks()

  const [show, setShow] = useState(false)
  const [classes, setClasses] = useState('')
  const [icon, setIcon] = useState<any>(faCircleInfo)

  const findNotificationType = (type: string): void => {
    const foundType = NOTIFICATION_TYPES.find(item => item.type === type)
    if (!foundType) {
      setShow(false)
    } else {
      setShow(true)
      setClasses(foundType.classes)
      setIcon(foundType.icon)
    }
  }

  useEffect(() => {
    findNotificationType(notification.type)
  }, [notification])

  return (
    <>
      {
        <div className='mb-4 relative'>
          <div className={`flex justify-center transition-all border px-4 py-3 ${classes} ${show ? '' : 'hidden'}`} role="alert">
            <div className="flex-1 text-center">
              <p className="text-sm"><FontAwesomeIcon icon={icon} /> {notification.message}</p>
            </div>

            <button
              onClick={() => {
                sendNotification('none', '')
              }}
              className={`flex-none -my-1 px-2 border ${classes}`}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      }
    </>
  )
}