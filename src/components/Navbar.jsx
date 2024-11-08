import React from 'react'
import { BsArrowUpRight } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className='w-full h-[6vw] flex justify-between items-center px-16 text-white'>
        
        <h1 className='text-[2.6vw] font-extrabold italic'>AD</h1>

        <div className='flex gap-2 items-center'>
            <h1 className='italic text-[1.2vw] font-extralight'>CONNECT WITH ME</h1>
            <div className='text-[1.5vw]'>
                <BsArrowUpRight />
            </div>
        </div>
    
    </div>
  )
}

export default Navbar