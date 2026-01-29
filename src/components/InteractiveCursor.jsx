import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState('');
    const [cursorVariant, setCursorVariant] = useState('default');

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        let rafId = null;
        let lastX = 0;
        let lastY = 0;
        
        const moveCursor = (e) => {
            // Throttle with requestAnimationFrame
            if (rafId === null) {
                rafId = requestAnimationFrame(() => {
                    mouseX.set(e.clientX);
                    mouseY.set(e.clientY);
                    lastX = e.clientX;
                    lastY = e.clientY;
                    rafId = null;
                });
            }
        };

        let hoverTimeout;
        const handleMouseOver = (e) => {
            const target = e.target;

            // Debounce hover state changes
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                // Check for interactive elements
                if (target.tagName === 'A' || target.tagName === 'BUTTON' ||
                    target.closest('a') || target.closest('button') ||
                    target.classList.contains('card') || target.closest('.card') ||
                    target.dataset.cursor) {
                    setIsHovering(true);
                    setCursorVariant('hover');

                    // Custom cursor text
                    if (target.dataset.cursorText) {
                        setHoverText(target.dataset.cursorText);
                    } else if (target.tagName === 'A' || target.closest('a')) {
                        setHoverText('View');
                    } else if (target.tagName === 'BUTTON' || target.closest('button')) {
                        setHoverText('Click');
                    } else {
                        setHoverText('');
                    }
                } else {
                    setIsHovering(false);
                    setCursorVariant('default');
                    setHoverText('');
                }
            }, 10);
        };

        window.addEventListener('mousemove', moveCursor, { passive: true });
        document.addEventListener('mouseover', handleMouseOver, { passive: true });

        return () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            clearTimeout(hoverTimeout);
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    // Hide on mobile/touch devices
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Main cursor ring */}
            <motion.div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    left: cursorX,
                    top: cursorY,
                    pointerEvents: 'none',
                    zIndex: 99999,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 80 : 40,
                        height: isHovering ? 80 : 40,
                        backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                        borderColor: isHovering ? 'rgba(139, 92, 246, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                        scale: isHovering ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: '1.5px solid rgba(255, 255, 255, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: isHovering ? 'blur(4px)' : 'none',
                    }}
                >
                    {/* Hover text */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: hoverText ? 1 : 0,
                            scale: hoverText ? 1 : 0.5
                        }}
                        style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: '#fff',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontFamily: '"Geist", sans-serif',
                        }}
                    >
                        {hoverText}
                    </motion.span>
                </motion.div>
            </motion.div>

            {/* Center dot */}
            <motion.div
                ref={cursorDotRef}
                style={{
                    position: 'fixed',
                    left: cursorX,
                    top: cursorY,
                    pointerEvents: 'none',
                    zIndex: 99999,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 0 : 1,
                        opacity: isHovering ? 0 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        boxShadow: '0 0 10px rgba(99, 102, 241, 0.8)',
                    }}
                />
            </motion.div>

            {/* Hide default cursor */}
            <style>{`
                * {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
};

export default InteractiveCursor;
