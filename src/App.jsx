import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis'; 
import Page1 from './pages/Page1';
import Sidebar from './components/Sidebar';
import SidebarTrigger from './components/SidebarTrigger';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import PreLoader from './components/PreLoader';
import Page6 from './pages/Page6';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState('Page1');
  const [refsReady, setRefsReady] = useState(false);
  
  // Refs
  const lenisRef = useRef(null);
  const appContainerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const cursorTextRef = useRef(null);
  
  // Mouse movement tracker
  const mouseRef = useRef({ x: 0, y: 0 });
  
  // Preloader handling
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      
      // After loading finishes, initialize Lenis with a delay to ensure DOM is ready
      setTimeout(() => {
        initializeLenis();
      }, 200);
    }, 10000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Check if refs are ready after first render
  useEffect(() => {
    if (
      cursorDotRef.current && 
      cursorRingRef.current && 
      cursorTrailRef.current && 
      cursorTextRef.current
    ) {
      setRefsReady(true);
    }
  }, []);

  // Initialize Lenis for smooth scrolling
  const initializeLenis = () => {
    if (lenisRef.current) {
      lenisRef.current.destroy();
    }

    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false, // Disable smooth scrolling on touch devices
      touchMultiplier: 2,
    });

    // Update Lenis on each frame
    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    // Force a layout recalculation
    if (appContainerRef.current) {
      const height = appContainerRef.current.scrollHeight;
      console.log("Total content height:", height);
      
      // Manually call scrollTo(0) to reset scroll position and ensure Lenis is aware of the page
      setTimeout(() => {
        lenisRef.current.scrollTo(0, { immediate: true });
      }, 100);
    }
  };

  // Enhanced cursor and scroll tracking
  useEffect(() => {
    // Only run this effect when refs are ready
    if (!refsReady) return;
    
    // Initialize GSAP context
    const ctx = gsap.context(() => {
      // Set initial states for cursor elements - only if refs are available
      if (cursorDotRef.current && cursorRingRef.current && cursorTrailRef.current) {
        gsap.set([cursorDotRef.current, cursorRingRef.current, cursorTrailRef.current], {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "center center"
        });
      }
      
      // Set up the text element
      if (cursorTextRef.current) {
        gsap.set(cursorTextRef.current, {
          xPercent: -50,
          yPercent: -50,
          y: -40, // Position above the cursor
          opacity: 0
        });
      }
      
      // Add interactive elements for cursor state changes
      const interactiveElements = document.querySelectorAll([
        'a', 'button', '.tech-item', '.nav-link-item',
        '.view-in-3d', '.photo-frame', '.sidebar-trigger',
        'input', 'textarea', '.interactive'
      ].join(','));
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          setCursorVariant("hover");
          
          // Set cursor text based on element attributes or classes
          if (el.hasAttribute('data-cursor-text')) {
            setCursorText(el.getAttribute('data-cursor-text'));
          } else if (el.classList.contains('view-in-3d')) {
            setCursorText("View");
          } else if (el.tagName.toLowerCase() === 'a') {
            setCursorText("Click");
          } else if (el.classList.contains('tech-item')) {
            setCursorText(el.textContent);
          } else if (el.classList.contains('photo-frame')) {
            setCursorText("Explore");
          } else {
            setCursorText("");
          }
        });
        
        el.addEventListener('mouseleave', () => {
          setCursorVariant("default");
          setCursorText("");
        });
        
        // Add magnetic effect to important elements
        if (el.classList.contains('magnetic') || 
            el.classList.contains('view-in-3d') || 
            el.classList.contains('sidebar-trigger')) {
            
          el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            // Calculate center of element
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to center
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;
            
            // Move element slightly toward cursor (magnetic effect)
            gsap.to(el, {
              x: distX * 0.2,
              y: distY * 0.2,
              duration: 0.6,
              ease: "power3.out"
            });
          });
          
          el.addEventListener('mouseleave', () => {
            // Reset position
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.3)"
            });
          });
        }
      });
    });
    
    return () => ctx.revert(); // Clean up animations
  }, [refsReady]);

  // Cursor and scroll tracking
  useEffect(() => {
    let rafId = null;
    let prevTime = 0;
    
    const handleMouseMove = (event) => {
      // Store raw mouse position
      mouseRef.current = { x: event.clientX, y: event.clientY };
      // Set state for components that need it
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };
    
    // Animation loop for smooth cursor updates
    const animateCursor = (time) => {
      // Skip frames if needed for performance
      if (time - prevTime < 16) { // Aim for around 60fps
        rafId = requestAnimationFrame(animateCursor);
        return;
      }
      
      prevTime = time;
      
      // Get current mouse position
      const { x, y } = mouseRef.current;
      
      // Only animate if refs are available
      // Animate cursor dot (fast follower)
      if (cursorDotRef.current) {
        gsap.to(cursorDotRef.current, {
          x, 
          y,
          duration: 0.2,
          ease: "power2.out"
        });
      }
      
      // Animate cursor ring (medium follower)
      if (cursorRingRef.current) {
        gsap.to(cursorRingRef.current, {
          x, 
          y,
          duration: 0.5,
          ease: "power3.out"
        });
      }
      
      // Animate cursor trail (slow follower)
      if (cursorTrailRef.current) {
        gsap.to(cursorTrailRef.current, {
          x, 
          y,
          duration: 0.8,
          ease: "power2.out"
        });
      }
      
      // Animate cursor text
      if (cursorTextRef.current) {
        gsap.to(cursorTextRef.current, {
          x,
          y: y - 40, // Keep above cursor
          duration: 0.4,
          ease: "power2.out"
        });
      }
      
      rafId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Start animation loop
    rafId = requestAnimationFrame(animateCursor);

    // Run once to set initial scroll progress
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [refsReady]);

  // Apply cursor state changes
  useEffect(() => {
    // Only proceed if refs are ready
    if (!refsReady) return;
    
    // Apply different styles based on cursor variant
    const applyCursorVariant = () => {
      switch (cursorVariant) {
        case "hover":
          // Expand and change color when hovering interactive elements
          if (cursorDotRef.current) {
            gsap.to(cursorDotRef.current, {
              scale: 0.5,
              backgroundColor: "white",
              duration: 0.3,
              ease: "power2.out"
            });
          }
          
          if (cursorRingRef.current) {
            gsap.to(cursorRingRef.current, {
              scale: 2,
              borderColor: "#BFFF00",
              borderWidth: 2,
              opacity: 0.7,
              duration: 0.3,
              ease: "power2.out"
            });
          }
          
          if (cursorTrailRef.current) {
            gsap.to(cursorTrailRef.current, {
              opacity: 0.15,
              scale: 3,
              duration: 0.3
            });
          }
          
          // Show text if available
          if (cursorText && cursorTextRef.current) {
            gsap.to(cursorTextRef.current, {
              opacity: 1,
              y: cursorPosition.y - 50, // Move up a bit more
              duration: 0.3
            });
          }
          break;
          
        case "text":
          // Text editing style
          if (cursorDotRef.current) {
            gsap.to(cursorDotRef.current, {
              scale: 0.2,
              opacity: 1,
              duration: 0.3
            });
          }
          
          if (cursorRingRef.current) {
            gsap.to(cursorRingRef.current, {
              scale: 0.8,
              borderWidth: 1,
              opacity: 0.5,
              duration: 0.3
            });
          }
          
          if (cursorTrailRef.current) {
            gsap.to(cursorTrailRef.current, {
              opacity: 0,
              duration: 0.3
            });
          }
          break;
          
        case "default":
        default:
          // Reset to default state
          if (cursorDotRef.current) {
            gsap.to(cursorDotRef.current, {
              scale: 1,
              backgroundColor: "#BFFF00",
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
          
          if (cursorRingRef.current) {
            gsap.to(cursorRingRef.current, {
              scale: 1,
              borderColor: "#BFFF00",
              borderWidth: 1,
              opacity: 0.5,
              duration: 0.3,
              ease: "power2.out"
            });
          }
          
          if (cursorTrailRef.current) {
            gsap.to(cursorTrailRef.current, {
              scale: 1.5,
              opacity: 0.08,
              duration: 0.3
            });
          }
          
          // Hide text
          if (cursorTextRef.current) {
            gsap.to(cursorTextRef.current, {
              opacity: 0,
              duration: 0.3
            });
          }
          break;
      }
    };
    
    applyCursorVariant();
  }, [cursorVariant, cursorText, cursorPosition, refsReady]);

  // Handle window resize - reinitialize Lenis
  useEffect(() => {
    const handleResize = () => {
      // Reinitialize Lenis on resize to account for layout changes
      if (!loading) {
        initializeLenis();
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [loading]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    gsap.to('.sidebar', {
      x: isSidebarVisible ? '-100%' : '0%',
      duration: 0.5,
      ease: 'power2.in'
    });
    gsap.to('.sidebar-trigger', {
      x: isSidebarVisible ? '0%' : '100%',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
    gsap.to('.sidebar', {
      x: '-100%',
      duration: 0.5,
      ease: 'power2.in'
    });
    gsap.to('.sidebar-trigger', {
      x: '0%',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  };

  const handlePageChange = (page) => {
    closeSidebar();
    setCurrentPage(page);
  };

  if (loading) {
    return <PreLoader />;
  }

  return (
    <div 
      ref={appContainerRef}
      className='absolute z-0 w-full min-h-screen bg-[#0B0D0C]'
    >
      <motion.div
        className="scroll-progress"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '5px',
          width: `${scrollProgress}%`,
          backgroundColor: '#BFFF00',
          zIndex: 101
        }}
      />
      <Sidebar isVisible={isSidebarVisible} onClose={closeSidebar} onPageChange={handlePageChange} />
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
      <SidebarTrigger onClick={toggleSidebar} isVisible={isSidebarVisible} />

      {/* Enhanced cursor system */}
      <div ref={cursorRef} className="cursor-container" style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none' }}>
        {/* Main cursor dot */}
        <div
          ref={cursorDotRef}
          className="cursor-dot"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#BFFF00',
            pointerEvents: 'none',
            zIndex: 9999,
            mixBlendMode: 'exclusion',
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Cursor ring */}
        <div
          ref={cursorRingRef}
          className="cursor-ring"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '1px solid #BFFF00',
            pointerEvents: 'none',
            zIndex: 9998,
            opacity: 0.5,
            mixBlendMode: 'exclusion',
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Cursor trail/glow */}
        <div
          ref={cursorTrailRef}
          className="cursor-trail"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#BFFF00',
            filter: 'blur(20px)',
            pointerEvents: 'none',
            zIndex: 9997,
            opacity: 0.08,
            mixBlendMode: 'screen',
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Cursor text */}
        <div
          ref={cursorTextRef}
          className="cursor-text"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            fontSize: '12px',
            fontWeight: '600',
            color: 'white',
            padding: '4px 8px',
            background: 'rgba(11, 13, 12, 0.7)',
            borderRadius: '4px',
            pointerEvents: 'none',
            zIndex: 10000,
            opacity: 0,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {cursorText}
        </div>
      </div>
    </div>
  );
};

export default App;