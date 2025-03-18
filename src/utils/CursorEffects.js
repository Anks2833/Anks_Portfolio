import { gsap } from 'gsap';

export const handleMouseEnter = (text = "") => {
  // Animate the dot (center)
  gsap.to('.cursor-dot', {
    scale: 0.5,
    backgroundColor: 'white',
    duration: 0.3,
    ease: 'power2.out',
  });
  
  // Animate the ring
  gsap.to('.cursor-ring', {
    scale: 2,
    borderColor: 'white',
    borderWidth: 2,
    opacity: 0.7,
    duration: 0.3,
    ease: 'power2.out',
  });
  
  // Animate the trail/glow
  gsap.to('.cursor-trail', {
    opacity: 0.15,
    scale: 10,
    duration: 0.3
  });
};

// Larger hover effect for prominent elements
export const handleMouseEnterBig = (text = "") => {
  gsap.to('.cursor-dot', {
    scale: 1.5,
    backgroundColor: 'white',
    duration: 0.3,
    ease: 'power2.out',
  });
  
  gsap.to('.cursor-ring', {
    scale: 5,
    borderColor: 'white',
    duration: 0.3,
    ease: 'power2.out',
  });
  
  gsap.to('.cursor-trail', {
    opacity: 0.2,
    scale: 10,
    duration: 0.4,
    ease: 'power1.out'
  });
};

// Unique style for specific interactive elements (flashing effect)
export const handleCursorChangeStyle = (text = "") => {
  gsap.timeline({repeat: 1, yoyo: true})
    .to('.cursor-dot', {
      scale: 0.2,
      backgroundColor: '#BFFF00',
      duration: 0.3,
      ease: 'power2.inOut',
    })
    .to('.cursor-ring', {
      scale: 4,
      borderWidth: 3,
      borderColor: 'white',
      opacity: 0.7,
      duration: 0.3,
      ease: 'power2.inOut',
    }, 0)
    .to('.cursor-trail', {
      opacity: 0.3,
      scale: 7,
      duration: 0.5,
      ease: 'power1.inOut'
    }, 0);
};

// Reset cursor to default state
export const handleMouseLeave = () => {
  // Reset the dot
  gsap.to('.cursor-dot', {
    scale: 1,
    backgroundColor: '#BFFF00',
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out',
  });
  
  // Reset the ring
  gsap.to('.cursor-ring', {
    scale: 1,
    borderColor: '#BFFF00',
    borderWidth: 1,
    opacity: 0.5,
    duration: 0.3,
    ease: 'power2.out',
  });
  
  // Reset the trail
  gsap.to('.cursor-trail', {
    scale: 1.5,
    opacity: 0.08,
    duration: 0.3
  });
};

// Special effect for view-in-3D links
export const handleView3DEnter = () => {
  handleMouseEnterBig("View");
  
  // Add extra sparkle effect
  gsap.to('.cursor-ring', {
    borderColor: 'white',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
    duration: 0.3
  });
};

// Interactive element with reveal text (pass custom text to show)
export const handleRevealTextEnter = (text) => {
  handleMouseEnter(text);
};

// Draggable element cursor style
export const handleDraggableEnter = () => {
  // Animate the dot (center)
  gsap.to('.cursor-dot', {
    scale: 0.8,
    backgroundColor: 'white',
    duration: 0.3,
    ease: 'power2.out',
  });
  
  // Animate the ring to look like a grab icon
  gsap.to('.cursor-ring', {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    borderStyle: 'dashed',
    borderWidth: 2,
    opacity: 0.8,
    duration: 0.3
  });
  
  // Show "Drag" text
  gsap.to('.cursor-text', {
    opacity: 1,
    y: '-50px',
    duration: 0.3,
    onStart: () => {
      const textEl = document.querySelector('.cursor-text');
      if (textEl) {
        textEl.textContent = "Drag";
      }
    }
  });
};

// Button hover style
export const handleButtonEnter = (text = "Click") => {
  // Animate the dot (center)
  gsap.to('.cursor-dot', {
    scale: 0.5,
    backgroundColor: 'white',
    duration: 0.3,
    ease: 'power2.out',
  });
  
  // Animate the ring
  gsap.to('.cursor-ring', {
    scale: 1.5,
    borderColor: '#BFFF00',
    backgroundColor: 'rgba(191, 255, 0, 0.1)',
    opacity: 0.7,
    duration: 0.3,
    ease: 'power2.out',
  });
};

export const handleOldCursorEnter = () => {
  gsap.to('.custom-cursor', {
    scale: 2,
    backgroundColor: 'white',
    duration: 0.3,
    ease: 'power2.out',
  });
};

export const handleOldCursorEnterBig = () => {
  gsap.to('.custom-cursor', {
    scale: 6,
    backgroundColor: 'white',
    duration: 0.3,
    ease: 'power2.out',
  });
};

export const handleOldCursorLeave = () => {
  gsap.to('.custom-cursor', {
    scale: 1,
    backgroundColor: '#BFFF00',
    duration: 0.3,
    ease: 'power2.out',
  });
};