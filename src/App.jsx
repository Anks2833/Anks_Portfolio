import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Page1 from './pages/Page1';
import Sidebar from './components/Sidebar';
import SidebarTrigger from './components/SidebarTrigger';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

const App = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
      <Sidebar isVisible={isSidebarVisible} onClose={closeSidebar} />
      <Page1 />
      <Page2 />
      <Page3 />
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
          backgroundColor: 'lime',
          // border: '2px solid lime',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

export default App;