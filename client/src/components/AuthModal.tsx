import { useState } from "react"
import { useBooks } from "../contexts/BooksContext"
import Modal, { ModalHeader } from "./Modal"
import { login, register } from "../utils/crud"


const AuthModal = (props: { id: string, onClose: () => void }) => {
  const [showLogin, setShowLogin] = useState<boolean>(true)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { sendNotification } = useBooks()

  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    let { success, detail } = (showLogin ? await login(username, password) : await register(username, password))

    if (success) {
      setUsername('')
      setPassword('')
      props.onClose()
    } else {
      setPassword('')
      sendNotification('error', detail ? detail : 'Failed to authenticate')
    }
  }

  return (
    <Modal id={props.id} onClose={props.onClose}>
      <ModalHeader>{showLogin ? 'Login' : 'Register'}</ModalHeader>
      <form onSubmit={handleSubmit} className="p-8 text-left">
        <div className="flex items-center mb-5">
          <label htmlFor='username' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
            Username
          </label>
          <input type="text" name="username" id="username" placeholder="Username"
            value={username} onChange={(e) => { setUsername(e.target.value) }} required
            className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-sky-500 text-gray-600 placeholder-gray-400 outline-none" />
        </div>
        <div className="flex items-center mb-5">
          <label htmlFor='password' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
            Password
          </label>
          <input type="password" name="password" id="password" placeholder="Password"
            value={password} onChange={(e) => { setPassword(e.target.value) }} required
            className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-sky-500 text-gray-600 placeholder-gray-400 outline-none" />
        </div>
        <p onClick={handleToggleForm} className="text-sm text-center py-2 text-gray-500">
          {showLogin ? 'Don\'t have an account? Register here' : 'Already have an account? Login here'}
        </p>
        <div className="pt-4 flex justify-center">
          <button type="submit" className='w-1/2 py-3 px-8 bg-indigo-600 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500 border-2 text-white font-bold ml-4'>
            {showLogin ? 'Login' : 'Register'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AuthModal