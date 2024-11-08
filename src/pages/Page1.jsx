import Navbar from '../components/Navbar';
import Page1Content from '../components/Page1Content';
import SidebarTrigger from '../components/SidebarTrigger';
import { motion } from 'framer-motion';

const Page1 = () => {
  return (
    <div>
      <Navbar />
      <Page1Content />

      {/* The bottom content */}
      <div className='absolute bottom-2 flex justify-between px-5'>
        <div className='flex items-start gap-2'>
          {/* Animated div using Framer Motion */}
          <motion.div
            className='bg-white w-[0.01vw] h-16 origin-top' // Set origin to top
            animate={{ scaleY: [0, 1, 0], opacity: 0 }} // Animate scaleY from 0 to 1 and back to 0
            transition={{
              duration: 2, // Total duration for the full cycle
              repeat: Infinity, // Repeat the animation indefinitely
              ease: 'easeInOut', // Easing function for smoothness
            }}
          />
          <div className='flex flex-col text-white leading-none'>
            <h1 className='font-extrabold text-[1vw]'>SCROLL</h1>
            <h1 className='font-extrabold text-[1vw]'>TO EXPLORE</h1>
          </div>
        </div>
      </div>

      <SidebarTrigger />
    </div>
  );
}

export default Page1;