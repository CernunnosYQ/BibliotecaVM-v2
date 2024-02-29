import './App.css'
import Message from './components/Message'
import Navbar from './components/Navbar'
import BookTable from './components/BookTable'
import { BooksProvider } from './contexts/BooksContext'

function App() {
  // const [limit, setLimit] = useState(20)
  // const [offset, setOffset] = useState(0)

  return (
    <BooksProvider>
      <Navbar />
      <div className="py-6">
        <div className='max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8'>
          <Message />
          <BookTable />
        </div>
      </div>
    </BooksProvider>
  )
}



export default App


