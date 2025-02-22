import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from "gsap";

import Navbar from '../components/Navbar';
import Page1Content from '../components/Page1Content';
import SidebarTrigger from '../components/SidebarTrigger';
import { NavLink } from 'react-router-dom';

import "../styles/Page1.css"

const Page1 = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
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

  const underlineRef = useRef(null);

  // Function to handle hover effect
  const handleMouseEnter = () => {
    // Cursor animation
    gsap.to(".custom-cursor", {
      scale: 2,
      backgroundColor: "white",
      duration: 0.3,
      ease: "power2.out",
    });

    // Underline slides in
    gsap.to(underlineRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    // Cursor animation
    gsap.to(".custom-cursor", {
      scale: 1,
      backgroundColor: "#BFFF00",
      duration: 0.3,
      ease: "power2.out",
    });

    // Underline slides out
    gsap.to(underlineRef.current, {
      x: "-100%",
      duration: 0.4,
      ease: "power3.in",
    });
  };

  return (
    <div id='home' className='relative w-full min-h-screen bg-[#0b0d0c]'>
      <Navbar />
      <Page1Content />

      {/* <h1 className='text-white'>hey</h1> */}

      {/* The bottom content */}
      <div className='absolute bottom-28 w-full flex justify-between px-10 pr-20 text-white'>

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
            <h1 className='grechen-fuemen-regular text-[1vw]'>SCROLL</h1>
            <h1 className='grechen-fuemen-regular text-[1vw]'>TO EXPLORE</h1>
          </div>
        </div>

        <NavLink
          to="https://anks-portfolio.vercel.app"
          target='_blank'
          className={`relative w-fit flex gap-2 items-center cursor-pointer overflow-hidden ${isScrolled ? "opacity-0 duration-500 transition-all" : "opacity-1 transition-all"}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Text */}
          <h1 className="grechen-fuemen-regular text-[1.4vw] font-extralight text-white">View in 3D</h1>
          {/* Arrow */}
          {/* <div className="text-[1.5vw]">
  <BsArrowUpRight />
</div> */}

          {/* Underline */}
          <div
            ref={underlineRef}
            className="absolute bottom-4 left-0 h-[1px] bg-white"
            style={{
              width: "100%",
              transform: "translateX(-100%)", // Start hidden
            }}
          />
        </NavLink>
      </div>

      <SidebarTrigger />
    </div>
  );
}

export default Page1;