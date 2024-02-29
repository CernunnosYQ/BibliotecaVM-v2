import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { useBooks } from "../contexts/BooksContext"
import Book from "./Book"
import BookModal from "./BookModal"


type BookListProps = {
  limit?: number
  offset?: number
}


const BookTable = (props: BookListProps) => {
  const [showModal, setShowModal] = useState(false)
  const { books_list, updateBooks } = useBooks()

  useEffect(() => {
    updateBooks()
  }, [])

  return (
    <>
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
      {showModal && <BookModal id="book_modal" onClose={() => setShowModal(false)} action='add' />}
      <ButtonCreate onClick={() => setShowModal(true)} />
    </>
  )
}


const ButtonCreate = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="relative">
      <button className="z-20 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-0 right-0 right-5 rounded-lg
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
        onClick={
          () => {
            onClick()
          }
        }>
        <div className="px-4 py-3 rounded-full border-4 border-white bg-gray-600">
          <FontAwesomeIcon icon={faPlus} size="xl" color="#fff" />
        </div>
      </button>
    </div>
  )
}

export default BookTable