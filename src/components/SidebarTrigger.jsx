import { handleMouseEnter, handleMouseLeave } from '../utils/CursorEffects';

const SidebarTrigger = ({ onClick, isVisible }) => {
    return (
        <div 
            className={`sidebar-trigger fixed top-[20vw] z-[99] w-6 h-14 border border-white flex justify-center items-center gap-1 transition-opacity duration-300 ${isVisible ? 'opacity-0' : 'opacity-100'}`}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='w-[0.1vw] h-6 bg-white'></div>
            <div className='w-[0.1vw] h-6 bg-white'></div>
        </div>
    )
}

export default SidebarTrigger;