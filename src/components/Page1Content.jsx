import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  handleMouseEnterBig,
  handleMouseLeave,
  handleRevealTextEnter,
  handleButtonEnter,
  handleDraggableEnter
} from "../utils/CursorEffects";
import "../styles/Page1.css";

const Page1Content = () => {
  const contentRef = useRef(null);

  // Desktop paragraph refs
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const para3Ref = useRef(null);
  const para4Ref = useRef(null);

  // Mobile paragraph refs
  const mobileRefs = Array(9)
    .fill(0)
    .map(() => useRef(null));

  useEffect(() => {
    // Main mouse tracking effect
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate mouse position relative to the center of the window
      // Values will range from -1 to 1 for both x and y
      const x = (clientX / windowWidth) * 2 - 1;
      const y = (clientY / windowHeight) * 2 - 1;

      // Desktop paragraphs - each will have a unique 3D rotation
      const desktopParagraphs = [para1Ref, para2Ref, para3Ref, para4Ref];

      // Apply different rotation intensities to each paragraph
      desktopParagraphs.forEach((paraRef, index) => {
        if (!paraRef.current) return;

        // Different paragraphs have different movement intensity
        // The first paragraphs move more than later ones
        const intensityFactor = 1 - index * 0.15;

        // Calculate rotation angles - limit to a reasonable range
        const rotateY = x * 15 * intensityFactor; // horizontal rotation
        const rotateX = -y * 10 * intensityFactor; // vertical rotation

        // Apply 3D transform with GSAP
        gsap.to(paraRef.current, {
          rotateY: rotateY,
          rotateX: rotateX,
          transformPerspective: 1000,
          transformOrigin: "center center",
          z: x * y * 20, // subtle z-axis movement for parallax
          duration: 0.5,
          ease: "power2.out",
        });
      });

      // Mobile paragraphs - apply similar effect with adjusted intensities
      mobileRefs.forEach((ref, index) => {
        if (!ref.current) return;

        const intensityFactor = 0.7 - index * 0.07;
        const rotateY = x * 10 * intensityFactor;
        const rotateX = -y * 8 * intensityFactor;

        gsap.to(ref.current, {
          rotateY: rotateY,
          rotateX: rotateX,
          transformPerspective: 800,
          transformOrigin: "center center",
          z: x * y * 10, // reduced z-movement for mobile
          duration: 0.5,
          ease: "power2.out",
        });
      });

      // Light container tilt for background
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          rotateY: x * 5,
          rotateX: -y * 5,
          duration: 0.8,
          ease: "power1.out",
        });
      }
    };

    // Reset animations when mouse leaves
    const resetAnimations = () => {
      // Reset desktop paragraphs
      [para1Ref, para2Ref, para3Ref, para4Ref].forEach((ref) => {
        if (ref.current) {
          gsap.to(ref.current, {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        }
      });

      // Reset mobile paragraphs
      mobileRefs.forEach((ref) => {
        if (ref.current) {
          gsap.to(ref.current, {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        }
      });

      // Reset container
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    };

    // Add touch support for mobile
    const handleTouchMove = (event) => {
      if (event.touches.length !== 1) return;

      const touch = event.touches[0];

      // Create a simplified version of the mouse effect for touch
      const touchX = (touch.clientX / window.innerWidth) * 2 - 1;
      const touchY = (touch.clientY / window.innerHeight) * 2 - 1;

      // Apply reduced movement for touch devices
      const touchFactor = 0.5;

      mobileRefs.forEach((ref, index) => {
        if (!ref.current) return;

        const intensity = Math.max(0.2, 0.5 - index * 0.05);

        gsap.to(ref.current, {
          rotateY: touchX * 8 * intensity * touchFactor,
          rotateX: -touchY * 6 * intensity * touchFactor,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", resetAnimations);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", resetAnimations);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetAnimations);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", resetAnimations);
    };
  }, []);

  return (
    <>
      {/* Content Container */}
      <div className="content-container w-full h-screen hidden sm:hidden md:flex lg:flex text-white justify-center">
        <div
          ref={contentRef}
          className="w-fit md:h-[70vh] lg:h-fit flex flex-col md:justify-center lg:justify-start items-center ml-12"
          onMouseEnter={() => handleMouseEnterBig("Hello")}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            position: "relative",
          }}
        >
          {/* Para1 */}
          <p
            ref={para1Ref}
            className="text-[5vw] text-center font-light tracking-wider mb-2"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform",
            }}
          >
            <span className="italic">"Hello, I'm</span>{" "}
            <span className="font-bold">ANKUR</span>
            <span className="italic">, a</span>
          </p>

          {/* Para2 */}
          <p
            ref={para2Ref}
            className="text-[5vw] text-center font-bold text-zinc-950 bg-[#BFFF00] w-fit tracking-wider mb-2"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform",
            }}
          >
            FULLSTACK WEB DEVELOPER
          </p>

          {/* Para3 */}
          <p
            ref={para3Ref}
            className="text-[5vw] text-center font-light italic tracking-wider mb-2"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform",
            }}
          >
            based in India, I'm also specialized in
          </p>

          {/* Para4 */}
          <p
            ref={para4Ref}
            className="text-[5vw] text-center font-bold text-zinc-950 bg-[#BFFF00] w-fit tracking-wider"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform",
            }}
          >
            GAME DEVELOPMENT
            <span className="font-light italic text-black">"</span>
          </p>
        </div>
      </div>

      {/* Content Container Mobile */}
      <div className="w-full h-screen flex sm:flex md:hidden lg:hidden text-white justify-center">
        <div
          ref={contentRef}
          className="w-full h-[80vh] flex flex-col justify-center items-start px-8"
          style={{
            perspective: "800px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Para1 */}
          <p
            ref={mobileRefs[0]}
            className="text-5xl text-center font-light tracking-wider mb-1"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <span className="italic text-6xl">"Hello,</span>
          </p>

          {/* Para2 */}
          <p
            ref={mobileRefs[1]}
            className="text-5xl mb-1"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <span>I'm</span> <span className="font-bold">ANKUR</span>
            <span className="italic">, a</span>
          </p>

          {/* Para3 */}
          <p
            ref={mobileRefs[2]}
            className="text-5xl text-center font-bold w-fit tracking-wider mb-1"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            FULLSTACK
          </p>

          <p
            ref={mobileRefs[3]}
            className="text-5xl font-bold mb-1"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            WEB
          </p>

          <p
            ref={mobileRefs[4]}
            className="text-5xl font-bold mb-3"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            DEVELOPER
          </p>

          {/* Para4 */}
          <p
            ref={mobileRefs[5]}
            className="text-5xl text-left font-light italic tracking-wider mb-1"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            based in India,
          </p>

          <p
            ref={mobileRefs[6]}
            className="text-5xl mb-3"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            I'm also specialized in
          </p>

          {/* Para5 */}
          <p
            ref={mobileRefs[7]}
            className="text-5xl text-left font-bold w-fit tracking-wider mb-1"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            GAME
          </p>

          <p
            ref={mobileRefs[8]}
            className="text-4xl font-bold"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            DEVELOPMENT"
          </p>
        </div>
      </div>
    </>
  );
};

export default Page1Content;
