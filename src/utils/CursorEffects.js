import {gsap} from 'gsap';

export const handleMouseEnter = () => {

    gsap.to('.custom-cursor', {
        scale: 2,
        backgroundColor: 'white',
        duration: 0.3,
        ease: 'power2.out',
    });
};

export const handleMouseEnterBig = () => {
    gsap.to('.custom-cursor', {
        scale: 6,
        backgroundColor: 'white',
        duration: 0.3,
        ease: 'power2.out',
    });
};

export const handleMouseLeave = () => {
    gsap.to('.custom-cursor', {
        scale: 1,
        backgroundColor: '#BFFF00',
        duration: 0.3,
        ease: 'power2.out',
    });
};

export const handleCursorChangeStyle = () =>{
    gsap.to('.custom-cursor', {
        scale: 6,
        backgroundColor: '#fff',
        duration: 0.3,
        ease: 'power2.out',
    });
}