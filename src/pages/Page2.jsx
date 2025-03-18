import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
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
  const lenisRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState("down");
  const lastScrollY = useRef(0);

  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Create scroll-based transforms with enhanced ranges for smoother effects
  const headingY = useTransform(scrollYProgress, [0, 0.3], [100, -20]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const photoScale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1.05]);
  const photoRotate = useTransform(scrollYProgress, [0.1, 0.4], [5, 0]); // Reduced rotation amount
  
  // Parallax effects
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Improved easing function
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    
    // Store previous scroll position to determine direction
    let prevScroll = window.scrollY;
    
    // Connect Lenis to GSAP's ticker for smooth animation updates
    function raf(time) {
      lenisRef.current.raf(time);
      
      // Detect scroll direction
      const currentScroll = window.scrollY;
      if (currentScroll > prevScroll) {
        setScrollDirection("down");
      } else if (currentScroll < prevScroll) {
        setScrollDirection("up");
      }
      prevScroll = currentScroll;
      
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    // Connect GSAP ScrollTrigger with Lenis
    lenisRef.current.on("scroll", ScrollTrigger.update);

    // Ensure ScrollTrigger refresh happens properly with Lenis
    gsap.ticker.add((time) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time * 1000);
      }
    });
    
    // Make ScrollTrigger work with Lenis
    ScrollTrigger.scrollerProxy(window, {
      scrollTop(value) {
        if (arguments.length) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(value, { immediate: true });
          }
        }
        return window.scrollY;
      },
      scrollHeight: () => document.body.scrollHeight,
    });

    // Clean up
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        gsap.ticker.remove(lenisRef.current.raf);
      }
    };
  }, []);

  // Initialize animations with enhanced effects
  useEffect(() => {
    // Create context for GSAP animations
    const ctx = gsap.context(() => {
      // Text splitting for character animation
      const headingText = new SplitType(headingRef.current, { types: 'chars' });
      const chars = headingText.chars;
      
      // Create staggered animation for heading with improved timing
      gsap.fromTo(chars,
        { 
          y: 120,
          opacity: 0,
          rotationX: 30
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.03,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=120",
            end: "top center",
            scrub: 0.8
          }
        }
      );
      
      // Animate content lines with improved dynamics
      const contentLines = contentRef.current.querySelectorAll('.content-line');
      gsap.set(contentLines, { y: 50, opacity: 0 });
      gsap.to(contentLines, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          end: "top 40%",
          scrub: 0.6
        }
      });
      
      // Photo animation with parallax (without 3D rotation)
      gsap.fromTo(photoRef.current, 
        { scale: 0.7, opacity: 0, y: 100 },
        { 
          scale: 1, 
          opacity: 1,
          y: 0,
          duration: 1.6, 
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.8
          }
        }
      );
      
      // Add parallax effect to photo
      ScrollTrigger.create({
        trigger: photoRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const speed = 0.1;
          const y = -self.progress * 100 * speed;
          gsap.to(photoRef.current, {
            y: y,
            ease: "none",
            overwrite: "auto",
            duration: 0.3
          });
        }
      });
      
      // Tech text animation with letter-by-letter reveal
      const techText = new SplitType(techTextRef.current, { types: 'chars' });
      const techChars = techText.chars;
      
      // Set initial state - all characters transparent
      gsap.set(techChars, { opacity: 0 });
      
      // Create letter-by-letter reveal based on scroll
      gsap.to(techChars, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: techTextRef.current,
          start: "top 85%",
          end: "top 65%",
          scrub: 0.8
        }
      });
      
      // Marquee reveal animation with enhanced parallax
      gsap.fromTo(marqueeRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 95%",
            end: "top 75%",
            scrub: 1
          }
        }
      );
      
      // Add horizontal parallax to background elements
      const bgElements = document.querySelectorAll('.bg-gradient-circle');
      bgElements.forEach((el) => {
        gsap.fromTo(el, 
          { x: 0 },
          {
            x: -100,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5
            }
          }
        );
      });
    }, sectionRef); // Scope all animations to sectionRef
    
    // Clean up
    return () => ctx.revert();
  }, []);
  
  // Removed 3D rotation effect for photo as requested
  useEffect(() => {
    // No mouse rotation effect, as per request
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="page2-section relative w-full min-h-screen bg-[#0B0D0C] text-white overflow-hidden"
    >
      {/* Enhanced background elements with parallax */}
      <motion.div 
        className="noise-overlay absolute inset-0 opacity-5 pointer-events-none"
        style={{ y: bgParallax }}
      ></motion.div>
      <motion.div 
        className="bg-gradient-circle absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-[#BFFF00]/10 to-transparent blur-3xl pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
      ></motion.div>
      
      <div className="page2-container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 pt-24 lg:pt-40 pb-32">
        <div className="content-wrapper flex flex-col lg:flex-row gap-8 lg:gap-16 relative z-10">
          {/* Text content section with enhanced animations */}
          <div className="text-content flex-1">
            {/* Heading with Framer Motion scroll animation */}
            <motion.div
              style={{ 
                y: headingY, 
                opacity: headingOpacity,
                transition: { duration: 0.5 }
              }}
              className="heading-wrapper overflow-hidden mb-12 lg:mb-16"
            >
              <h1 
                ref={headingRef} 
                className="lilita-one-regular text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-wider leading-tight"
              >
                ABOUT ME?
              </h1>
            </motion.div>
            
            {/* Content paragraphs with enhanced reveal animation */}
            <div 
              ref={contentRef} 
              className="content-paragraphs space-y-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-tight"
              data-scroll
              data-scroll-speed="0.3"
            >
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
            
            {/* Tech intro text with letter-by-letter reveal on scroll */}
            <p 
              ref={techTextRef}
              className="tech-intro exo-2-bold mt-16 lg:mt-24 text-lg sm:text-xl md:text-2xl leading-relaxed tracking-normal"
            >
              Well-versed in numerous technologies including:
            </p>
          </div>
          
          {/* Photo section with enhanced 3D and parallax effects */}
          <motion.div 
            className="photo-wrapper relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto lg:mx-0"
            style={{ 
              scale: photoScale, 
              rotate: photoRotate
            }}
            data-scroll
            data-scroll-speed="0.5"
          >
            {/* Photo frame without 3D effect as requested */}
            <div 
              ref={photoRef}
              className="photo-frame relative w-full h-full rounded-full overflow-hidden border-2 border-[#BFFF00]/20"
            >
              <img 
                className="photo w-full h-full object-cover" 
                src="./anks_img.jpg" 
                alt="Ankur Dubey" 
              />
              
              {/* Enhanced overlay glow effect with motion */}
              <motion.div 
                className="photo-overlay absolute inset-0 bg-gradient-to-tr from-[#BFFF00]/10 to-transparent mix-blend-overlay"
                style={{
                  opacity: useTransform(scrollYProgress, [0.2, 0.4], [0.2, 0.8])
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Marquee section with enhanced reveal */}
      <div 
        ref={marqueeRef} 
        className="marquee-wrapper relative w-full overflow-hidden"
        data-scroll
        data-scroll-speed="-0.2"
      >
        <AnimatedMarquee />
      </div>
    </section>
  );
};

export default Page2;