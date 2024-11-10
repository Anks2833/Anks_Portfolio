import { gsap } from 'gsap';
import { BsArrowUpRight } from "react-icons/bs";

const Navbar = () => {

  // Function to handle cursor hover effects
  const handleMouseEnter = () => {
    gsap.to('.custom-cursor', {
      scale: 2,
      backgroundColor: 'white',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to('.custom-cursor', {
      scale: 1,
      backgroundColor: '#BFFF00',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div className='w-full h-[6vw] flex justify-between items-center px-16 text-white'>
      <h1 className='text-[2.6vw] font-extrabold italic'>AD</h1>

      <div 
        className='w-fit flex gap-2 items-center'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1 className='italic text-[1.2vw] font-extralight'>CONNECT WITH ME</h1>
        <div className='text-[1.5vw]'>
          <BsArrowUpRight />
        </div>
      </div>
    </div>
  )
}

export default Navbar;