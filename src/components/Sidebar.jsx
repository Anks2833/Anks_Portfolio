import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import SidebarLinks from "./SidebarLinks";
import { handleMouseEnter, handleMouseLeave } from "../utils/CursorEffects";
import Lenis from "@studio-freight/lenis";
import '../styles/Sidebar.css';

const Sidebar = ({ isVisible, onClose }) => {
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const videoContainerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const linksContainerRef = useRef(null);
  const linkRefs = useRef([]);
  const sidebarContainerRef = useRef(null);
  const videoRef = useRef(null);
  const lenisRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const navLinks = [
    { id: "01", name: "Home", scrollTop: "0" },
    { id: "02", name: "About", scrollTop: "800" },
    { id: "03", name: "Achievements", scrollTop: "1600" },
    { id: "04", name: "Projects", scrollTop: "2350" },
    { id: "05", name: "Contact Me", scrollTop: "3200" },
  ];
  
  // Initialize Lenis for smooth scrolling when sidebar closes
  useEffect(() => {
    if (!isVisible) {
      // Initialize Lenis
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });
      
      // Connect Lenis to RAF
      function raf(time) {
        if (lenisRef.current) {
          lenisRef.current.raf(time);
          requestAnimationFrame(raf);
        }
      }
      
      requestAnimationFrame(raf);
      
      return () => {
        if (lenisRef.current) {
          lenisRef.current.destroy();
        }
      };
    } else {
      // Destroy Lenis when sidebar is visible to prevent conflicts
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    }
  }, [isVisible]);
  
  // Control body scrolling when sidebar is active
  useEffect(() => {
    const body = document.body;
    const originalStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      width: body.style.width,
      height: body.style.height,
      top: body.style.top,
    };
    
    if (isVisible) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling and fix the body in place
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.width = '100%';
      body.style.height = '100%';
      body.style.top = `-${scrollY}px`;
      
      // Video handling with high quality settings
      if (videoRef.current) {
        // Reset video position to start
        videoRef.current.currentTime = 0;
        
        // Set quality attributes
        videoRef.current.setAttribute('playsinline', '');
        videoRef.current.setAttribute('muted', '');
        
        // Attempt to set highest quality where supported
        if (videoRef.current.canPlayType) {
          videoRef.current.play().catch(e => console.log('Video play prevented:', e));
        }
      }
    } else {
      // Restore scrolling when sidebar is closed
      const scrollY = parseInt(body.style.top || '0', 10) * -1;
      
      // Restore original body styles
      Object.entries(originalStyle).forEach(([key, value]) => {
        body.style[key] = value;
      });
      
      // Restore scroll position
      window.scrollTo(0, scrollY);
      
      // Pause video when sidebar closes
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    
    return () => {
      // Clean up: ensure body styles are restored on unmount
      if (isVisible) {
        const scrollY = parseInt(body.style.top || '0', 10) * -1;
        
        Object.entries(originalStyle).forEach(([key, value]) => {
          body.style[key] = value;
        });
        
        window.scrollTo(0, scrollY);
      }
    };
  }, [isVisible]);

  // Setup and cleanup animations
  useEffect(() => {
    // Reset link refs array
    linkRefs.current = [];

    // Initialize animation context
    const ctx = gsap.context(() => {
      if (isVisible) {
        // Create a timeline for the opening animation
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Video container animation - ensure it covers everything
        tl.fromTo(
          videoContainerRef.current,
          {
            opacity: 0
          },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0
        );

        // Solid background overlay animation (for backup behind video)
        tl.to(
          overlayRef.current,
          {
            opacity: 1, // Fully opaque
            duration: 0.4,
            ease: "power2.inOut",
          },
          0
        );

        // Main panel slide in
        tl.fromTo(
          sidebarRef.current,
          { xPercent: -100 },
          { xPercent: 0, duration: 0.8 },
          0
        );

        // Close button animation
        tl.fromTo(
          closeButtonRef.current,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          0.6
        );

        // Staggered links animation with enhanced effects
        tl.fromTo(
          linkRefs.current,
          {
            y: 50,
            opacity: 0,
            skewY: 10,
          },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
          },
          0.3
        );
        
        // Letter animation for links
        linkRefs.current.forEach((link, idx) => {
          const chars = link.querySelectorAll('.inline-block');
          if (chars.length) {
            gsap.fromTo(
              chars,
              { 
                y: 40,
                opacity: 0,
                rotateX: 30
              },
              {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.02,
                duration: 0.8,
                delay: 0.3 + (idx * 0.05),
                ease: "power2.out"
              }
            );
          }
        });
      }
    });

    return () => ctx.revert();
  }, [isVisible]);

  // Handle link hover animation
  const handleLinkHover = (index, isEntering) => {
    if (!linkRefs.current[index]) return;
    
    const linkText = linkRefs.current[index].querySelector(".link-text");
    const linkId = linkRefs.current[index].querySelector(".link-id");
    const linkLine = linkRefs.current[index].querySelector(".link-line");
    
    if (linkText && linkId && linkLine) {
      gsap.to(linkText, {
        color: isEntering ? "#BFFF00" : "#9ca3af",
        fontStyle: isEntering ? "italic" : "normal",
        x: isEntering ? 10 : 0,
        duration: 0.3,
      });

      gsap.to(linkId, {
        color: isEntering ? "#BFFF00" : "#9ca3af",
        y: isEntering ? -5 : 0,
        duration: 0.3,
      });

      gsap.to(linkLine, {
        width: isEntering ? "100%" : "100%",
        backgroundColor: isEntering ? "#BFFF00" : "#ffffff",
        duration: 0.3,
      });
    }

    // Enhanced ripple effect on the background
    if (isEntering) {
      const link = linkRefs.current[index];
      const rect = link.getBoundingClientRect();

      // Create multiple ripples for a more dynamic effect
      for (let i = 0; i < 3; i++) {
        const delay = i * 0.2;
        const scale = 0.7 + (i * 0.3);
        
        gsap.fromTo(
          ".sidebar-bg-ripple" + (i === 0 ? "" : `-${i}`),
          {
            left: rect.left + rect.width / 2,
            top: rect.top + rect.height / 2,
            width: 0,
            height: 0,
            opacity: 0.15 - (i * 0.03),
          },
          {
            width: window.innerWidth * 0.5 * scale,
            height: window.innerHeight * 0.15 * scale,
            opacity: 0,
            duration: 0.8 + (i * 0.2),
            delay: delay,
          }
        );
      }
      
      // Enhanced video effect on hover (more subtle with color shift)
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          filter: "hue-rotate(15deg) brightness(1.1)",
          duration: 0.5,
        });
      }
    } else {
      // Reset video effect
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          filter: "none",
          duration: 0.5,
        });
      }
    }
  };

  // Handle video load event
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    
    // Animate video opacity once loaded
    gsap.to(videoRef.current, {
      opacity: 1,
      duration: 0.5
    });
  };

  // Animation variants for motion components
  const pageTransition = {
    initial: { filter: "blur(8px)", opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.5 } },
    exit: { filter: "blur(8px)", opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      ref={sidebarContainerRef}
      className={`sidebar fixed inset-0 z-[999] ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      variants={pageTransition}
      initial="initial"
      animate={isVisible ? "animate" : "exit"}
    >
      {/* Solid background overlay (for fallback) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1000]"
        style={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Video container with full-coverage */}
      <div 
        ref={videoContainerRef}
        className="absolute inset-0 overflow-hidden z-[1001]"
        style={{ opacity: 0 }}
      >
        {/* Black background for video to ensure no transparency */}
        <div className="absolute inset-0 z-[1001]"></div>
        
        {/* High-quality video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-[1002]"
          src="https://res.cloudinary.com/ddiqakvn0/video/upload/v1742292265/Videos/Portfolio/mhudadwn7osl5kpfalmp.mp4"
          muted
          playsInline
          loop
          preload="auto"
          style={{ 
            objectFit: "cover",
            width: "100%",
            height: "100%"
          }}
          onLoadedData={handleVideoLoaded}
        />
        
        {/* Dark gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-zinc-950/20 z-[1003]"></div>
      </div>

      {/* Ripple effect containers for link hover */}
      <div className="sidebar-bg-ripple absolute rounded-full bg-[#BFFF00] opacity-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1005]" />
      <div className="sidebar-bg-ripple-1 absolute rounded-full bg-[#BFFF00] opacity-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1005]" />
      <div className="sidebar-bg-ripple-2 absolute rounded-full bg-[#BFFF00] opacity-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1005]" />

      {/* Main sidebar container */}
      <div
        ref={sidebarRef}
        className="sidebar-main-container z-[1006]"
      >
        {/* Social links column */}
        <div className="sidebar-social-links">
          <SidebarLinks isVisible={isVisible} />
        </div>

        {/* Dark background column */}
        <div className="sidebar-dark-column"></div>

        {/* Close button */}
        <div className="sidebar-close-button">
          <button
            ref={closeButtonRef}
            className="close-button-inner"
            onClick={onClose}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="close-button-bg" />
            <AiOutlineClose className="close-button-icon" />
          </button>
        </div>

        {/* Navigation links */}
        <div
          ref={linksContainerRef}
          className="sidebar-nav-links"
        >
          {navLinks.map((nav, index) => (
            <div
              key={nav.id}
              ref={(el) => (linkRefs.current[index] = el)}
              className="nav-link-item"
              onMouseEnter={() => {
                handleLinkHover(index, true);
                handleMouseEnter();
              }}
              onMouseLeave={() => {
                handleLinkHover(index, false);
                handleMouseLeave();
              }}
              onClick={() => {
                // Create a click animation effect
                gsap.to(linkRefs.current[index], {
                  scale: 0.95,
                  duration: 0.1,
                  onComplete: () => {
                    gsap.to(linkRefs.current[index], {
                      scale: 1,
                      duration: 0.2,
                      onComplete: () => {
                        // Smooth scroll to section with Lenis when initialized
                        if (lenisRef.current) {
                          lenisRef.current.scrollTo(parseInt(nav.scrollTop));
                        } else {
                          window.scrollTo({
                            top: parseInt(nav.scrollTop),
                            behavior: "smooth",
                          });
                        }
                        onClose();
                      },
                    });
                  },
                });
              }}
            >
              <div className="nav-link-content">
                <h1 className="link-text exo-2-bold font-semibold text-zinc-300 transition-all duration-300">
                  {nav.name.split("").map((char, i) => (
                    <span
                      key={i}
                      className="inline-block hover:text-[#BFFF00] transition-colors"
                      style={{
                        transitionDelay: `${i * 30}ms`,
                        transform: "translateY(0)",
                        display: "inline-block",
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
                <h1 className="link-id grechen-fuemen-regular text-zinc-300 transition-all duration-300">
                  {nav.id}
                </h1>
              </div>

              {/* Animated underline */}
              <div className="link-line"></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;