import { motion } from "framer-motion";

const AnimatedMarquee = () => {

    const iconName = [
        <h1 className="icon-name font-semibold" key="html">HTML</h1>,
        <h1 className="icon-name font-semibold" key="css">CSS</h1>,
        <h1 className="icon-name font-semibold" key="scss">SCSS</h1>,
        <h1 className="icon-name font-semibold" key="js">JAVASCRIPT</h1>,
        <h1 className="icon-name font-semibold" key="ts">TYPESCRIPT</h1>,
        <h1 className="icon-name font-semibold" key="react">REACT.js</h1>,
        <h1 className="icon-name font-semibold" key="next">NEXT.js</h1>,
        <h1 className="icon-name font-semibold" key="threejs">Three.js</h1>,
        <h1 className="icon-name font-semibold" key="node">Node.js</h1>,
        <h1 className="icon-name font-semibold" key="mongodb">MONGODB</h1>,
        <h1 className="icon-name font-semibold" key="unity">UNITY</h1>,
        <h1 className="icon-name font-semibold" key="blender">BLENDER</h1>,
    ];

    return (
        <div className="relative h-[40vw] whitespace-nowrap flex flex-col gap-5">

            {/* right div */}
            <div className="absolute -left-[3vw] -bottom-12 z-[2] w-40 h-[60vw] bg-[#0B0D0C] blur-lg rounded-full"></div>

            {/* left div */}
            <div className="absolute left-[93vw] -bottom-12 z-[3] w-40 h-[60vw] bg-[#0B0D0C] blur-lg rounded-full"></div>

            {/* Right to Left Marquee */}
            <div className="flex items-center gap-5">
                <motion.div
                    className="w-[100vw] flex gap-10 text-9xl"
                    initial={{ x: "100%" }} // Start from the right
                    animate={{ x: ["0%", "-100%"] }} // Move from right to left
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {iconName}
                    {iconName}
                    {iconName}
                </motion.div>
            </div>

            {/* Left to Right Marquee */}
            <div className="flex items-center gap-5">
                <motion.div
                    className="w-[100vw] flex gap-10 text-8xl mt-4"
                    initial={{ x: "-100%" }} // Start from the left
                    animate={{ x: ["-100%", "0%"] }} // Move from left to right
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {iconName}
                    {iconName}
                    {iconName}
                </motion.div>
            </div>

            {/* Right to Left Marquee */}
            <div className="flex items-center gap-5">
                <motion.div
                    className="w-[100vw] flex gap-10 text-8xl"
                    initial={{ x: "100%" }} // Start from the right
                    animate={{ x: ["0%", "-100%"] }} // Move from right to left
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {iconName}
                    {iconName}
                    {iconName}
                </motion.div>
            </div>

            {/* Left to Right Marquee */}
            <div className="flex items-center gap-5">
                <motion.div
                    className="w-[100vw] flex gap-10 text-9xl mt-4"
                    initial={{ x: "-100%" }} // Start from the left
                    animate={{ x: ["-100%", "0%"] }} // Move from left to right
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
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