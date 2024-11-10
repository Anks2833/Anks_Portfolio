import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Navbar from '../components/Navbar';
import Page1Content from '../components/Page1Content';
import SidebarTrigger from '../components/SidebarTrigger';

const Page1 = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
        console.log("Scrolled down")
      } else {
        setIsScrolled(false);
        console.log("Scrolled up")
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id='home'>
      <Navbar />
      <Page1Content />

      {/* The bottom content */}
      <div className='absolute bottom-2 left-5 flex justify-between px-5'>

        {/* Scroll to explore div */}
          <div className={`flex items-start gap-2 ${isScrolled ? "opacity-0 duration-500 transition-all" : "opacity-1 transition-all"}`}>
          <motion.div
            className='bg-white w-[0.01vw] h-16 origin-top'
            animate={{ scaleY: [0, 1, 0], opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
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