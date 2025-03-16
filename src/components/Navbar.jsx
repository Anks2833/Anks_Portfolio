import { useRef } from "react";
import { gsap } from "gsap";
import { BsArrowUpRight } from "react-icons/bs";
import "../styles/Page1.css"

const Navbar = () => {
  const underlineRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(".custom-cursor", {
      scale: 2,
      backgroundColor: "white",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(underlineRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".custom-cursor", {
      scale: 1,
      backgroundColor: "#BFFF00",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(underlineRef.current, {
      x: "-100%",
      duration: 0.4,
      ease: "power3.in",
    });
  };

  return (
    <div className="w-full py-4 sm:py-6 md:py-8 lg:h-24 flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 text-white">
      {/* Logo */}
      <h1 className="grechen-fuemen-regular logo text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold italic">AD</h1>

      {/* Connect with me - hidden on smallest screens */}
      <div
        className="relative hidden sm:flex gap-2 items-center cursor-pointer overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          window.scrollTo({ top: 3200, behavior: "smooth" });
        }}
      >
        {/* Text */}
        <h1 className="grechen-fuemen-regular connect-text text-sm sm:text-base md:text-md lg:text-md font-extralight">CONNECT WITH ME</h1>
        {/* Arrow */}
        <div className="text-sm sm:text-base md:text-lg lg:text-xl">
          <BsArrowUpRight className="connect-icon" />
        </div>

        {/* Underline */}
        <div
          ref={underlineRef}
          className="absolute bottom-0 left-0 h-[1px] bg-white w-full"
          style={{
            transform: "translateX(-100%)", 
          }}
        />
      </div>
      
      {/* Mobile connect button - only on smallest screens */}
      <div 
        className="sm:hidden flex items-center"
        onClick={() => {
          window.scrollTo({ top: 3200, behavior: "smooth" });
        }}
      >
        <BsArrowUpRight className="text-xl" />
      </div>
    </div>
  );
};

export default Navbar;