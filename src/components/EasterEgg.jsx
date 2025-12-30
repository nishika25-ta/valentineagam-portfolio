import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EasterEgg = () => {
    const [activated, setActivated] = useState(false);
    const [keys, setKeys] = useState([]);

    // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeys((prev) => {
                const newKeys = [...prev, e.code].slice(-10);

                if (JSON.stringify(newKeys) === JSON.stringify(konamiCode)) {
                    setActivated(true);
                    setTimeout(() => setActivated(false), 5000);
                }

                return newKeys;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <AnimatePresence>
            {activated && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Confetti particles */}
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: 0,
                                y: 0,
                                scale: 0,
                                rotate: 0,
                            }}
                            animate={{
                                x: (Math.random() - 0.5) * window.innerWidth,
                                y: (Math.random() - 0.5) * window.innerHeight,
                                scale: [0, 1, 0],
                                rotate: Math.random() * 720,
                            }}
                            transition={{
                                duration: 3,
                                ease: 'easeOut',
                            }}
                            style={{
                                position: 'absolute',
                                width: 10 + Math.random() * 10,
                                height: 10 + Math.random() * 10,
                                background: [
                                    '#6366f1',
                                    '#8b5cf6',
                                    '#a855f7',
                                    '#22c55e',
                                    '#f59e0b',
                                    '#ef4444',
                                ][Math.floor(Math.random() * 6)],
                                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                            }}
                        />
                    ))}

                    {/* Message */}
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', damping: 15 }}
                        style={{
                            background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                            padding: '2rem 3rem',
                            borderRadius: 'var(--radius-xl)',
                            boxShadow: '0 0 100px var(--accent-glow)',
                            textAlign: 'center',
                        }}
                    >
                        <motion.p
                            animate={{ rotate: [0, -5, 5, -5, 0] }}
                            transition={{ duration: 0.5, repeat: 3 }}
                            style={{
                                fontSize: '3rem',
                                marginBottom: '0.5rem',
                            }}
                        >
                            🎉
                        </motion.p>
                        <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                            You found it!
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                            Thanks for exploring! You're awesome! 🚀
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EasterEgg;
