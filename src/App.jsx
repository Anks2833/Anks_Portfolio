import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Page1 from './pages/Page1';

const App = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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

  return (
    <div className='w-full min-h-screen bg-[#0B0D0C]'>
      
      <Page1 />

      {/* The Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0, 
          width: '3vw',
          height: '3vw',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: '2px solid white',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

export default App;