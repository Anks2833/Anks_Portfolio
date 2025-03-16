import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "../utils/SplitType";
import AnimatedMarquee from "../components/AnimatedMarquee";
import "../styles/Page2.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Page2 = () => {
  // Refs for animation targets
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const photoRef = useRef(null);
  const techTextRef = useRef(null);
  const marqueeRef = useRef(null);

  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Create scroll-based transforms
  const headingY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const photoScale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1]);
  const photoRotate = useTransform(scrollYProgress, [0.1, 0.4], [15, 0]);

  // Initialize animations
  useEffect(() => {
    // Create context for GSAP animations
    const ctx = gsap.context(() => {
      // Text splitting for character animation (just like in Page3)
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
      
      // Animate content lines
      const contentLines = contentRef.current.querySelectorAll('.content-line');
      gsap.set(contentLines, { y: 30, opacity: 0 });
      gsap.to(contentLines, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Photo animation
      gsap.fromTo(photoRef.current, 
        { scale: 0.7, rotate: 15, opacity: 0 },
        { 
          scale: 1, 
          rotate: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Tech text animation
      gsap.fromTo(techTextRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: techTextRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Marquee reveal animation
      gsap.fromTo(marqueeRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef); // Scope all animations to sectionRef
    
    // Clean up split text
    return () => ctx.revert(); // This will clean up all GSAP animations and SplitType
  }, []);
  
  // Mouse follow effect for photo
  useEffect(() => {
    if (!photoRef.current) return;
    
    const handleMouseMove = (e) => {
      const photoRect = photoRef.current.getBoundingClientRect();
      const centerX = photoRect.left + photoRect.width / 2;
      const centerY = photoRect.top + photoRect.height / 2;
      
      // Calculate distance from center (normalize to -1 to 1 range)
      const moveX = (e.clientX - centerX) / photoRect.width * 15; // Max 15 degrees
      const moveY = (e.clientY - centerY) / photoRect.height * 15;
      
      // Apply subtle rotation based on mouse position
      gsap.to(photoRef.current, {
        rotateY: -moveX,
        rotateX: moveY,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="page2-section relative w-full min-h-screen bg-[#0B0D0C] text-white overflow-hidden"
    >
      <div className="page2-container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 pt-24 lg:pt-40 pb-32">
        {/* Background elements */}
        <div className="noise-overlay absolute inset-0 opacity-5 pointer-events-none"></div>
        <div className="bg-gradient-circle absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-[#BFFF00]/10 to-transparent blur-3xl pointer-events-none"></div>
        
        <div className="content-wrapper flex flex-col lg:flex-row gap-8 lg:gap-16 relative z-10">
          {/* Text content section */}
          <div className="text-content flex-1">
            {/* Heading with Framer Motion scroll animation */}
            <motion.div
              style={{ y: headingY, opacity: headingOpacity }}
              className="heading-wrapper overflow-hidden mb-12 lg:mb-16"
            >
              <h1 
                ref={headingRef} 
                className="lilita-one-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider leading-tight"
              >
                DO YOU REALLY KNOW ME?
              </h1>
            </motion.div>
            
            {/* Content paragraphs with manual line elements for animation */}
            <div ref={contentRef} className="content-paragraphs space-y-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-tight">
              <div className="content-line-wrapper overflow-hidden">
                <p className="content-line">I am Ankur Dubey, a self-taught Full-Stack</p>
              </div>
              <div className="content-line-wrapper overflow-hidden">
                <p className="content-line">Developer who constantly seeks out</p>
              </div>
              <div className="content-line-wrapper overflow-hidden">
                <p className="content-line">innovative solutions to everyday problems</p>
              </div>
              <div className="content-line-wrapper overflow-hidden">
                <p className="content-line">and enjoys creating things that live on the internet.</p>
              </div>
            </div>
            
            {/* Tech intro text */}
            <p 
              ref={techTextRef}
              className="tech-intro exo-2-bold mt-16 lg:mt-24 text-lg sm:text-xl md:text-2xl leading-relaxed tracking-normal"
            >
              Well-versed in numerous technologies including:
            </p>
          </div>
          
          {/* Photo section with Framer Motion animation */}
          <motion.div 
            className="photo-wrapper relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto lg:mx-0"
            style={{ 
              scale: photoScale, 
              rotate: photoRotate,
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            {/* Photo frame with pseudo-elements for decorative elements */}
            <div 
              className="photo-frame relative w-full h-full rounded-full overflow-hidden border-2 border-[#BFFF00]/20"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img 
                className="photo w-full h-full object-cover" 
                src="./anks_img.jpg" 
                alt="Ankur Dubey" 
              />
              
              {/* Overlay glow effect */}
              <div className="photo-overlay absolute inset-0 bg-gradient-to-tr from-[#BFFF00]/10 to-transparent mix-blend-overlay"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Marquee section */}
      <div 
        ref={marqueeRef} 
        className="marquee-wrapper relative w-full overflow-hidden"
      >
        <AnimatedMarquee />
      </div>
    </section>
  );
};

export default Page2;