import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import "../styles/Preloader.css"

import { FaHome } from "react-icons/fa";
import { LuMinus } from "react-icons/lu";
import { VscChromeMaximize } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";

const PreLoader = () => {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const progressBarRef = useRef(null);
    const preloaderRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    gsap.to(preloaderRef.current, {
                        opacity: 0,
                        duration: 6,
                        ease: "power2.out",
                        onComplete: () => setLoading(false),
                    });
                }
                return Math.min(prev + 1, 100);
            });
        }, 95);

        gsap.to(progressBarRef.current, {
            width: `${progress}%`,
            duration: 0.5,
            ease: 'power2.out',
        });

        return () => clearInterval(interval);
    }, [progress]);

    if (!loading) return null;

    return (
        // The main container
        <div ref={preloaderRef} className="main-container fixed w-full h-screen inset-0 flex flex-col items-center justify-center bg-lime-400 z-50">
            {/* The preloader box container */}
            <div className='preloader-box w-[50vw] h-[70vh] bg-white flex flex-col items-center justify-start pt-10 overflow-hidden'>

                {/* The header of the preloader box */}
                <div className='box-header w-full flex justify-between items-center px-10 border-b border-b-black pb-6'>
                    {/* The hesder text */}
                    <div className='box-header-text flex items-center gap-2'>
                        <FaHome className='icon text-xl' />
                        <h1 className='exo-2-bold text text-2xl'>Home</h1>
                    </div>

                    {/* The hesder icons */}
                    <div className='box-header-text-icons flex items-center gap-5'>
                        <LuMinus className='icon text-2xl' />
                        <VscChromeMaximize className='icon text-2xl' />
                        <AiOutlineClose className='icon text-2xl' />
                    </div>

                </div>

                {/* The animated marquee saying "Initializing" */}
                <motion.div
                    initial={{ x: '20%' }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 400 }}
                    className='flex items-center text-black gap-12 mb-6 mt-6'
                >
                    <h1 className='lilita-one-regular init-marquee text-[8vw] text-[#000] font-semibold'>Initializing</h1>
                    <h1 className='lilita-one-regular init-marquee stroke-text text-[8vw] text-[#000] font-semibold'>Initializing</h1>
                    <h1 className='lilita-one-regular init-marquee text-[8vw] text-[#000] font-semibold'>Initializing</h1>
                    <h1 className='lilita-one-regular init-marquee stroke-text text-[8vw] text-[#000] font-semibold'>Initializing</h1>
                    <h1 className='lilita-one-regular init-marquee text-[8vw] text-[#000] font-semibold'>Initializing</h1>
                </motion.div>
                
                {/* The progress bar */}
                <div className="preloader-progress w-[30vw] h-6 bg-white border border-black mt-16">
                    <div ref={progressBarRef} className="h-full bg-[#000]"></div>
                </div>
                {/* The progress percentage */}
                <p className="grechen-fuemen-regular preloader-progress-percentage text-black text-5xl mt-4 font-bold">{progress}%</p>
            </div>
        </div>
    );
};

export default PreLoader;