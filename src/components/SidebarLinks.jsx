import { NavLink } from 'react-router-dom';
import { handleMouseEnter, handleMouseLeave } from '../utils/CursorEffects';
import { BsArrowDownRight } from "react-icons/bs";

const SidebarLinks = () => {

    const socialData = [
        { id: "1", name: "LINKEDIN", icon: <BsArrowDownRight />, link: "https://www.linkedin.com/in/ankur-dubey-025812217" },
        { id: "2", name: "INSTAGRAM", icon: <BsArrowDownRight />, link: "https://www.instagram.com/_ankur._.dubey_/" },
        { id: "3", name: "GITHUB", icon: <BsArrowDownRight />, link: "https://github.com/Anks2833" },
    ]

    return (
        <>

            {socialData.map(item => {
                return (
                    <NavLink
                        to={`${item.link}`}
                        target='_blank'
                        key={item.id}
                        className='h-1/3 bg-black text-white border flex flex-col justify-between items-center py-12 hover:translate-x-2 hover:translate-y-2 transition-all'
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <h1 className='rotate-90 text-lg'>{item.name}</h1>
                        <div>{item.icon}</div>
                    </NavLink>
                )
            })}

        </>
    )
}

export default SidebarLinks