import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import "../styles/Page2.css";

const AnimatedMarquee = () => {
    // References to measure content widths
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);
    const row3Ref = useRef(null);
    const row4Ref = useRef(null);
    
    // Animation controls for each row
    const row1Controls = useAnimationControls();
    const row2Controls = useAnimationControls();
    const row3Controls = useAnimationControls();
    const row4Controls = useAnimationControls();

    const iconName = [
        <h1 className="exo-2-bold icon-name font-semibold italic" key="html">HTML</h1>,
        <h1 className="exo-2-bold icon-name font-semibold" key="css">CSS</h1>,
        <h1 className="exo-2-bold icon-name font-semibold italic" key="scss">SCSS</h1>,
        <h1 className="exo-2-bold icon-name font-semibold" key="js">JAVASCRIPT</h1>,
        <h1 className="exo-2-bold icon-name font-semibold italic" key="ts">TYPESCRIPT</h1>,
        <h1 className="exo-2-bold icon-name font-semibold" key="react">REACT.js</h1>,
        <h1 className="exo-2-bold icon-name font-semibold italic" key="next">NEXT.js</h1>,
        <h1 className="exo-2-bold icon-name font-semibold" key="threejs">Three.js</h1>,
        <h1 className="exo-2-bold icon-name font-semibold italic" key="node">Node.js</h1>,
        <h1 className="exo-2-bold icon-name font-semibold" key="mongodb">MONGODB</h1>,
        <h1 className="exo-2-bold icon-name font-semibold italic" key="unity">UNITY</h1>,
        <h1 className="exo-2-bold icon-name font-semibold" key="blender">BLENDER</h1>,
    ];

    // Setup the seamless animations after component mounts
    useEffect(() => {
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
                        }
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
                        }
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
        createSeamlessAnimation(row1Ref, row1Controls, "right-to-left", 30);
        createSeamlessAnimation(row2Ref, row2Controls, "left-to-right", 25);
        createSeamlessAnimation(row3Ref, row3Controls, "right-to-left", 35);
        createSeamlessAnimation(row4Ref, row4Controls, "left-to-right", 28);
        
    }, [row1Controls, row2Controls, row3Controls, row4Controls]);

    return (
        // The marquee container
        <div className="marquee-container relative h-[40vw] whitespace-nowrap flex flex-col gap-5 overflow-hidden">
            {/* Blur effects for the edges */}
            <div className="right-blur absolute -left-[3vw] -bottom-12 z-[2] w-40 h-[60vw] bg-[#0B0D0C] blur-lg rounded-full"></div>
            <div className="left-blur absolute left-[93vw] -bottom-40 z-[3] w-40 h-[60vw] bg-[#0B0D0C] blur-lg rounded-full"></div>

            {/* Row 1: Right to Left */}
            <div className="flex items-center gap-5 overflow-hidden">
                <motion.div
                    ref={row1Ref}
                    className="marquee-text w-[300vw] flex gap-10 text-9xl"
                    animate={row1Controls}
                >
                    {iconName}
                    {iconName}
                    {iconName}
                </motion.div>
            </div>

            {/* Row 2: Left to Right */}
            <div className="flex items-center gap-5 overflow-hidden">
                <motion.div
                    ref={row2Ref}
                    className="marquee-text w-[300vw] flex gap-10 text-8xl mt-4"
                    animate={row2Controls}
                >
                    {iconName}
                    {iconName}
                    {iconName}
                </motion.div>
            </div>

            {/* Row 3: Right to Left */}
            <div className="flex items-center gap-5 overflow-hidden">
                <motion.div
                    ref={row3Ref}
                    className="marquee-text w-[300vw] flex gap-10 text-8xl"
                    animate={row3Controls}
                >
                    {iconName}
                    {iconName}
                    {iconName}
                </motion.div>
            </div>

            {/* Row 4: Left to Right */}
            <div className="flex items-center gap-5 overflow-hidden">
                <motion.div
                    ref={row4Ref}
                    className="marquee-text w-[300vw] flex gap-10 text-9xl mt-4"
                    animate={row4Controls}
                >
                    {iconName}
                    {iconName}
                    {iconName}
                </motion.div>
            </div>
        </div>
    );
};

export default AnimatedMarquee;