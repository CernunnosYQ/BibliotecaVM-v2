type BookListProps = {
    limit ?: number
    skip ?: number
}

type BookProps = {
    cover: string 
    title: string
    author: string
    editorial: string
    categories: string[]
    status: string
}


const BookList = (props: BookListProps) => {
    return (
        <table className='w-full '>
            <tr className="text-left text-cstmgray-500">
                <th className="pb-3 font-normal"></th>
                <th className="pb-3 font-normal">Title / Author</th>
                <th className="pb-3 font-normal">Editorial</th>
                <th className="pb-3 font-normal">Categories</th>
                <th className="pb-3 font-normal">Status</th>
                <th className="pb-3 font-normal"></th>
                <th className="pb-3 font-normal"></th>
            </tr>
            {/* Example row for development purposes */}
            <Book
                cover='sample.png'
                title='El lobo estepario'
                author='Hermann Hesse'
                editorial='Selections'
                categories={['Novela', 'Ficción', 'Autobiográfico']}
                status='Disponible'
            />
        </table>
    )
}

const Book = ({cover, title, author, editorial, categories, status}: BookProps) => {
    let category_badges = categories.map((category) => {
        return (
            <span className="mr-2 ">
                {category}
            </span>
        )})
    
    return (
        <tr className="border-cstmgray-700 border-t">
            <td className="py-2 align-middle">
                <img src={cover} alt="Cover" className="h-20 mx-auto" />
            </td>
            <td className="py-2 align-middle">
                <p className="">{title}</p>
                <p className="text-cstmgray-700">{author}</p>
            </td>
            <td className="py-2 align-middle">{editorial}</td>
            <td className="py-2 align-middle">
                {category_badges}
            </td>
            <td className="py-2 align-middle">{status}</td>
            <td className="py-2 align-middle text-center">
                <button className="bg-teal-400 hover:bg-teal-500 px-8 py-2 rounded-full text-cstmgray-800">
                    View</button>
            </td>
            <td className="py-2 align-middle text-center">
                <button className="hover:bg-cstmgray-800 px-4 py-2 rounded-full">
                    ...
                </button>
            </td>
        </tr>
    )
}

export default BookList