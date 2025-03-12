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
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState('Page1');
  const lenisRef = useRef(null);
  const appContainerRef = useRef(null);

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

  // Cursor and scroll tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Run once to set initial scroll progress
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update cursor position with GSAP
  useEffect(() => {
    gsap.to('.custom-cursor', {
      x: cursorPosition.x,
      y: cursorPosition.y,
      duration: 0.8,
      ease: 'power2.out'
    });
    gsap.to('.large-cursor', {
      x: cursorPosition.x,
      y: cursorPosition.y,
      duration: 0.8,
      ease: 'power2.out'
    });
  }, [cursorPosition]);

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

      {/* The small cursor */}
      <div
        className="custom-cursor"
        style={{
          position: 'fixed',
          zIndex: '100',
          top: 0,
          left: 0,
          width: '1vw',
          height: '1vw',
          borderRadius: '50%',
          backgroundColor: '#BFFF00',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* The blurred cursor */}
      {/* <div
        className="large-cursor"
        style={{
          position: 'fixed',
          zIndex: '99',
          top: 0,
          left: 0,
          width: '10vw',
          height: '10vw',
          filter: 'blur(80px)',
          borderRadius: '50%',
          backgroundColor: '#BFFF00',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%) translate(2vw, 2vw)',
        }}
      /> */}
    </div>
  );
};

export default App;