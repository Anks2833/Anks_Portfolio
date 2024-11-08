import React from 'react';
import { ImCross } from "react-icons/im";

const Sidebar = ({ isVisible, onClose }) => {
    return (
        <div className={`sidebar absolute z-10 w-full h-screen bg-white flex justify-start transition-all ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='w-12 h-screen'>
                <div className='h-1/3 bg-black border'></div>
                <div className='h-1/3 bg-black border'></div>
                <div className='h-1/3 bg-black border'></div>
            </div>

            <div className='w-[50vw] bg-black'></div>

            <div className='h-screen flex items-center'>
                <h1 className='bg-black text-white p-5' onClick={onClose}><ImCross /></h1>
            </div>
        </div>
    )
}

export default Sidebar;