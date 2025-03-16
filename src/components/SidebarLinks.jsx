import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { handleMouseEnter, handleMouseLeave } from '../utils/CursorEffects';
import { BsArrowDownRight } from "react-icons/bs";
import '../styles/SidebarLinks.css'; // Import the CSS file we'll create

const SidebarLinks = ({ isVisible }) => {
    const linksRef = useRef([]);

    const socialData = [
        { id: "1", name: "LINKEDIN", icon: <BsArrowDownRight />, link: "https://www.linkedin.com/in/ankur-dubey-025812217" },
        { id: "2", name: "INSTAGRAM", icon: <BsArrowDownRight />, link: "https://www.instagram.com/_ankur._.dubey_/" },
        { id: "3", name: "GITHUB", icon: <BsArrowDownRight />, link: "https://github.com/Anks2833" },
    ];

    // Animation effect when sidebar opens
    useEffect(() => {
        if (!isVisible) return;
        
        // Reset links ref array
        linksRef.current = [];
        
        // Create animation for links appearance
        const ctx = gsap.context(() => {
            gsap.fromTo(linksRef.current, 
                { x: -20, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    duration: 0.5, 
                    stagger: 0.1, 
                    delay: 0.3,
                    ease: "power2.out" 
                }
            );
        });
        
        return () => ctx.revert();
    }, [isVisible]);

    return (
        <div className="sidebar-links-container">
            {socialData.map((item, index) => (
                <NavLink
                    to={`${item.link}`}
                    target='_blank'
                    key={item.id}
                    ref={el => linksRef.current[index] = el}
                    className='social-link hover:z-[1]'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className='link-name'>{item.name}</span>
                    <div className="link-icon">{item.icon}</div>
                </NavLink>
            ))}
        </div>
    );
};

export default SidebarLinks;