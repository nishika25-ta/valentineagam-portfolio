import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;

            setScrollProgress(progress);
            setIsVisible(scrollTop > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 50 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        cursor: 'pointer',
                        zIndex: 99,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {/* Progress Ring */}
                    <svg
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            transform: 'rotate(-90deg)',
                        }}
                    >
                        <circle
                            cx="28"
                            cy="28"
                            r="26"
                            fill="none"
                            stroke="var(--border)"
                            strokeWidth="2"
                        />
                        <motion.circle
                            cx="28"
                            cy="28"
                            r="26"
                            fill="none"
                            stroke="url(#progress-gradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={163.36}
                            strokeDashoffset={163.36 - (163.36 * scrollProgress) / 100}
                        />
                        <defs>
                            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--accent)" />
                                <stop offset="100%" stopColor="var(--accent-secondary)" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Arrow */}
                    <motion.svg
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--text-primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ position: 'relative', zIndex: 1 }}
                    >
                        <polyline points="18 15 12 9 6 15" />
                    </motion.svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
