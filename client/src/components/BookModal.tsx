interface ModalProps {
  show?: boolean
  action: 'add' | 'edit' | 'delete'
}

export default function BookModal(props: ModalProps) {
  return (
    <div id="book-modal"
      className={"absolute h-screen w-screen m-0 p-0 left-0 top-0 bg-gray-600/60 z-40" + (props.show ? "" : " hidden")} >
      <div className="md:w-3/4 lg:w-1/3 mx-auto py-4 px-8 bg-gray-200 center md:my-8">
        <form action="">
          <div className="py-8 mb-8 border-gray-300 border-b-2">
            <h1 className="text-center text-4xl md:text-5xl font-semibold tracking-widest text-gray-700 rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
              BibliotecaVM v2
            </h1>
          </div>
          <div className="flex items-center mb-5">
            <label className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Disponible
            </label>
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
              />
            </div>
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor='title' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Titulo
            </label>
            <input type="text" name="title" id="title" placeholder="Título del libro"
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor='author' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Autor
            </label>
            <input type="text" name="author" id="author" placeholder="Autor del libro"
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor='editorial' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              ISBN
            </label>
            <input type="text" name="editorial" id="editorial" placeholder="Editorial del libro"
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor='editorial' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Editorial
            </label>
            <input type="text" name="editorial" id="editorial" placeholder="Editorial del libro"
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <div className="flex items-center mb-5">
            <label className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Tipo
            </label>
            <select className="flex-1 p-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none">
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
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none resize-none"
              rows={4}
            ></textarea>
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor='categories' className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
              Categorías
            </label>
            <input type="text" name="categories" id="categories" placeholder="Editorial del libro"
              className="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <div className="text-right pb-6 border-gray-300 border-b-2 mb-4">
            <button className="py-3 px-8 text-gray-600 border-gray-600 border-2 hover:bg-red-400 hover:border-gray-200 hover:text-gray-200 font-bold ml-4">Cancelar</button>
            <button className="py-3 px-8 bg-gray-600 hover:bg-gray-700 border-gray-600 border-2 text-white font-bold ml-4">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}