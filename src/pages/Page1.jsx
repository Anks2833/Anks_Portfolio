import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  handleView3DEnter,
  handleMouseLeave as cursorMouseLeave,
  handleButtonEnter,
} from "../utils/CursorEffects";

import Navbar from "../components/Navbar";
import Page1Content from "../components/Page1Content";
import SidebarTrigger from "../components/SidebarTrigger";
import { NavLink } from "react-router-dom";

import "../styles/Page1.css";

const Page1 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pageRef = useRef(null);

  // Force a height calculation after initial render
  useEffect(() => {
    const forceReflow = () => {
      if (pageRef.current) {
        const height = pageRef.current.getBoundingClientRect().height;

        if (height <= window.innerHeight) {
          pageRef.current.style.minHeight = `${window.innerHeight + 100}px`;
        }
      }
    };

    forceReflow();
    const timer = setTimeout(forceReflow, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const underlineRef = useRef(null);

  // Handle mouse enter for View in 3D
  const handleViewIn3DEnter = () => {
    // Call the cursor effect from the utility
    handleButtonEnter("3D View");

    // Underline slides in
    gsap.to(underlineRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  // Handle mouse leave for View in 3D
  const handleViewIn3DLeave = () => {
    // Call the cursor effect from the utility
    cursorMouseLeave();

    // Underline slides out
    gsap.to(underlineRef.current, {
      x: "-100%",
      duration: 0.4,
      ease: "power3.in",
    });
  };

  return (
    <div
      id="home"
      ref={pageRef}
      className="relative w-full min-h-[110vh] bg-[#0b0d0c]"
    >
      <Navbar />
      <Page1Content />

      {/* The bottom content - responsive with CSS class names */}
      <div className="page-1-bottom absolute bottom-28 w-full flex justify-between px-10 pr-20 text-white">
        {/* Scroll to explore div */}
        <div
          className={`flex items-start gap-2 ${
            isScrolled
              ? "opacity-0 duration-500 transition-all"
              : "opacity-100 transition-all"
          }`}
        >
          <motion.div
            className="bg-white w-[0.01vw] h-16 origin-top"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="flex flex-col text-white leading-none">
            <h1 className="grechen-fuemen-regular scroll-text text-[1vw]">
              SCROLL
            </h1>
            <h1 className="grechen-fuemen-regular scroll-text text-[1vw]">
              TO EXPLORE
            </h1>
          </div>
        </div>

        {/* View in 3d Text */}
        <NavLink
          to="https://anks-portfolio.vercel.app"
          target="_blank"
          className={`view-in-3d relative w-fit flex gap-2 items-center cursor-pointer overflow-hidden ${
            isScrolled
              ? "opacity-0 duration-500 transition-all"
              : "opacity-100 transition-all"
          }`}
        >
          <h1
            onMouseEnter={handleViewIn3DEnter}
            onMouseLeave={handleViewIn3DLeave}
            className="grechen-fuemen-regular view-in-3d w-fit text-[1.4vw] font-extralight text-white"
          >
            View in 3D
          </h1>

          {/* Underline */}
          <div
            ref={underlineRef}
            className="absolute bottom-4 left-0 h-[1px] bg-white"
            style={{
              width: "100%",
              transform: "translateX(-100%)",
            }}
          />
        </NavLink>
      </div>

      <SidebarTrigger />
    </div>
  );
};

export default Page1;