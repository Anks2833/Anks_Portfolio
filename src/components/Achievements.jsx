import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { handleMouseEnterBig, handleMouseLeave } from '../utils/CursorEffects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../styles/Page3.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const containerRef = useRef(null);
  const achievementsRefs = useRef([]);

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

  // Setup GSAP animations for each achievement item
  useEffect(() => {
    achievementsRefs.current.forEach((item, index) => {
      // Create the hover effect with GSAP
      const hoverTl = gsap.timeline({ paused: true });
      
      // Get the text and line elements within this achievement
      const text = item.querySelector('.achievement-text');
      const idText = item.querySelector('.achievement-id');
      const line = item.querySelector('.line-progress');
      
      hoverTl
        .to(line, { 
          width: '100%', 
          duration: 0.6, 
          ease: 'power2.out' 
        }, 0)
        .to(text, { 
          color: '#BFFF00', 
          duration: 0.3, 
          ease: 'power2.out' 
        }, 0)
        .to(idText, { 
          color: '#BFFF00', 
          duration: 0.3, 
          ease: 'power2.out' 
        }, 0);
      
      // Setup hover interaction
      item.addEventListener('mouseenter', () => hoverTl.play());
      item.addEventListener('mouseleave', () => hoverTl.reverse());
      
      // Initial reveal animation with ScrollTrigger
      gsap.fromTo(
        item,
        { 
          opacity: 0,
          y: 50
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            end: 'top center',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    return () => {
      // Cleanup all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Custom mouse animations beyond the basic handlers
  const handleItemMouseMove = (e, index) => {
    const item = achievementsRefs.current[index];
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Subtle tilt effect based on mouse position
    gsap.to(item, {
      rotationY: ((x / rect.width) - 0.5) * 5, // -2.5 to 2.5 degree rotation
      rotationX: ((y / rect.height) - 0.5) * -5,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Call the original mouse handler
    handleMouseEnterBig(e);
  };

  const handleItemMouseLeave = (e, index) => {
    // Reset the rotation when mouse leaves
    gsap.to(achievementsRefs.current[index], {
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
    
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
    >
      {achievements.map((ach, index) => (
        <div 
          key={ach.id}
          ref={el => achievementsRefs.current[index] = el}
          className="achievement-item relative border-t border-t-[#BFFF00]/30 py-12 overflow-hidden group cursor-pointer backdrop-blur-sm"
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
          onMouseEnter={(e) => handleItemMouseMove(e, index)}
          onMouseMove={(e) => handleItemMouseMove(e, index)}
          onMouseLeave={(e) => handleItemMouseLeave(e, index)}
          data-content={`${ach.id}. ${ach.name}`}
        >
          {/* Background glow that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#BFFF00]/0 via-[#BFFF00]/5 to-[#BFFF00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Animated line that grows from left on hover */}
          <div className="line-progress absolute bottom-0 left-0 h-[1px] w-0 bg-[#BFFF00] z-10"></div>
          
          <div className="flex items-start md:items-center flex-col md:flex-row gap-4 md:gap-8">
            {/* Achievement number with magnetic effect */}
            <div className="achievement-id italic font-bold text-3xl md:text-5xl lg:text-6xl text-white/80 transition-colors duration-300 tracking-tighter">
              {ach.id}<span className="text-[#BFFF00]">.</span>
            </div>
            
            {/* Achievement text */}
            <h2 className="achievement-text italic text-2xl md:text-3xl lg:text-4xl text-white/90 transition-colors duration-300 tracking-tight leading-tight">
              {ach.name}
            </h2>
          </div>
          
          {/* Arrow indicator that appears on hover */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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