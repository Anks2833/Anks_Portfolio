import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from '../utils/SplitType';
import Achievements from '../components/Achievements';
import "../styles/Page3.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Page3 = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bgGradientRef = useRef(null);
  const contentRef = useRef(null);
  
  // Parallax scrolling effect with Framer Motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const headingY = useTransform(scrollYProgress, [0, 0.5], [100, -50]);
  const bgGradientY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const bgGradientScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.3, 0.3, 0]);
  
  // Using the official @gsap/react hook for heading animation
  useGSAP(() => {
    // Text splitting for character animation
    const headingText = new SplitType(headingRef.current, { types: 'chars' });
    const chars = headingText.chars;
    
    // Create staggered animation for heading
    gsap.fromTo(chars,
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
          trigger: headingRef.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 0.5
        }
      }
    );
    
    // Clean up
    return () => {
      if (headingText && typeof headingText.revert === 'function') {
        headingText.revert();
      }
    };
  }, { scope: sectionRef });
  
  // Parallax effects for the entire section
  useEffect(() => {
    // Only on desktop - prevent horizontal scroll from affecting page scroll
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      document.body.style.overflowX = "hidden";
      
      return () => {
        document.body.style.overflowX = "";
      };
    });
    
    return () => mm.revert();
  }, []);
  
  return (
    <section 
      id="achievements" 
      ref={sectionRef}
      className="achievements-section relative w-full min-h-screen bg-[#0B0D0C] text-white overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div 
        ref={bgGradientRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ 
          y: bgGradientY,
          scale: bgGradientScale,
          opacity: bgOpacity
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/3 w-1/2 h-1/2 bg-[#BFFF00] opacity-10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1/3 h-1/3 bg-[#BFFF00] opacity-5 rounded-full blur-[100px]"></div>
        </div>
      </motion.div>
      
      {/* Content container */}
      <div 
        ref={contentRef}
        className="content-wrapper relative z-10 w-full h-full flex flex-col px-5 sm:px-10 md:px-16 lg:px-28 pt-32 sm:pt-40 md:pt-60 pb-24"
      >
        {/* Heading with motion parallax */}
        <motion.div 
          className="heading-container overflow-hidden mb-16 md:mb-24"
          style={{ y: headingY }}
        >
          <h1 
            ref={headingRef} 
            className="page-3-heading exo-2-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-widest"
          >
            ACHIEVEMENTS<span className="text-[#BFFF00]">.</span>
          </h1>
        </motion.div>
        
        {/* Achievement items - now using the redesigned component */}
        <Achievements />
      </div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light pointer-events-none z-10"></div>
    </section>
  );
};

export default Page3;