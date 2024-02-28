import { useEffect, useRef } from "react"


const Modal = (props: { id: string, onClose?: () => void, className?: string, children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleVisible = () => {
    document.removeEventListener('mousedown', handleClickOutside)
    if (props.onClose) props.onClose()
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      toggleVisible()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div id={props.id}
      className="absolute w-screen h-screen m-0 p-0 top-0 left-0 flex justify-center items-center bg-gray-800/60 z-40">
      <div ref={containerRef}
        className={props.className ? props.className : "bg-gray-200"}>
        {props.children}
      </div>
    </div>
  )
}

const ModalHeader = (props: { children: React.ReactNode }) => {
  return (
    <div className="relative m-4 p-2 mb-0 pb-0">
      {/* <button className="absolute top-3 right-0 p-1 py-0 border border-gray-500">
        <FontAwesomeIcon icon={faXmark} />
      </button> */}
      <h2 className="py-2 text-center text-3xl text-gray-800">{props.children}</h2>
      <hr className="w-3/4 mx-auto border-gray-400" />
    </div>
  )
}

export default Modal;
export { ModalHeader };