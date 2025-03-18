import { useRef } from "react";
import { gsap } from "gsap";
import { BsArrowUpRight } from "react-icons/bs";
import "../styles/Page1.css";
import {
  handleButtonEnter,
  handleMouseLeave,
  handleRevealTextEnter,
} from "../utils/CursorEffects";

const Navbar = () => {
  const underlineRef = useRef(null);

  const handleMouseEnter = () => {
    // Apply the button cursor effect with custom text
    handleButtonEnter("Connect");

    // Keep the underline animation
    gsap.to(underlineRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleNavMouseLeave = () => {
    // Reset cursor to default state
    handleMouseLeave();

    // Keep the underline animation
    gsap.to(underlineRef.current, {
      x: "-100%",
      duration: 0.4,
      ease: "power3.in",
    });
  };

  return (
    <div className="w-full py-4 sm:py-6 md:py-8 lg:h-24 flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 text-white">
      {/* Logo with cursor effect */}
      <h1 className="grechen-fuemen-regular logo text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold italic">
        AD
      </h1>

      {/* Connect with me - hidden on smallest screens */}
      <div
        className="relative hidden sm:flex gap-2 items-center cursor-pointer overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleNavMouseLeave}
        onClick={() => {
          window.scrollTo({ top: 5500, behavior: "smooth" });
        }}
      >
        {/* Text */}
        <h1 className="grechen-fuemen-regular connect-text text-sm sm:text-base md:text-md lg:text-md font-extralight">
          CONNECT WITH ME
        </h1>
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
