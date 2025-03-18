import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Project1 from "./projects/Project1";
import Project2 from "./projects/Project2";
import Project3 from "./projects/Project3";
import Project4 from "./projects/Project4";
import Project5 from "./projects/Project5";
import Project6 from "./projects/Project6";
import { FaArrowLeftLong } from "react-icons/fa6";
import ArrowPlaceholder from "./ArrowPlaceholder";
import phrases from "./projects/Phrases";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ScrollingCards = () => {
  // State for hover interactions
  const [visible, setIsVisible] = useState(false);
  const [visible1, setIsVisible1] = useState(false);
  const [visible2, setIsVisible2] = useState(false);
  
  // Refs for animation targets
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const projectRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const arrowRefs = [useRef(null), useRef(null), useRef(null)];
  const lenisRef = useRef(null);
  
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    // Create Lenis instance with premium settings
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis to GSAP's ticker
    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Connect GSAP ScrollTrigger with Lenis
    lenisRef.current.on("scroll", ScrollTrigger.update);
    
    // Make ScrollTrigger work with Lenis
    gsap.ticker.add((time) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time * 1000);
      }
    });
    
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

    // Refresh ScrollTrigger on page load
    ScrollTrigger.refresh();
    
    // Clean up function
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        gsap.ticker.remove(lenisRef.current.raf);
      }
    };
  }, []);
  
  // Initialize scroll animations
  useEffect(() => {
    // Create context for GSAP animations
    const ctx = gsap.context(() => {
      // Section 1 parallax effect
      gsap.to(section1Ref.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
      
      // Section 2 parallax effect (opposite direction)
      gsap.to(section2Ref.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8
        }
      });
      
      // Section 3 parallax effect
      gsap.to(section3Ref.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });
      
      // Project cards staggered reveal animations
      projectRefs.forEach((ref, index) => {
        const direction = index % 2 === 0 ? -30 : 30;
        
        gsap.fromTo(ref.current,
          { 
            y: 100,
            x: direction,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              end: "top 60%",
              scrub: 0.8
            }
          }
        );
      });
      
      // Arrow circles reveal and subtle rotation
      arrowRefs.forEach((ref, index) => {
        // Initial set for reveal animation
        gsap.set(ref.current, { 
          opacity: 0, 
          scale: 0.8
        });
        
        // Reveal animation
        gsap.to(ref.current, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "top 50%",
            scrub: 0.5
          }
        });
        
        // Subtle rotation based on scroll
        gsap.to(ref.current, {
          rotation: index % 2 === 0 ? 10 : -10,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });
      
      // Content sections parallax
      gsap.utils.toArray('.content-section').forEach((section, i) => {
        // Different parallax speeds based on section position
        const y = i % 2 === 0 ? -20 : -30;
        
        gsap.to(section, {
          y: y,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef); // Scope all animations to containerRef
    
    // Clean up
    return () => ctx.revert();
  }, []);

  // Hover handlers
  const handleVisibility = () => setIsVisible(!visible);
  const handleVisibility1 = () => setIsVisible1(!visible1);
  const handleVisibility2 = () => setIsVisible2(!visible2);
  
  // In-view detection with Framer Motion
  const useRevealAnimation = (ref) => {
    const isInView = useInView(ref, { once: false, amount: 0.2 });
    return isInView;
  };

  // Check if sections are in view
  const section1InView = useRevealAnimation(section1Ref);
  const section2InView = useRevealAnimation(section2Ref);
  const section3InView = useRevealAnimation(section3Ref);

  return (
    <div 
      ref={containerRef} 
      className="flex flex-col gap-52 relative"
      style={{ 
        willChange: "transform", 
        perspective: "1000px"
      }}
    >
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-500/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-bl from-purple-500/5 to-transparent blur-3xl"></div>
      </div>
      
      {/* First section */}
      <div 
        ref={section1Ref}
        className={`flex items-center justify-between content-section transition-opacity duration-1000 ${section1InView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex items-start gap-12">
          <div ref={projectRefs[0]} className="project-card">
            <Project1 />
          </div>
          <div ref={projectRefs[1]} className="project-card mt-60">
            <Project2 />
          </div>
        </div>

        <div
          ref={arrowRefs[0]}
          className="relative w-96 h-96 rounded-full border ml-32 overflow-hidden arrow-circle transform"
          onMouseEnter={handleVisibility}
          onMouseLeave={handleVisibility}
          style={{ willChange: "transform, opacity" }}
        >
          {visible ? (
            <ArrowPlaceholder title={phrases[0].title} />
          ) : (
            <FaArrowLeftLong
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl -rotate-90 transition-transform duration-700"
              style={{ stroke: "white", strokeWidth: "2" }}
            />
          )}
        </div>
      </div>

      {/* Second section */}
      <div 
        ref={section2Ref}
        className={`flex items-start justify-between content-section transition-opacity duration-1000 ${section2InView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          ref={arrowRefs[1]}
          className="relative w-96 h-96 rounded-full border overflow-hidden arrow-circle transform"
          onMouseEnter={handleVisibility1}
          onMouseLeave={handleVisibility1}
          style={{ willChange: "transform, opacity" }}
        >
          {visible1 ? (
            <ArrowPlaceholder title={phrases[1].title} />
          ) : (
            <FaArrowLeftLong
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl rotate-[220deg] transition-transform duration-700"
              style={{ stroke: "white", strokeWidth: "2" }}
            />
          )}
        </div>

        <div className="flex items-center gap-12">
          <div ref={projectRefs[2]} className="project-card mt-60">
            <Project3 />
          </div>
          <div ref={projectRefs[3]} className="project-card">
            <Project4 />
          </div>
        </div>
      </div>

      {/* Third section */}
      <div 
        ref={section3Ref}
        className={`flex items-start justify-center gap-12 content-section transition-opacity duration-1000 ${section3InView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div ref={projectRefs[4]} className="project-card mt-80">
          <Project5 />
        </div>

        <div
          ref={arrowRefs[2]}
          className="relative w-96 h-96 rounded-full border overflow-hidden arrow-circle transform"
          onMouseEnter={handleVisibility2}
          onMouseLeave={handleVisibility2}
          style={{ willChange: "transform, opacity" }}
        >
          {visible2 ? (
            <ArrowPlaceholder title={phrases[2].title} />
          ) : (
            <FaArrowLeftLong
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl -rotate-90 transition-transform duration-700"
              style={{ stroke: "white", strokeWidth: "2" }}
            />
          )}
        </div>

        <div ref={projectRefs[5]} className="project-card">
          <Project6 />
        </div>
      </div>
    </div>
  );
};

export default ScrollingCards;