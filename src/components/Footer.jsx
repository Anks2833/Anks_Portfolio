import { NavLink } from 'react-router-dom';
import { handleMouseEnter, handleMouseLeave } from '../utils/CursorEffects';
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { motion } from 'framer-motion';
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (


        <div className="w-full h-[20vh] flex justify-between items-center text-white mt-52 px-20">

            <div className="flex items-center gap-8">
                <NavLink
                    to="https://www.linkedin.com/in/ankur-dubey-025812217"
                    target='_blank'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    LINKEDIN
                </NavLink>

                <NavLink
                    to="https://github.com/Anks2833"
                    target='_blank'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    GITHUB
                </NavLink>

                <NavLink
                    to="https://www.instagram.com/_ankur._.dubey_/"
                    target='_blank'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    INSTAGRAM
                </NavLink>

                <h1>DESIGNED AND BUILT BY ANKUR</h1>
            </div>

            <div className='flex items-center gap-10'>
                <h1>©{currentYear}</h1>

                <motion.div
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className='w-fit'
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: [0.17, 0.67, 0.83, 0.67]
                    }}
                >
                    <BsFillArrowUpSquareFill className='text-2xl' />
                </motion.div>
            </div>

        </div>

    )
}

export default Footer