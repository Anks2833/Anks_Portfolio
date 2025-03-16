import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import gsap from "gsap";
import "../styles/Page2.css";

const AnimatedMarquee = () => {
  // References for marquee rows and hover detection
  const marqueeContainerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const row4Ref = useRef(null);

  // Animation controls for each row
  const row1Controls = useAnimationControls();
  const row2Controls = useAnimationControls();
  const row3Controls = useAnimationControls();
  const row4Controls = useAnimationControls();

  // Check if the marquee is in view for optimized performance
  const isInView = useInView(marqueeContainerRef, { once: false, amount: 0.1 });

  // Technology stack data with display names and styles
  const technologies = [
    { id: "html", name: "HTML", style: "italic" },
    { id: "css", name: "CSS", style: "normal" },
    { id: "scss", name: "SCSS", style: "italic" },
    { id: "js", name: "JAVASCRIPT", style: "normal" },
    { id: "ts", name: "TYPESCRIPT", style: "italic" },
    { id: "react", name: "REACT.js", style: "normal" },
    { id: "next", name: "NEXT.js", style: "italic" },
    { id: "threejs", name: "Three.js", style: "normal" },
    { id: "node", name: "Node.js", style: "italic" },
    { id: "mongodb", name: "MONGODB", style: "normal" },
    { id: "unity", name: "UNITY", style: "italic" },
    { id: "blender", name: "BLENDER", style: "normal" },
  ];

  // Setup the seamless marquee animations
  useEffect(() => {
    if (!isInView) return;

    // Improved function to create a truly seamless infinite animation for a row
    const createTrulySeamlessAnimation = (rowRef, controls, direction, speed) => {
      if (!rowRef.current) return;

      // For truly seamless animation, we'll use keyframes and repeat infinitely
      if (direction === "right-to-left") {
        controls.start({
          x: [0, "-33.33%"],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
              times: [0, 1]
            }
          }
        });
      } else {
        controls.start({
          x: ["-33.33%", "0%"],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
              times: [0, 1]
            }
          }
        });
      }
    };

    // Setup animations with different speeds for variety
    createTrulySeamlessAnimation(row1Ref, row1Controls, "right-to-left", 60);
    createTrulySeamlessAnimation(row2Ref, row2Controls, "left-to-right", 35);
    createTrulySeamlessAnimation(row3Ref, row3Controls, "right-to-left", 42);
    createTrulySeamlessAnimation(row4Ref, row4Controls, "left-to-right", 37);
  }, [row1Controls, row2Controls, row3Controls, row4Controls, isInView]);

  // Setup hover interactions for individual technology items
  useEffect(() => {
    if (!marqueeContainerRef.current) return;

    // Get all technology items
    const techItems =
      marqueeContainerRef.current.querySelectorAll(".tech-item");

    // Set up hover interactions for each item
    techItems.forEach((item) => {
      const handleMouseEnter = () => {
        gsap.to(item, {
          y: 0,
          fontWeight: "700",
          WebkitTextFillColor: "#BFFF00",
          WebkitTextStroke: "1px #BFFF00",
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          y: 0,
          color: "white",
          fontWeight: "700",
          WebkitTextStroke: "1px white",
          WebkitTextFillColor: "transparent",
          duration: 0.5,
          ease: "power3.out",
        });
      };

      // Apply initial styling
      gsap.set(item, {
        WebkitTextStroke: "1px white",
        WebkitTextFillColor: "transparent",
        position: "relative",
        zIndex: 1,
        transformOrigin: "center bottom", // Set transform origin for better float effect
      });

      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners
    return () => {
      techItems.forEach((item) => {
        item.removeEventListener("mouseenter", () => {});
        item.removeEventListener("mouseleave", () => {});
      });
    };
  }, [isInView]);

  // Generate technology items with appropriate styling
  const renderTechItems = (tech, index, rowNum) => {
    let fontSize;
    if (rowNum === 1 || rowNum === 4) {
      fontSize = "5rem";
    } else {
      fontSize = "3.5rem";
    }

    return (
      <div
        key={`${tech.id}-${index}`}
        className={`tech-item cursor-pointer transition-all`}
        data-tech={tech.id}
        style={{
          WebkitTextStroke: "1px white",
          WebkitTextFillColor: "transparent",
          fontSize: fontSize,
          fontWeight: "900",
          transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s ease",
        }}
      >
        {tech.name}
      </div>
    );
  };

  return (
    <div
      ref={marqueeContainerRef}
      className="marquee-container relative py-8 md:py-12 lg:py-16 overflow-hidden"
    >
      {/* Gradient overlays for smooth fade effect */}
      <div className="overlay-left absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0B0D0C] to-transparent z-10 pointer-events-none"></div>
      <div className="overlay-right absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0B0D0C] to-transparent z-10 pointer-events-none"></div>

      {/* Row 1: Right to Left - LARGER FONT */}
      <div className="marquee-row">
        <motion.div
          ref={row1Ref}
          className="marquee-track"
          animate={row1Controls}
          style={{ display: "flex" }}
        >
          {/* Only need to repeat twice for truly seamless infinite animation */}
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => renderTechItems(tech, `row1-${index}`, 1)
          )}
        </motion.div>
      </div>

      {/* Row 2: Left to Right - SMALLER FONT */}
      <div className="marquee-row">
        <motion.div
          ref={row2Ref}
          className="marquee-track"
          animate={row2Controls}
          style={{ display: "flex" }}
        >
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => renderTechItems(tech, `row2-${index}`, 2)
          )}
        </motion.div>
      </div>

      {/* Row 3: Right to Left - SMALLER FONT */}
      <div className="marquee-row">
        <motion.div
          ref={row3Ref}
          className="marquee-track"
          animate={row3Controls}
          style={{ display: "flex" }}
        >
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => renderTechItems(tech, `row3-${index}`, 3)
          )}
        </motion.div>
      </div>

      {/* Row 4: Left to Right - LARGER FONT */}
      <div className="marquee-row">
        <motion.div
          ref={row4Ref}
          className="marquee-track"
          animate={row4Controls}
          style={{ display: "flex" }}
        >
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => renderTechItems(tech, `row4-${index}`, 4)
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedMarquee;