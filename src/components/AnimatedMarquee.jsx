import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact, FaUnity } from "react-icons/fa";
import { IoLogoJavascript, IoLogoNodejs } from "react-icons/io5";
import { SiTypescript, SiMongodb, SiBlender } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { TbBrandThreejs } from "react-icons/tb";

const AnimatedMarquee = () => {
    const icons = [
        <FaHtml5 className="hover:text-lime-400" key="html" />,
        <FaCss3Alt className="hover:text-lime-400" key="css" />,
        <IoLogoJavascript className="hover:text-lime-400" key="js" />,
        <SiTypescript className="hover:text-lime-400" key="ts" />,
        <FaReact className="hover:text-lime-400" key="react" />,
        <RiNextjsFill className="hover:text-lime-400" key="next" />,
        <TbBrandThreejs className="hover:text-lime-400" key="threejs" />,
        <IoLogoNodejs className="hover:text-lime-400" key="node" />,
        <SiMongodb className="hover:text-lime-400" key="mongodb" />,
        <FaUnity className="hover:text-lime-400" key="unity" />,
        <SiBlender className="hover:text-lime-400" key="blender" />,
    ];

    const iconName = [
        <h1 className="icon-name font-semibold" key="html">HTML</h1>,
        <h1 className="icon-name font-semibold" key="css">CSS</h1>,
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
        <div className="realtive whitespace-nowrap">

            {/* right div */}
            <div className="absolute -left-[2vw] z-[2] w-32 h-32 bg-[#0B0D0C] blur-lg"></div>

            {/* left div */}
            <div className="absolute left-[93vw] z-[3] w-32 h-32 bg-[#0B0D0C] blur-lg"></div>

            {/* Right to Left Marquee */}
            <div className="flex items-center gap-5">
                <motion.div
                    className="w-[100vw] flex gap-10 text-5xl"
                    initial={{ x: "100%" }} // Start from the right
                    animate={{ x: ["100%", "-100%"] }} // Move from right to left
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {icons}
                    {icons}
                </motion.div>
            </div>

            {/* Left to Right Marquee */}
            <div className="flex items-center gap-5">
                <motion.div
                    className="w-[100vw] flex gap-10 text-5xl mt-4"
                    initial={{ x: "-100%" }} // Start from the left
                    animate={{ x: ["-100%", "100%"] }} // Move from left to right
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {iconName}
                    {iconName}
                </motion.div>
            </div>
        </div>
    );
};

export default AnimatedMarquee;