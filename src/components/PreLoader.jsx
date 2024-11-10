import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

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
        <div ref={preloaderRef} className="fixed w-full h-screen inset-0 flex flex-col items-center justify-center bg-lime-400 z-50">
            <div className='preloader-box w-[50vw] h-[70vh] bg-white flex flex-col items-center justify-start pt-10 overflow-hidden'>

                <div className='w-full flex justify-between items-center px-10 border-b border-b-black pb-6'>

                    <div className='flex items-center gap-2'>
                        <FaHome className='text-xl' />
                        <h1 className='text-xl'>Home</h1>
                    </div>

                    <div className='flex items-center gap-5'>
                        <LuMinus className='text-2xl' />
                        <VscChromeMaximize className='text-2xl' />
                        <AiOutlineClose className='text-2xl' />
                    </div>

                </div>

                <motion.div
                    initial={{ x: '20%' }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 400 }}
                    className='flex items-center text-black gap-12 mb-6 mt-6'
                >
                    <h1 className='text-[8vw] text-[#000] font-semibold'>Initializing</h1>
                    <h1 className='stroke-text text-[8vw] text-[#000] font-semibold'>Initializing</h1>
                    <h1 className='text-[8vw] text-[#000] font-semibold'>Initializing</h1>
                    <h1 className='stroke-text text-[8vw] text-[#000] font-semibold'>Initializing</h1>
                    <h1 className='text-[8vw] text-[#000] font-semibold'>Initializing</h1>
                </motion.div>

                <div className="w-[30vw] h-6 bg-white border border-black mt-16">
                    <div ref={progressBarRef} className="h-full bg-[#000]"></div>
                </div>
                <p className="text-black text-5xl mt-4 font-bold">{progress}%</p>
            </div>
        </div>
    );
};

export default PreLoader;