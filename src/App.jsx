import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Page1 from './pages/Page1';
import Sidebar from './components/Sidebar';
import SidebarTrigger from './components/SidebarTrigger';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import PreLoader from './components/PreLoader';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState('Page1');
  const scrollProgressRef = useRef(null);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      console.log(`Scroll X: ${window.scrollX}, Scroll Y: ${window.scrollY}`);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div className='w-full min-h-screen bg-[#0B0D0C]'>
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
      <SidebarTrigger onClick={toggleSidebar} isVisible={isSidebarVisible} />

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

      <div
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
      />
    </div>
  );
};

export default App;