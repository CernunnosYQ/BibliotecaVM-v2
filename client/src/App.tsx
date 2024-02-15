import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import BookTable, { BookProps } from './components/BookTable'

function App() {
  // const [msg, setMsg] = useState('Not Yet')
  const [books, setBooks] = useState<BookProps[]>([])

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/get/books');
      const result = await response.json();
      console.log("Result: ", result)
      setBooks(result)
    } catch (error) {
      console.error('Error fetching data:', error);
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
          <div className='flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8'>
            <BookTable book_list={books} />
          </div>
        </div>

      </div>
    </>
  )
}

export default App


{/* <button onClick={() => {
            fetch('http://localhost:8000')
              .then(res => {
                if (!res.ok) {
                  throw new Error('Bad Request')
                }
                return res.json()
              })
              .then(data => {
                const msg = data.message
                setMsg(msg)
              })
          }}>
            {msg}
          </button> */}