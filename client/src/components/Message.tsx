import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useBooks } from '../contexts/BooksContext';


export default function Message() {
  const {notification} = useBooks()

  return (
    <>
      {
        notification.type === 'info' && (
          <div className='mb-4'>           
            <div className="flex justify-center bg-sky-100 border border-sky-500 text-sky-700 px-4 py-3" role="alert">
              <p className="text-sm"><FontAwesomeIcon icon={faCircleInfo} /> {notification.message}</p>
            </div>
          </div>
        )
      }
      {
        notification.type === 'warn' && (
          <div className='mb-4'>           
            <div className="flex justify-center bg-amber-100 border border-amber-500 text-amber-700 px-4 py-3" role="alert">
              <p className="text-sm"><FontAwesomeIcon icon={faTriangleExclamation} /> {notification.message}</p>
            </div>
          </div>
        )
      }
      {
        notification.type === 'success' && (
          <div className='mb-4'>           
            <div className="flex justify-center bg-green-100 border border-green-500 text-green-700 px-4 py-3 transition-all" role="alert">
              <p className="text-sm"><FontAwesomeIcon icon={faCircleCheck} /> {notification.message}</p>
            </div>
          </div>
        )
      }
      {
        notification.type === 'error' && (
          <div className='mb-4'>           
            <div className="flex justify-center bg-red-100 border border-red-500 text-red-700 px-4 py-3" role="alert">
              <p className="text-sm"><FontAwesomeIcon icon={faCircleCheck} /> {notification.message}</p>
            </div>
          </div>
        )
      }
    </>
  )
}

// <!-- component -->
    
//     <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
//         <p class="font-bold">Informational message</p>
//         <p class="text-sm">Some additional text to explain said message.</p>
//     </div>

//     <div class="bg-amber-100 border-t border-b border-amber-500 text-amber-700 px-4 py-3" role="alert">
//         <p class="font-bold">Informational message</p>
//         <p class="text-sm">Some additional text to explain said message.</p>
//     </div>

//     <div class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
//         <p class="font-bold">Informational message</p>
//         <p class="text-sm">Some additional text to explain said message.</p>
//     </div>

//     <div class="bg-purple-100 border-t border-b border-purple-500 text-purple-700 px-4 py-3" role="alert">
//         <p class="font-bold">Informational message</p>
//         <p class="text-sm">Some additional text to explain said message.</p>
//     </div>
//      <div class="bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3" role="alert">
//         <p class="font-bold">Informational message</p>
//         <p class="text-sm">Some additional text to explain said message.</p>
//     </div>
// </div>