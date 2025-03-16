import ScrollingCards from "../components/ScrollingCards";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from '../utils/SplitType';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Page4 = () => {
    const parentRef = useRef(null);
    const sectionRef = useRef(null);
    const heading1Ref = useRef(null);
    const heading2Ref = useRef(null);

    // Add SplitType animation for the headings
    useEffect(() => {
        // Create a context for GSAP animations
        const ctx = gsap.context(() => {
            // Split heading text for character animation
            const heading1Text = new SplitType(heading1Ref.current, { types: 'chars' });
            const heading2Text = new SplitType(heading2Ref.current, { types: 'chars' });
            
            const heading1Chars = heading1Text.chars;
            const heading2Chars = heading2Text.chars;
            
            // Create staggered animation for first heading
            gsap.fromTo(heading1Chars,
                { 
                    y: 100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.03,
                    duration: 0.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: heading1Ref.current,
                        start: "top bottom-=100",
                        end: "top center",
                        scrub: 0.5
                    }
                }
            );
            
            // Create staggered animation for second heading with a slight delay
            gsap.fromTo(heading2Chars,
                { 
                    y: 100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.04,
                    duration: 0.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: heading2Ref.current,
                        start: "top bottom-=100",
                        end: "top center+=50",
                        scrub: 0.5
                    }
                }
            );
        }, sectionRef);
        
        // Clean up animations and SplitText instances
        return () => ctx.revert();
    }, []);

    // The mouse movement effect is commented out in the original code,
    // so I'll keep it that way

    return (
        <div 
            id="projects" 
            ref={sectionRef}
            className="w-full min-h-screen bg-[#0B0D0C] text-white flex flex-col gap-16 pt-[30vw] pb-10 border-b border-b-zinc-800"
        >
            <div className="w-full flex flex-col items-end px-28 leading-none pb-10">
                <h1 
                    ref={heading1Ref} 
                    className="exo-2-bold text-[10vw] tracking-widest"
                >
                    PROJECTS
                </h1>
                <h1 
                    ref={heading2Ref}
                    className="text-[7vw] tracking-widest mr-2 italic"
                >
                    BY ME.
                </h1>
            </div>

            <div ref={parentRef} className="w-full px-32 flex justify-center gap-10">
                <ScrollingCards />
            </div>
        </div>
    );
}

export default Page4;