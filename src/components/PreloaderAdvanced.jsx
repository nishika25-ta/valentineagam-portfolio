import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PreloaderAdvanced = () => {
    const [progress, setProgress] = useState(0);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setShowContent(true), 300);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'linear-gradient(135deg, #0A0E27 0%, #151B3D 100%)',
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Animated Background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--gradient-mesh)',
                    opacity: 0.4,
                    animation: 'mesh-shift 10s ease-in-out infinite',
                }}
            />

            <div style={{ textAlign: 'center', zIndex: 1, maxWidth: '600px', padding: '2rem' }}>
                {/* Logo/Name */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1
                        className="gradient-text"
                        style={{
                            fontSize: 'clamp(2rem, 6vw, 4rem)',
                            marginBottom: '2rem',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Valentine Agam
                    </h1>
                </motion.div>

                {/* Progress Bar */}
                <div
                    style={{
                        width: '100%',
                        height: '4px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                        marginBottom: '1rem',
                    }}
                >
                    <motion.div
                        style={{
                            height: '100%',
                            background: 'var(--gradient-purple-cyan)',
                            borderRadius: 'var(--radius-full)',
                            boxShadow: 'var(--glow-cyan)',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>

                {/* Progress Text */}
                <motion.div
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1rem',
                        color: 'var(--color-cyan-primary)',
                        marginBottom: '0.5rem',
                    }}
                >
                    {progress}%
                </motion.div>

                {showContent && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.9rem',
                        }}
                    >
                        Initializing portfolio...
                    </motion.div>
                )}
            </div>

            {/* Floating Orbs */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'float 8s ease-in-out infinite',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'float 10s ease-in-out infinite reverse',
                }}
            />
        </motion.div>
    );
};

export default PreloaderAdvanced;
