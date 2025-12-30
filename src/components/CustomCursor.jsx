import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = '1';
            }
        };

        const handleMouseLeave = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = '0';
            }
        };

        // Add hover effect for interactive elements
        const addHoverEffect = () => {
            const interactiveElements = document.querySelectorAll('a, button, .card');
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', () => {
                    if (cursorRef.current) {
                        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
                        cursorRef.current.style.background = 'rgba(99, 102, 241, 0.2)';
                        cursorRef.current.style.borderColor = 'var(--accent)';
                    }
                });
                el.addEventListener('mouseleave', () => {
                    if (cursorRef.current) {
                        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
                        cursorRef.current.style.background = 'transparent';
                        cursorRef.current.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        // Delay to ensure DOM is ready
        setTimeout(addHoverEffect, 1000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Main cursor ring */}
            <motion.div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'transparent',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
                }}
            />
            {/* Center dot */}
            <motion.div
                ref={cursorDotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </>
    );
};

export default CustomCursor;
