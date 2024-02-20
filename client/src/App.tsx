import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import Message from './components/Message'
import Navbar from './components/Navbar'
import BookTable, { BookProps } from './components/BookTable'
import BookModal from './components/BookModal'
import { ModalProvider, useModal } from './contexts/ModalContext'

function App() {
  const [msg, setMsg] = useState({ 'type': 'none', 'message': '' })
  const [books, setBooks] = useState<BookProps[]>([])

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/get/books');
      const result = await response.json();
      console.log(result)
      if (result.detail) {
        setMsg({ 'type': 'error', 'message': result.detail });
      } else {
        setMsg({ 'type': 'info', 'message': 'Successfully retrieved books.' })
        setBooks(result)
      }
    } catch (error) {
      setBooks([])
      setMsg({ 'type': "error", 'message': String(error) });
    }
  };

  const openModal = () => {
    let modal = document.querySelector("#book_modal")
    modal?.classList.remove('hidden');
  }

  const closeModal = () => {
    let modal = document.querySelector("#book_modal")
    modal?.classList.add('hidden');
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ModalProvider>
      <Navbar />
      <div className="py-6">
        <div className='max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8'>
          <BookModal id="book_modal" onClose={closeModal} />
          <Message />
          <BookTable book_list={books} />
          <ButtonCreate onClick={openModal} />
        </div>
      </div>
    </ModalProvider>
  )
}


const ButtonCreate = ({ onClick }: { onClick: () => void }) => {
  const { changeModalAction, sendNotification } = useModal()

  return (
    <div className="relative">
      <button className="z-20 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-0 right-0 right-5 rounded-lg
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
        onClick={
          () => {
            onClick()
            changeModalAction('add')
            sendNotification('success', 'New book added!')
          }
        }>
        <div className="px-4 py-3 rounded-full border-4 border-white bg-gray-600">
          <FontAwesomeIcon icon={faPlus} size="xl" color="#fff" />
        </div>
      </button>
    </div>
  )
}



export default App


