type BookListProps = {
  book_list: BookProps[]
}

export interface BookProps {
  id?: number
  title: string
  author: string
  isbn?: string | undefined
  synopsis?: string | undefined
  editorial: string
  tags: string[]
  is_available: string
}


const BookTable = (props: BookListProps) => {
  console.log(props);

  return (
    <table className='min-w-full border-collapse block md:table'>
      <thead className="block md:table-header-group">
        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
          <th className="pb-3 bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Title / Author</th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Editorial</th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Categories</th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Status</th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
        </tr>
      </thead>
      <tbody>
        {
          props.book_list.map((book) => (
            <Book key={book.id} id={book.id} title={book.title} author={book.author} editorial={book.editorial} tags={book.tags} is_available={book.is_available} />
          ))
        }
      </tbody>
    </table>
  )
}

const Book = ({ id, title, author, editorial, tags, is_available }: BookProps) => {
  let category_badges = tags.map((tag, iter) => {
    return (
      <div key={iter} className="center relative inline-block select-none whitespace-nowrap rounded-xl bg-blue-300 py-2 px-3 ml-1 align-baseline text-sm leading-none">
        <div className="mt-px">{tag}</div>
      </div>
    )
  })

  return (
    <tr key={id} className="border-cstmgray-700 border-t">
      <td className="py-2 align-middle">

      </td>
      <td className="py-2 align-middle">
        <p className="">{title}</p>
        <p className="text-cstmgray-700">{author}</p>
      </td>
      <td className="py-2 align-middle">{editorial}</td>
      <td className="py-2 align-middle">
        {category_badges}
      </td>
      <td className="py-2 align-middle">{is_available}</td>
      <td className="py-2 align-middle text-center">
        <button className="bg-teal-400 hover:bg-teal-500 px-8 py-2 rounded-full text-cstmgray-800">
          View
        </button>
      </td>
      <td className="py-2 align-middle text-center">
        <button className="hover:bg-cstmgray-800 px-4 py-2 rounded-full">
          ...
        </button>
      </td>
    </tr>
  )
}

export default BookTable