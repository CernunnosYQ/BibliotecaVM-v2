import { useState } from "react"
import { useModal } from "../contexts/ModalContext"

interface ModalProps {
  show?: boolean
  id: string
  book_id?: number
}

export default function BookModal(props: ModalProps) {
  const [is_available, setAvailable] = useState(true)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')
  const [editorial, setEditorial] = useState('')
  const [book_type, setBookType] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [categories, setCategories] = useState('')

  const { sendNotification, modal_action } = useModal()


  function toggle_switch() {
    let my_switch = document.querySelector('#switch')
    setAvailable(!is_available)

    my_switch?.classList.toggle('left-1');
    my_switch?.classList.toggle('bg-indigo-500');
    document.querySelector('#bg_switch')?.classList.toggle('bg-indigo-200')

    my_switch?.classList.toggle('right-1');
    my_switch?.classList.toggle('bg-amber-500');
    document.querySelector('#bg_switch')?.classList.toggle('bg-amber-200')

    if (my_switch) {
      my_switch.textContent = my_switch.textContent === "No disponible" ? "Disponible" : "No disponible"
    }
  }

  const handle_cancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setTitle('');
    setAuthor('');
    setIsbn('');
    setEditorial('');
    setBookType('');
    setSynopsis('');
    setCategories('');

    sendNotification('info', 'Notification received')
    document.querySelector(`#${props.id}`)?.classList.add('hidden');
  }

  const handle_submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let action = modal_action;

    let data = {
      title,
      author,
      isbn,
      editorial,
      book_type,
      synopsis,
      'tags': categories.split(','),
      is_available,
    }

    console.log(action, data)

    if (action === 'add') {
      await fetch('http://localhost:8000/api/create/book', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json)
        .then(data => {
          console.log(data);
          sendNotification('success', 'Book added')
          document.querySelector(`#${props.id}`)?.classList.add('hidden');
        })
        .catch(error => (
          console.log(error)
        ))
    }

  }

  return (
    <div id={props.id}
      className="absolute h-screen w-screen m-0 p-0 flex justify-center items-center left-0 top-0 bg-gray-600/60 z-40 hidden">
      <div className="md:max-h-5/6 mb-auto md:my-auto md:w-3/4 lg:w-1/3 mx-auto px-8 py-4 bg-gray-200">
        <form action="">
          <div
            id="bg_switch"
            onClick={(e) => {
              e.preventDefault()
              toggle_switch()
            }}
            className="mx-8 rounded border-b-2 border-gray-400 h-10 mt-4 mb-5 flex p-1 relative items-center bg-indigo-200">
            <span
              id="switch"
              className="bg-indigo-500 drop-shadow-sm text-gray-200 flex items-center justify-center w-1/2 rounded h-8 transition-all ease-in duration-300 top-1 absolute left-1 ">
              Disponible
            </span>
            <input id="is_available" type="checkbox" checked={is_available} className="hidden" />
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor='title' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Titulo
            </label>
            <input type="text" name="title" id="title" placeholder="Título del libro"
              value={title} onChange={(e) => { setTitle(e.target.value) }}
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-sky-500 text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor='author' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Autor
            </label>
            <input type="text" name="author" id="author" placeholder="Autor del libro"
              value={author} onChange={(e) => { setAuthor(e.target.value) }}
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-sky-500 text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor='isbn' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              ISBN
            </label>
            <input type="text" name="isbn" id="isbn" placeholder="ISBN del libro"
              value={isbn} onChange={(e) => { setIsbn(e.target.value) }}
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-sky-500 text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor='editorial' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Editorial
            </label>
            <input type="text" name="editorial" id="editorial" placeholder="Editorial del libro"
              value={editorial} onChange={(e) => { setEditorial(e.target.value) }}
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-sky-500 text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <div className="flex items-center mb-5">
            <label className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Tipo
            </label>
            <select
              value={book_type} onChange={(e) => { setBookType(e.target.value) }}
              className="flex-1 p-2 border-b-2 border-gray-400 focus:border-sky-500 text-gray-600 placeholder-gray-400 outline-none bg-white">
              <option>Selecciona</option>
              <option>Pasta dura</option>
              <option>Pasta blanda</option>
              <option>Digital</option>
            </select>
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor='synopsis' className="inline-block w-20 mr-6 text-right mb-auto font-bold text-gray-600">
              Sinopsis
            </label>
            <textarea
              name="synopsis"
              id="synopsis"
              placeholder="Sinopsis del libro"
              value={synopsis} onChange={(e) => { setSynopsis(e.target.value) }}
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-sky-500 text-gray-600 placeholder-gray-400 outline-none resize-none"
              rows={3}
            ></textarea>
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor='categories' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Categorías
            </label>
            <textarea
              name="categories"
              id="categories"
              placeholder="Categorías separadas por comas"
              value={categories} onChange={(e) => { setCategories(e.target.value) }}
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-sky-500 text-gray-600 placeholder-gray-400 outline-none resize-none"
              rows={2}
            ></textarea>
          </div>
          <div className="text-right pb-6">
            <button
              onClick={handle_cancel}
              className="py-3 px-8 text-gray-600 border-gray-600 border-2 hover:bg-red-400 hover:border-gray-200 hover:text-gray-200 font-bold ml-4">Cancelar</button>
            <button
              onClick={handle_submit}
              className="py-3 px-8 bg-indigo-600 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500 border-2 text-white font-bold ml-4">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}