import { useState } from 'react'
import Card from './components/Card'
import './App.css'
import BookList from './components/BookList'

function App() {
  const [msg, setMsg] = useState('Not Yet')

  return (
    <div className='bg-cstmgray-800 p-8'>
      <Card>
        <BookList />
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
      </Card>
    </div>
  )
}

export default App
