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

    // Function to create a seamless animation for a row
    const createSeamlessAnimation = (rowRef, controls, direction, speed) => {
      if (!rowRef.current) return;

      // Get the width of one complete set of items
      const contentWidth = rowRef.current.offsetWidth / 3; // Divided by 3 because we have 3 sets

      // The animation is different based on direction
      if (direction === "right-to-left") {
        // Animate from 0 to -contentWidth (moving left)
        const animate = async () => {
          await controls.start({
            x: -contentWidth,
            transition: {
              duration: speed,
              ease: "linear",
            },
          });
          // Instantly reset to starting position (no animation)
          controls.set({ x: 0 });
          // Repeat
          animate();
        };
        animate();
      } else {
        // Animate from -contentWidth to 0 (moving right)
        const animate = async () => {
          await controls.start({
            x: 0,
            transition: {
              duration: speed,
              ease: "linear",
            },
          });
          // Instantly reset to starting position (no animation)
          controls.set({ x: -contentWidth });
          // Repeat
          animate();
        };
        controls.set({ x: -contentWidth });
        animate();
      }
    };

    // Setup animations with different speeds for variety
    createSeamlessAnimation(row1Ref, row1Controls, "right-to-left", 40);
    createSeamlessAnimation(row2Ref, row2Controls, "left-to-right", 35);
    createSeamlessAnimation(row3Ref, row3Controls, "right-to-left", 42);
    createSeamlessAnimation(row4Ref, row4Controls, "left-to-right", 37);
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
          y: -10,
          scale: 1.1,
          color: "#BFFF00",
          fontWeight: "700",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          y: 0,
          scale: 1,
          color: "white",
          fontWeight: "600",
          duration: 0.3,
          ease: "power2.out",
        });
      };

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
  const renderTechItems = (tech, index) => (
    <div
      key={`${tech.id}-${index}`}
      className={`tech-item exo-2-bold font-semibold cursor-pointer transition-all ${
        tech.style === "italic" ? "font-italic" : ""
      }`}
      data-tech={tech.id}
    >
      {tech.name}
    </div>
  );

  return (
    <div
      ref={marqueeContainerRef}
      className="marquee-container relative py-8 md:py-12 lg:py-16 overflow-hidden"
    >
      {/* Gradient overlays for smooth fade effect */}
      <div className="overlay-left absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0B0D0C] to-transparent z-10 pointer-events-none"></div>
      <div className="overlay-right absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0B0D0C] to-transparent z-10 pointer-events-none"></div>

      {/* Row 1: Right to Left */}
      <div className="marquee-row">
        <motion.div
          ref={row1Ref}
          className="marquee-track"
          animate={row1Controls}
          style={{ display: "flex", gap: "3rem" }}
        >
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => renderTechItems(tech, `row1-${index}`)
          )}
        </motion.div>
      </div>

      {/* Row 2: Left to Right */}
      <div className="marquee-row">
        <motion.div
          ref={row2Ref}
          className="marquee-track"
          animate={row2Controls}
          style={{ display: "flex", gap: "3rem" }}
        >
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => renderTechItems(tech, `row2-${index}`)
          )}
        </motion.div>
      </div>

      {/* Row 3: Right to Left */}
      <div className="marquee-row">
        <motion.div
          ref={row3Ref}
          className="marquee-track"
          animate={row3Controls}
          style={{ display: "flex", gap: "3rem" }}
        >
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => renderTechItems(tech, `row3-${index}`)
          )}
        </motion.div>
      </div>

      {/* Row 4: Left to Right */}
      <div className="marquee-row">
        <motion.div
          ref={row4Ref}
          className="marquee-track"
          animate={row4Controls}
          style={{ display: "flex", gap: "3rem" }}
        >
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => renderTechItems(tech, `row4-${index}`)
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedMarquee;
