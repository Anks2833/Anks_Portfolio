import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Page1Content = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const { left, top, width, height } = contentRef.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            
            const rotateX = (y / height) * 50;
            const rotateY = -(x / width) * 70;

            
            gsap.to(contentRef.current, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.set(contentRef.current, {
                rotateX: 0,
                rotateY: 0,
            });
        };

        const element = contentRef.current;
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className='w-full text-white flex justify-center'>
            <div
                ref={contentRef}
                className='w-full h-[100vh] flex flex-col justify-start items-center ml-12'
                style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                }}
            >
                <p className='text-[5vw] text-center font-light tracking-wider'>
                    <span className='italic'>"Hello, I'm</span> <span className='font-bold'>ANKUR</span><span className='italic'>, a</span>
                </p>
                <p className='text-[5vw] text-center font-bold text-zinc-950 bg-[#BFFF00] w-fit tracking-wider'>FULLSTACK WEB DEVELOPER</p>
                <p className='text-[5vw] text-center font-light italic tracking-wider'>based in India, I'm also specialized in</p>
                <p className='text-[5vw] text-center font-bold text-zinc-950 bg-[#BFFF00] w-fit tracking-wider'>
                    GAME DEVELOPMENT<span className='font-light italic text-black'>"</span>
                </p>
            </div>
        </div>
    );
}

export default Page1Content;