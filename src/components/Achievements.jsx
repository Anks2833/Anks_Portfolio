import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../styles/Page3.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const containerRef = useRef(null);
  const achievementRefs = useRef([]);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
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

  useEffect(() => {
    if (!containerRef.current) return;
    
    // GSAP animations for achievements
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(achievementRefs.current, { 
        opacity: 0,
        y: 50,
        xPercent: -5
      });
      
      // Create staggered reveal animation
      achievementRefs.current.forEach((item, index) => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          xPercent: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=50",
            end: "top center",
            toggleActions: "play none none none",
            // markers: true, // Debug only
          }
        });
        
        // Animate line grow on scroll
        if (item.querySelector('.achievement-line')) {
          gsap.fromTo(item.querySelector('.achievement-line'),
            { width: "0%" },
            {
              width: "100%",
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=100",
                end: "top center",
                toggleActions: "play none none none",
              }
            }
          );
        }
        
        // Animate year text reveal
        if (item.querySelector('.achievement-year')) {
          gsap.fromTo(item.querySelector('.achievement-year'),
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: 0.2 + (index * 0.1),
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=120",
                toggleActions: "play none none none",
              }
            }
          );
        }
        
        // Animate category badge
        if (item.querySelector('.achievement-category')) {
          gsap.fromTo(item.querySelector('.achievement-category'),
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: 0.4 + (index * 0.1),
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=100",
                toggleActions: "play none none none",
              }
            }
          );
        }
      });
      
      // Hover effects using GSAP
      achievementRefs.current.forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, {
            backgroundColor: "rgba(191, 255, 0, 0.1)",
            x: 10,
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Accent line animation
          gsap.to(el.querySelector('.achievement-line'), {
            backgroundColor: "#BFFF00",
            height: "3px",
            duration: 0.3
          });
          
          // Scale up the number
          gsap.to(el.querySelector('.achievement-number'), {
            scale: 1.2,
            color: "#BFFF00",
            fontWeight: "700",
            duration: 0.3
          });
          
          // Text glow effect
          gsap.to(el.querySelector('.achievement-text'), {
            textShadow: "0 0 8px rgba(191, 255, 0, 0.3)",
            color: "white",
            duration: 0.3
          });
        });
        
        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            backgroundColor: "transparent",
            x: 0,
            duration: 0.5,
            ease: "power2.out"
          });
          
          // Reset accent line
          gsap.to(el.querySelector('.achievement-line'), {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            height: "1px",
            duration: 0.3
          });
          
          // Reset number
          gsap.to(el.querySelector('.achievement-number'), {
            scale: 1,
            color: "rgba(255, 255, 255, 0.6)",
            fontWeight: "400",
            duration: 0.3
          });
          
          // Reset text
          gsap.to(el.querySelector('.achievement-text'), {
            textShadow: "none",
            color: "rgba(255, 255, 255, 0.9)",
            duration: 0.3
          });
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [isInView]);

  // Variants for Framer Motion animations
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
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
          className={`achievement-item relative p-4 sm:p-6 md:p-8 lg:p-10 mb-3 md:mb-6 rounded-lg transition-all duration-300 ${
            index === achievements.length - 1 ? 'border-b border-b-[rgba(255,255,255,0.1)]' : ''
          }`}
          variants={itemVariants}
          custom={index}
          whileHover={{ x: 10 }}
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