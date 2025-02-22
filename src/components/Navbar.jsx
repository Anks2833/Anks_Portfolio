import { useRef } from "react";
import { gsap } from "gsap";
import { BsArrowUpRight } from "react-icons/bs";
import "../styles/Page1.css"

const Navbar = () => {
  const underlineRef = useRef(null); // Ref for the underline

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
    // Navbar container
    <div className="nav-container w-full h-[6vw] flex justify-between items-center px-16 text-white">
      {/* Logo */}
      <h1 className="grechen-fuemen-regular logo text-[2.6vw] font-extrabold italic">AD</h1>

      {/* Connect with me */}
      <div
        className="relative w-fit flex gap-2 items-center cursor-pointer overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          window.scrollTo({ top: 3200, behavior: "smooth" });
        }}
      >
        {/* Text */}
        <h1 className="grechen-fuemen-regular connect-text text-[1.2vw] font-extralight">CONNECT WITH ME</h1>
        {/* Arrow */}
        <div className="text-[1.5vw]">
          <BsArrowUpRight className="connect-icon" />
        </div>

        {/* Underline */}
        <div
          ref={underlineRef}
          className="absolute bottom-0 left-0 h-[1px] bg-white"
          style={{
            width: "100%",
            transform: "translateX(-100%)", // Start hidden
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
