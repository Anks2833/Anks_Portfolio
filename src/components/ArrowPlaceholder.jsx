import React from 'react'

const ArrowPlaceholder = (props) => {

    const { title } = props;

  return (
    <div className='w-full h-full bg-white flex justify-center items-center px-10'>
        <h1 className='text-black text-center'>{title}</h1>
    </div>
  )
}

export default ArrowPlaceholder