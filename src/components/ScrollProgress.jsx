import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = Math.min((scrollTop / docHeight) * 100, 100);
                    setScrollProgress(progress);
                    setIsVisible(scrollTop > 100);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Progress Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    zIndex: 9999,
                    background: 'rgba(0, 0, 0, 0.3)',
                }}
            >
                <motion.div
                    style={{
                        height: '100%',
                        width: `${scrollProgress}%`,
                        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #c084fc)',
                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)',
                        transition: 'width 0.1s ease-out',
                    }}
                />
            </motion.div>

            {/* Side Progress Indicator */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'fixed',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 9998,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                {/* Progress Track */}
                <div
                    style={{
                        width: '4px',
                        height: '120px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <motion.div
                        style={{
                            width: '100%',
                            height: `${scrollProgress}%`,
                            background: 'linear-gradient(180deg, #6366f1, #8b5cf6)',
                            borderRadius: '4px',
                            boxShadow: '0 0 10px rgba(99, 102, 241, 0.6)',
                        }}
                    />
                </div>

                {/* Percentage */}
                <motion.span
                    style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: 'var(--accent)',
                        fontFamily: '"Geist", sans-serif',
                        letterSpacing: '0.5px',
                    }}
                >
                    {Math.round(scrollProgress)}%
                </motion.span>
            </motion.div>
        </>
    );
};

export default ScrollProgress;
