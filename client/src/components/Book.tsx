import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons"

import { useBooks } from "../contexts/BooksContext"
import { deleteBook } from "../utils/crud"
import BookModal from "./BookModal"

export interface BookProps {
  id?: number
  title: string
  author: string
  isbn?: string | undefined
  synopsis?: string | undefined
  editorial: string
  book_type?: string
  tags: string[]
  is_available: boolean
}

const Book = ({ id, title, author, editorial, tags, is_available }: BookProps) => {
  const { sendNotification, updateBooks } = useBooks()
  const [showModal, setShowModal] = useState(false)

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    if (isConfirmed && id) {
      let { success, detail } = await deleteBook(id)
      if (success) {
        sendNotification('success', detail)
        updateBooks()
      } else {
        sendNotification('error', detail)
      }
    }
  }

  let category_badges = tags.map((tag, iter) => {
    return (
      <span key={iter}
        className="center inline-block select-none whitespace-nowrap rounded-full bg-blue-300 py-2 px-3 ml-1 align-baseline text-sm leading-none">
        <div className="mt-px">{tag}</div>
      </span>
    )
  })

  return (
    <>
      <tr key={id} className="border-gray-400 border-b mx-auto block md:table-row mb-4 md:mb-0">
        <td className="p-2 align-middle block md:table-cell">
          <p className={"h-4 md:w-4 rounded-full mx-auto" + (is_available ? " bg-emerald-500" : " bg-amber-500")}></p>
        </td>
        <td className="py-2 align-middle text-center md:text-left block md:table-cell">
          <p className="">{title}</p>
        </td>
        <td className="py-2 align-middle text-center md:text-left block md:table-cell">
          <p className="">{author}</p>
        </td>
        <td className="py-2 align-middle text-center md:text-left block md:table-cell">{editorial}</td>
        <td className="py-2 align-middle text-center md:text-left overflow-x-hidden max-w-full md:max-w-96 block md:table-cell">
          <div className="flex flex-nowrap overflow-x-auto justify-center md:justify-start">
            {category_badges}
          </div>
        </td>
        <td className="py-2 align-middle text-center block md:table-cell">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-600 hover:bg-gray-500 px-4 py-1 rounded-full text-gray-200">
            <FontAwesomeIcon icon={faEllipsis} color="#fff" />
          </button>
          <button
            onClick={handleDelete}
            className="bg-gray-600 hover:bg-gray-500 px-4 py-1 rounded-full text-gray-200 ml-3">
            <FontAwesomeIcon icon={faTrash} color="#fff" />
          </button>
        </td>
      </tr >
      {showModal && <BookModal id="book_modal" action="edit" book_id={id} onClose={() => { setShowModal(false) }} />}
    </>
  )
}

export default Book