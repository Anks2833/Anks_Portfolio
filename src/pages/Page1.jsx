import React from 'react'
import Navbar from '../components/Navbar'
import Page1Content from '../components/Page1Content'

import { FaLinkedin } from "react-icons/fa";
import SidebarTrigger from '../components/SidebarTrigger';

const Page1 = () => {
  return (
    <div>
      <Navbar />

      <Page1Content />

      {/* The bottom content */}
      <div className='flex justify-between px-5 mt-40'>

        <div className='flex items-start gap-2'>
          <div className='bg-white w-[0.01vw] h-16'></div>
          <div className='flex flex-col text-white leading-none'>
            <h1 className='font-extrabold text-[1.5vw]'>SCROLL</h1>
            <h1 className='font-extrabold text-[1.5vw]'>TO EXPLORE</h1>
          </div>
        </div>
      </div>

      <SidebarTrigger />

    </div>
  )
}

export default Page1