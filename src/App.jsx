import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Page1 from './pages/Page1';
import Sidebar from './components/Sidebar';
import SidebarTrigger from './components/SidebarTrigger';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';

const App = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
  }, [cursorPosition]);

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

  // Function to toggle sidebar visibility
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

  // Function to close the sidebar
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

  return (
    <div className='w-full min-h-screen bg-[#0B0D0C]'>
      {/* Scroll Progress Bar */}
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
      <Sidebar isVisible={isSidebarVisible} onClose={closeSidebar} />
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <SidebarTrigger onClick={toggleSidebar} isVisible={isSidebarVisible} />

      {/* The Custom Cursor */}
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
  )
}

export default App;