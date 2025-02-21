import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
import { handleMouseEnterBig, handleMouseLeave } from '../../utils/CursorEffects';
import { NavLink } from "react-router-dom";
import cardData from "./ProjectsData"
import "./styles/ProjStyles.css"

const Project6 = () => {
  return (
    <>
      <div
        key={cardData[1].id}
        className='relative w-[33vw] h-[40vw] overflow-hidden group'
        onMouseEnter={handleMouseEnterBig}
        onMouseLeave={handleMouseLeave}
      >
        <div className='image-6 w-full h-full bg-white p-6'>
          <img src={cardData[0].image} alt={cardData[0].title} className="w-full h-full object-contain object-center" />
        </div>

        {/* Content container that will show on hover */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-transparent group-hover:bg-[#BFFF00] transition-all duration-300">
          <div className="absolute inset-0 flex flex-col justify-center items-start text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <NavLink to={`${cardData[1].link}`} target="_blank" className="absolute -top-5 -right-4 w-28 h-28 border-2 border-black rounded-full hover:bg-white transition-all flex items-center justify-center">
              <GoArrowUpRight className="text-black text-5xl" />
            </NavLink>
            <h1 className="font-bold text-2xl text-black mt-14 px-10">{cardData[1].title}</h1>
            <p className="text-black mt-6 leading-8 font-light px-10">{cardData[1].description}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Project6