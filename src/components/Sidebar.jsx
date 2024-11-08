import React from 'react';
import { AiOutlineClose } from "react-icons/ai";
import SidebarLinks from './SidebarLinks';
import { NavLink } from 'react-router-dom';


const Sidebar = ({ isVisible, onClose }) => {

    const navLinks = [
        { id: "01", name: "Home" },
        { id: "02", name: "About" },
        { id: "03", name: "Achievements" },
        { id: "04", name: "Projects" },
        { id: "05", name: "Contact Me" }
    ]

    return (
        <div className={`sidebar absolute z-10 w-full h-screen bg-white flex justify-start transition-all ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='w-12 h-screen'>
                <SidebarLinks />
            </div>

            <div className='w-[50vw] bg-black'></div>

            <div className='h-screen flex items-center'>
                <h1 className='bg-black text-white px-2 py-5' onClick={onClose}><AiOutlineClose /></h1>
            </div>

            <div className='absolute left-32 top-12 flex flex-col gap-16'>
                {navLinks.map((nav) => {
                    return (
                            <div key={nav.id} className='w-[40vw] flex items-start gap-3 border-b border-b-white text-zinc-300 hover:text-blue-500 hover:border-b-blue-600 hover:italic'>

                                <h1 className='text-[3.5vw] font-semibold'>{nav.name}</h1>
                                <h1 className='text-3xl mt-2'>{nav.id}</h1>

                            </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Sidebar;