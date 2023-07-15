import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
}

const Card = ({children} : CardProps) => {

  return (
    <div className='bg-cstmgray-900 text-cstmgray-100 p-4 rounded-xl drom-shadow'>
      {children}
    </div>
  )
}

export default Card