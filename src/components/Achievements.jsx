import { useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../styles/Page3.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const containerRef = useRef(null);
  const achievementRefs = useRef([]);
  const timelineRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const hoverSetupDone = useRef(false);
  
  // Reset refs array on render
  achievementRefs.current = [];
  
  const achievements = [
    {
      id: "01", 
      name: "Winner of 2021 hackathon held at ITS College, Mohan Nagar",
      year: "2021",
      category: "Competition"
    },
    {
      id: "02", 
      name: "Project lead for the Outback Resorts website at Astra Techz in April 2024",
      year: "2024",
      category: "Leadership"
    },
    {
      id: "03", 
      name: "Star Performer of the Month in October 2024 at Metadrob Company",
      year: "2024",
      category: "Recognition"
    },
    {
      id: "04", 
      name: "Star Performer of the Month in November 2024 at Metadrob Company",
      year: "2024",
      category: "Recognition"
    },
  ];

  // Handle hover effects with event delegation instead of individual listeners
  const setupHoverEffects = useCallback(() => {
    if (!containerRef.current || hoverSetupDone.current) return;
    
    const container = containerRef.current;
    
    // Use event delegation - add listeners to the parent
    container.addEventListener('mouseover', (e) => {
      const item = e.target.closest('.achievement-item');
      if (!item) return;
      
      gsap.to(item, {
        backgroundColor: "rgba(191, 255, 0, 0.1)",
        x: 10,
        duration: 0.3,
        ease: "power2.out"
      });
      
      const line = item.querySelector('.achievement-line');
      const number = item.querySelector('.achievement-number');
      const text = item.querySelector('.achievement-text');
      
      if (line) {
        gsap.to(line, {
          backgroundColor: "#BFFF00",
          height: "3px",
          duration: 0.3
        });
      }
      
      if (number) {
        gsap.to(number, {
          scale: 1.2,
          color: "#BFFF00",
          fontWeight: "700",
          duration: 0.3
        });
      }
      
      if (text) {
        gsap.to(text, {
          textShadow: "0 0 8px rgba(191, 255, 0, 0.3)",
          color: "white",
          duration: 0.3
        });
      }
    });
    
    container.addEventListener('mouseout', (e) => {
      const item = e.target.closest('.achievement-item');
      if (!item) return;
      
      gsap.to(item, {
        backgroundColor: "transparent",
        x: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      
      const line = item.querySelector('.achievement-line');
      const number = item.querySelector('.achievement-number');
      const text = item.querySelector('.achievement-text');
      
      if (line) {
        gsap.to(line, {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          height: "1px",
          duration: 0.3
        });
      }
      
      if (number) {
        gsap.to(number, {
          scale: 1,
          color: "rgba(255, 255, 255, 0.6)",
          fontWeight: "400",
          duration: 0.3
        });
      }
      
      if (text) {
        gsap.to(text, {
          textShadow: "none",
          color: "rgba(255, 255, 255, 0.9)",
          duration: 0.3
        });
      }
    });
    
    hoverSetupDone.current = true;
  }, []);

  // Setup hover effects once after first render
  useEffect(() => {
    setupHoverEffects();
  }, [setupHoverEffects]);

  // Using the official @gsap/react hook with optimization
  useGSAP(() => {
    if (!containerRef.current || achievementRefs.current.length === 0) return;
    
    // Kill existing timeline if it exists
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    // Create a single timeline for better performance
    const tl = gsap.timeline();
    timelineRef.current = tl;
    
    // Set initial state once for all elements
    gsap.set(achievementRefs.current, { 
      opacity: 0,
      y: 50,
      xPercent: -5
    });
    
    // Create batch animations instead of individual ones
    achievementRefs.current.forEach((item, index) => {
      // Create a single ScrollTrigger for each item
      ScrollTrigger.create({
        trigger: item,
        start: "top bottom-=50",
        onEnter: () => {
          // Use a timeline for grouped animations
          const itemTl = gsap.timeline();
          
          // Main item animation
          itemTl.to(item, {
            opacity: 1,
            y: 0,
            xPercent: 0,
            duration: 0.8,
            ease: "power3.out"
          });
          
          // Line animation
          const line = item.querySelector('.achievement-line');
          if (line) {
            itemTl.fromTo(line, 
              { width: "0%" },
              {
                width: "100%",
                duration: 0.8,
                ease: "power2.inOut"
              },
              "-=0.6" // Overlap with previous animation
            );
          }
          
          // Year text
          const year = item.querySelector('.achievement-year');
          if (year) {
            itemTl.fromTo(year,
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power3.out"
              },
              "-=0.4" // Overlap with previous animation
            );
          }
          
          // Category badge
          const category = item.querySelector('.achievement-category');
          if (category) {
            itemTl.fromTo(category,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
              },
              "-=0.3" // Overlap with previous animation
            );
          }
        },
        once: true // Trigger only once for better performance
      });
    });
    
  }, { 
    scope: containerRef, 
    dependencies: [isInView], 
    revertOnUpdate: true // Clean up properly when dependencies change
  });

  // Variants for Framer Motion animations - simplified
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className="achievements-container w-full"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {achievements.map((ach, index) => (
        <motion.div
          key={ach.id}
          ref={el => { if (el) achievementRefs.current[index] = el }}
          className={`achievement-item relative p-4 sm:p-6 md:p-8 lg:p-10 mb-3 md:mb-6 rounded-lg ${
            index === achievements.length - 1 ? 'border-b border-b-[rgba(255,255,255,0.1)]' : ''
          }`}
          variants={itemVariants}
          custom={index}
          data-achievement-id={ach.id}
        >
          {/* Top border line with animation */}
          <div className="achievement-line h-[1px] w-full bg-[rgba(255,255,255,0.2)] mb-6"></div>
          
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
            {/* Achievement number */}
            <div className="achievement-number text-xl sm:text-2xl md:text-3xl font-light text-[rgba(255,255,255,0.6)] w-16 flex-shrink-0">
              {ach.id}
            </div>
            
            <div className="flex-1">
              {/* Achievement text */}
              <h2 className="achievement-text text-lg sm:text-xl md:text-2xl lg:text-4xl font-light leading-tight mb-4">
                {ach.name}
              </h2>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
                {/* Year badge */}
                <div className="achievement-year text-sm bg-[rgba(255,255,255,0.05)] px-3 py-1 rounded-full">
                  {ach.year}
                </div>
                
                {/* Category badge */}
                <div className="achievement-category text-xs text-[#BFFF00] border border-[rgba(191,255,0,0.3)] px-3 py-1 rounded-full">
                  {ach.category}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Achievements;