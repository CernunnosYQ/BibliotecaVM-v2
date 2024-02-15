import { useEffect, useState } from 'react'
import './App.css'
import Message from './components/Message'
import Navbar from './components/Navbar'
import BookTable, { BookProps } from './components/BookTable'

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
        setMsg({ 'type': 'success', 'message': 'Successfully retrieved books.' })
        setBooks(result)
      }
    } catch (error) {
      setBooks([])
      setMsg({ 'type': "error", 'message': String(error) });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className=''>
        <Navbar />
        <div className="py-6">
          <div className='max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8'>
            <Message type={msg.type} message={msg.message} />
            <BookTable book_list={books} />
          </div>
        </div>
        <button onClick={() => {
          setMsg({ 'type': 'success', 'message': "Book added to library!" });
        }}>
          Test
        </button>
      </div >
    </>
  )
}

export default App


