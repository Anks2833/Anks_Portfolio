import ScrollingCards from "../components/ScrollingCards";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Page4 = () => {
    const parentRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const { left, top, width, height } = parentRef.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            const rotateX = (y / height) * 30;
            const rotateY = -(x / width) * 30;

            gsap.to(parentRef.current, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.set(parentRef.current, {
                rotateX: 0,
                rotateY: 0,
            });
        };

        const element = parentRef.current;
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div id="projects" className="w-full h-screen bg-[#0B0D0C] text-white pt-12 flex flex-col gap-16">
            <div className="w-full flex flex-col items-end px-28 leading-none">
                <h1 className="text-[4vw] tracking-widest">PROJECTS</h1>
                <h1 className="text-[2vw] tracking-widest mr-2">BY ME</h1>
            </div>

            <div ref={parentRef} className="w-full px-32 flex justify-center gap-10">
                <ScrollingCards />
            </div>
        </div>
    );
}

export default Page4;