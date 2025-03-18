import { useRef, useEffect } from 'react';
import ScrollingCards from "../components/ScrollingCards";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from '../utils/SplitType';
import { motion, useScroll, useTransform } from 'framer-motion';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Page4 = () => {
    const parentRef = useRef(null);
    const sectionRef = useRef(null);
    const heading1Ref = useRef(null);
    const heading2Ref = useRef(null);
    const backgroundRef = useRef(null);
    
    // Parallax effect with framer-motion
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    
    // Transform values for parallax effects
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const headingOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0.6, 1]);
    const headingScale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
    
    // Mouse movement effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 40;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;
            
            if (backgroundRef.current) {
                gsap.to(backgroundRef.current, {
                    x: xPos,
                    y: yPos,
                    duration: 1.5,
                    ease: "power2.out"
                });
            }
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

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
            
            // Add a cool line animation under "BY ME." text
            const line = document.createElement('div');
            line.className = 'h-[3px] bg-[#BFFF00] transform scale-x-0 origin-left transition-transform duration-700';
            // line.style.width = '40%';
            
            // Append line after heading2
            if (heading2Ref.current.parentNode) {
                heading2Ref.current.parentNode.appendChild(line);
                
                // Animate line
                gsap.to(line, {
                    scaleX: 1,
                    duration: 1.2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: heading2Ref.current,
                        start: "top center+=100",
                        toggleActions: "play none none reverse"
                    }
                });
            }
            
            // Animate the overall section
            gsap.fromTo(
                sectionRef.current,
                { 
                    backgroundColor: "#0B0D0C" 
                },
                {
                    backgroundColor: "#0b0d0c",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }, sectionRef);
        
        // Clean up animations and SplitText instances
        return () => ctx.revert();
    }, []);

    return (
        <div 
            id="projects" 
            ref={sectionRef}
            className="w-full min-h-screen bg-[#0B0D0C] text-white flex flex-col relative overflow-hidden pt-[10vw] pb-20"
        >
            {/* Background elements */}
            <motion.div 
                ref={backgroundRef}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ y: bgY }}
            >
                {/* Background shapes and gradients */}
                <div className="absolute top-[10%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-[#BFFF00]/5 blur-[150px]"></div>
                <div className="absolute bottom-[30%] left-[10%] w-[25vw] h-[25vw] rounded-full bg-[#BFFF00]/3 blur-[120px]"></div>
                
                {/* Background grid */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMjEyMTIiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBhMzAgMzAgMCAxMS02MCAwIDMwIDMwIDAgMDE2MCAweiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-[0.03]"></div>
                
                {/* Noise overlay */}
                <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
            </motion.div>
            
            {/* Heading container */}
            <motion.div 
                className="w-full flex flex-col items-end px-6 sm:px-12 md:px-20 lg:px-28 leading-none pb-10 md:pb-16 relative z-10"
                style={{ opacity: headingOpacity, scale: headingScale }}
            >
                <h1 
                    ref={heading1Ref} 
                    className="exo-2-bold text-[13vw] sm:text-[11vw] md:text-[10vw] tracking-widest text-white relative"
                >
                    PROJECTS
                    <span className="text-[#BFFF00] absolute -right-4">.</span>
                </h1>
                <h1 
                    ref={heading2Ref}
                    className="text-[9vw] sm:text-[8vw] md:text-[7vw] tracking-widest mr-2 italic text-white/90"
                >
                    BY ME
                    <span className="text-[#BFFF00]">.</span>
                </h1>
                
                {/* Subtle hint text */}
                <div className="absolute -bottom-4 right-28 text-white/30 text-sm italic tracking-widest flex items-center">
                    <span>SCROLL</span>
                    <svg className="ml-2 w-5 h-5 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </motion.div>

            {/* Projects container */}
            <div ref={parentRef} className="w-full px-4 sm:px-8 md:px-16 lg:px-32 flex justify-center relative z-10">
                <ScrollingCards />
            </div>
            
            {/* Bottom reveal mask */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0B0D0C] to-transparent z-20"></div>
        </div>
    );
}

export default Page4;