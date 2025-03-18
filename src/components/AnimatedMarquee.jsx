import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import gsap from "gsap";
import "../styles/Page2.css";

const AnimatedMarquee = () => {
  const marqueeContainerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const row4Ref = useRef(null);

  const row1Controls = useAnimationControls();
  const row2Controls = useAnimationControls();
  const row3Controls = useAnimationControls();
  const row4Controls = useAnimationControls();

  const isInView = useInView(marqueeContainerRef, { once: false, amount: 0.1 });

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

  useEffect(() => {
    if (!isInView) return;

    const createTrulySeamlessAnimation = (
      rowRef,
      controls,
      direction,
      speed
    ) => {
      if (!rowRef.current) return;

      if (direction === "right-to-left") {
        controls.start({
          x: [0, "-200%"],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
              times: [0, 1],
            },
          },
        });
      } else {
        controls.start({
          x: ["-200%", "0%"],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
              times: [0, 1],
            },
          },
        });
      }
    };

    createTrulySeamlessAnimation(row1Ref, row1Controls, "right-to-left", 60);
    createTrulySeamlessAnimation(row2Ref, row2Controls, "left-to-right", 35);
    createTrulySeamlessAnimation(row3Ref, row3Controls, "right-to-left", 42);
    createTrulySeamlessAnimation(row4Ref, row4Controls, "left-to-right", 37);
  }, [row1Controls, row2Controls, row3Controls, row4Controls, isInView]);

  useEffect(() => {
    if (!marqueeContainerRef.current) return;

    const techItems = marqueeContainerRef.current.querySelectorAll(".tech-item");
    
    // Create a timeline for each item
    techItems.forEach((item) => {
      // Set initial state
      gsap.set(item, {
        WebkitTextStroke: "1px white",
        WebkitTextFillColor: "transparent",
        textDecoration: "none",
        borderBottom: "none",
        position: "relative",
        zIndex: 1,
        transformOrigin: "center center",
        scale: 1,
        letterSpacing: "normal"
      });
      
      // Create hover timeline
      const hoverTl = gsap.timeline({ paused: true });
      
      // Add advanced hover effects
      hoverTl
        .to(item, {
          scale: 1.05,
          letterSpacing: "0.02em",
          WebkitTextFillColor: "#BFFF00",
          WebkitTextStroke: "1px #BFFF00",
          textShadow: "0 0 10px rgba(191, 255, 0, 0.5)",
          fontWeight: "700",
          textDecoration: "none", // Explicitly prevent underline
          borderBottom: "none", // Explicitly prevent border
          duration: 0.3,
          ease: "power2.out",
          yoyo: true
        });

      const handleMouseEnter = () => {
        // Stop any ongoing animations and play the hover timeline
        gsap.killTweensOf(item);
        hoverTl.play();
        
        // Slow down the parent row slightly for dramatic effect
        const row = item.closest('.marquee-track');
        if (row) {
          const currentSpeed = gsap.getProperty(row, "timeScale") || 1;
          gsap.to(row, {
            timeScale: currentSpeed * 0.7,
            duration: 0.5,
            ease: "power1.out"
          });
        }
      };

      const handleMouseLeave = () => {
        // Reverse the hover timeline
        hoverTl.reverse();
        
        // Reset the row speed
        const row = item.closest('.marquee-track');
        if (row) {
          gsap.to(row, {
            timeScale: 1,
            duration: 0.8,
            ease: "power1.inOut"
          });
        }
        
        // Ensure no underlines or borders remain
        gsap.set(item, {
          textDecoration: "none",
          borderBottom: "none"
        });
      };

      // Add event listeners
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    });

    // Clean up event listeners on unmount
    return () => {
      techItems.forEach((item) => {
        item.removeEventListener("mouseenter", () => {});
        item.removeEventListener("mouseleave", () => {});
      });
    };
  }, [isInView]);

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
        className={`tech-item cursor-pointer`}
        data-tech={tech.id}
        style={{
          WebkitTextStroke: "1px white",
          WebkitTextFillColor: "transparent",
          fontSize: fontSize,
          fontWeight: "900",
          textDecoration: "none",
          borderBottom: "none",
          display: "inline-block",
          padding: "0 0.5rem",
          margin: "0 1rem",
          transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
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
      {/* Improved gradient overlays for smoother fade effect */}
      <div className="overlay-left absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#0B0D0C] to-transparent z-10 pointer-events-none"></div>
      <div className="overlay-right absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#0B0D0C] to-transparent z-10 pointer-events-none"></div>

      {/* Row 1: Right to Left - LARGER FONT */}
      <div className="marquee-row relative overflow-hidden mb-4">
        <motion.div
          ref={row1Ref}
          className="grechen-fuemen-regular marquee-track"
          animate={row1Controls}
          style={{ display: "flex", gap: "2rem" }}
        >
          {/* Only need to repeat twice for truly seamless infinite animation */}
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => renderTechItems(tech, `row1-${index}`, 1)
          )}
        </motion.div>
      </div>

      {/* Row 2: Left to Right - SMALLER FONT */}
      <div className="marquee-row relative overflow-hidden mb-4">
        <motion.div
          ref={row2Ref}
          className="grechen-fuemen-regular marquee-track"
          animate={row2Controls}
          style={{ display: "flex", gap: "2rem" }}
        >
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => renderTechItems(tech, `row2-${index}`, 2)
          )}
        </motion.div>
      </div>

      {/* Row 3: Right to Left - SMALLER FONT - Fixed typo in class name */}
      <div className="marquee-row relative overflow-hidden mb-4">
        <motion.div
          ref={row3Ref}
          className="grechen-fuemen-regular marquee-track"
          animate={row3Controls}
          style={{ display: "flex", gap: "2rem" }}
        >
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => renderTechItems(tech, `row3-${index}`, 3)
          )}
        </motion.div>
      </div>

      {/* Row 4: Left to Right - LARGER FONT */}
      <div className="marquee-row relative overflow-hidden">
        <motion.div
          ref={row4Ref}
          className="grechen-fuemen-regular marquee-track"
          animate={row4Controls}
          style={{ display: "flex", gap: "2rem" }}
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