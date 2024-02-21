import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons"

import { deleteBook } from "../utils/crud"
import { useBooks } from "../contexts/BooksContext"

type BookListProps = {
  limit?: number
  offset?: number
}

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


const BookTable = (props: BookListProps) => {
  const { books_list, updateBooks } = useBooks()

  useEffect(() => {
    updateBooks()
  }, [])

  return (
    <table className='min-w-full border-collapse block md:table'>
      <thead className="block md:table-header-group">
        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Titulo</th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Autor</th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Editorial</th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Categorías</th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
        </tr>
      </thead>
      <tbody className="">
        {
          books_list.length !== 0 &&
          books_list.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              editorial={book.editorial}
              tags={book.tags}
              is_available={book.is_available} />
          ))
        }
      </tbody>
    </table>
  )
}

const Book = ({ id, title, author, editorial, tags, is_available }: BookProps) => {
  const { changeModalAction, sendNotification, updateBooks } = useBooks()
  const handleClick = () => {
    changeModalAction('edit', id)
  }

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
    <tr key={id} className="border-cstmgray-700 border-t mx-auto block md:table-row mb-4 md:mb-0">
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
          onClick={handleClick}
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
  )
}

export default BookTable