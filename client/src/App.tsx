import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import Message from './components/Message'
import Navbar from './components/Navbar'
import BookTable from './components/BookTable'
import BookModal from './components/BookModal'
import { BooksProvider, useBooks } from './contexts/BooksContext'

function App() {
  // const [limit, setLimit] = useState(20)
  // const [offset, setOffset] = useState(0)

  const openModal = () => {
    let modal = document.querySelector("#book_modal")
    modal?.classList.remove('hidden');
  }

  return (
    <BooksProvider>
      <Navbar />
      <div className="py-6">
        <div className='max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8'>
          <BookModal id="book_modal" onClose={() => { }} />
          <Message />
          <BookTable />
          <ButtonCreate onClick={openModal} />
        </div>
      </div>
    </BooksProvider>
  )
}


const ButtonCreate = ({ onClick }: { onClick: () => void }) => {
  const { changeModalAction } = useBooks()

  return (
    <div className="relative">
      <button className="z-20 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-0 right-0 right-5 rounded-lg
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
        onClick={
          () => {
            onClick()
            changeModalAction('add')
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


