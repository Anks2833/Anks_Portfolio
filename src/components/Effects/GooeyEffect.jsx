import React from 'react'

const GooeyEffect = () => {
  return (
    <div className='absolute z-[-1] w-full h-screen'>
        
      <div className='absolute -top-10 -left-40 w-[50vw] h-[30vw] bg-[#BFFF00] rounded-full blur-3xl'></div>
      <div className='absolute -top-10 left-44 rotate-[270deg] w-[40vw] h-[45vw] bg-[#BFFF00] rounded-full blur-3xl'></div>
      <div className='absolute -top-10 left-[30vw] rotate-[180deg] w-[80vw] h-[20vw] bg-[#BFFF00] rounded-full blur-3xl'></div>
      <div className='absolute top-[10vw] -right-[10vw] rotate-[90deg] w-[30vw] h-[25vw] bg-[#BFFF00] rounded-full blur-3xl'></div>

    </div>
  )
}

export default GooeyEffect