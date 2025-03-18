import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { handleMouseEnterBig, handleMouseLeave } from '../utils/CursorEffects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import SplitType from '../utils/SplitType';
import "../styles/Page3.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const containerRef = useRef(null);
  const achievementsRefs = useRef([]);
  const textRefs = useRef([]);
  const lenisRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState('down');
  const headingRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.3, 1]);

  const achievements = [
    {id: "01", name: "Winner of 2021 hackathon held at ITS College, Mohan Nagar"},
    {id: "02", name: "Project lead for the Outback Resorts website at Astra Techz in April 2024"},
    {id: "03", name: "Star Performer of the Month in October 2024 at Metadrob Company"},
    {id: "04", name: "Star Performer of the Month in November 2024 at Metadrob Company"},
  ];

  // Animation variants for motion elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Improved easing function
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    
    // Store previous scroll position to determine direction
    let prevScroll = window.scrollY;
    
    // Connect Lenis to RAF
    function raf(time) {
      lenisRef.current.raf(time);
      
      // Detect scroll direction
      const currentScroll = window.scrollY;
      if (currentScroll > prevScroll) {
        setScrollDirection('down');
      } else if (currentScroll < prevScroll) {
        setScrollDirection('up');
      }
      prevScroll = currentScroll;
      
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    // Connect GSAP ScrollTrigger with Lenis
    lenisRef.current.on('scroll', ScrollTrigger.update);

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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Enhanced animations for achievements
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text for letter-by-letter reveal
      textRefs.current.forEach((textRef, index) => {
        if (textRef) {
          const splitText = new SplitType(textRef, { types: 'chars, words' });
          const chars = splitText.chars;
          
          // Set initial state
          gsap.set(chars, { 
            opacity: 0,
            y: 20
          });
          
          // Create staggered reveal animation on scroll
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef,
              start: 'top 85%',
              end: 'top 65%',
              scrub: 0.6
            }
          });
        }
      });

      // Animate achievement items
      achievementsRefs.current.forEach((item, index) => {
        if (!item) return;
        
        const hoverTl = gsap.timeline({ paused: true });
        const idText = item.querySelector('.achievement-id');
        const line = item.querySelector('.line-progress');
        
        // Create hover animation
        hoverTl
          .to(line, { 
            width: '100%', 
            duration: 0.6, 
            ease: 'power2.out' 
          }, 0)
          .to(idText, { 
            color: '#BFFF00', 
            duration: 0.3, 
            ease: 'power2.out' 
          }, 0);
        
        // Add hover event listeners
        item.addEventListener('mouseenter', () => hoverTl.play());
        item.addEventListener('mouseleave', () => hoverTl.reverse());
        
        // Enhanced scroll-based reveal animation
        gsap.fromTo(
          item,
          { 
            opacity: 0,
            y: 80,
            rotationX: scrollDirection === 'down' ? 5 : -5
          },
          { 
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.8
            }
          }
        );
        
        // Add horizontal sliding effect based on scroll
        gsap.fromTo(
          item,
          { 
            x: index % 2 === 0 ? -50 : 50,
          },
          { 
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.6
            }
          }
        );
        
        // Create progressively delayed reveal effect
        const delayMultiplier = 0.15;
        gsap.set(item, { 
          opacity: 0, 
          transformOrigin: index % 2 === 0 ? 'left center' : 'right center' 
        });
        
        gsap.to(item, {
          opacity: 1,
          duration: 1,
          delay: index * delayMultiplier,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
        
        // Parallax effect based on scroll position
        gsap.to(item, {
          y: (index + 1) * -10, // Different parallax speeds
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      });
      
      // Animate the title if it exists
      if (headingRef.current) {
        const headingText = new SplitType(headingRef.current, { types: 'chars' });
        const chars = headingText.chars;
        
        gsap.set(chars, { opacity: 0, y: 50 });
        
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.6
          }
        });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [scrollDirection]);

  // Enhanced mouse move interaction with 3D effect
  const handleItemMouseMove = (e, index) => {
    const item = achievementsRefs.current[index];
    if (!item) return;
    
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate distance from center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distanceX = (x - centerX) / centerX;
    const distanceY = (y - centerY) / centerY;
    
    // Enhanced 3D rotation with depth effect
    gsap.to(item, {
      rotationY: distanceX * 5,
      rotationX: -distanceY * 5,
      z: 20, // Subtle depth
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Subtle movement for text elements
    const textElement = item.querySelector('.achievement-text');
    if (textElement) {
      gsap.to(textElement, {
        x: distanceX * 10,
        y: distanceY * 5,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
    
    handleMouseEnterBig();
  };

  const handleItemMouseLeave = (e, index) => {
    const item = achievementsRefs.current[index];
    if (!item) return;
    
    // Reset the rotation when mouse leaves
    gsap.to(item, {
      rotationY: 0,
      rotationX: 0,
      z: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
    
    // Reset text position
    const textElement = item.querySelector('.achievement-text');
    if (textElement) {
      gsap.to(textElement, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    }
    
    // Call the original mouse handler
    handleMouseLeave(e);
  };

  return (
    <motion.div 
      ref={containerRef}
      className="achievements-container w-full flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ opacity }}
    >
      {/* Optional heading that can be added if needed */}
      <h1 ref={headingRef} className="hidden">Achievements</h1>
      
      {achievements.map((ach, index) => (
        <div 
          key={ach.id}
          ref={el => achievementsRefs.current[index] = el}
          className="achievement-item relative border-t border-t-[#BFFF00]/30 py-12 overflow-hidden group cursor-pointer backdrop-blur-sm"
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity'
          }}
          onMouseEnter={(e) => handleItemMouseMove(e, index, `${ach.id}`)}
          onMouseMove={(e) => handleItemMouseMove(e, index)}
          onMouseLeave={(e) => handleItemMouseLeave(e, index)}
          data-content={`${ach.id}. ${ach.name}`}
          data-scroll
          data-scroll-speed={index % 2 === 0 ? "0.1" : "0.15"}
        >
          {/* Enhanced background glow that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#BFFF00]/0 via-[#BFFF00]/5 to-[#BFFF00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Animated line that grows from left on hover */}
          <div className="line-progress absolute bottom-0 left-0 h-[1px] w-0 bg-[#BFFF00] z-10"></div>
          
          <div className="flex items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
            {/* Achievement number with enhanced effect */}
            <div className="achievement-id grechen-fuemen-regular italic font-bold text-3xl md:text-5xl lg:text-6xl text-white/80 transition-colors duration-300 tracking-tighter">
              {ach.id}<span className="text-[#BFFF00]">.</span>
            </div>
            
            {/* Achievement text with character-by-character reveal */}
            <h2 
              ref={el => textRefs.current[index] = el}
              className="achievement-text grechen-fuemen-regular italic text-2xl md:text-3xl lg:text-4xl text-white/90 transition-colors duration-300 tracking-tight leading-tight"
            >
              {ach.name}
            </h2>
          </div>
          
          {/* Enhanced arrow indicator with smoother transition */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-8 transition-all duration-500 ease-out">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#BFFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      ))}
      
      {/* Bottom border for the last item */}
      <div className="h-[1px] w-full bg-[#BFFF00]/30"></div>
    </motion.div>
  );
};

export default Achievements;