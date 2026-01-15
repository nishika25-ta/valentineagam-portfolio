import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PreloaderAdvanced = () => {
    const [isAnimating, setIsAnimating] = useState(true);
    const txtRef = useRef(null);
    const textContent = "Valentine Agam";

    useEffect(() => {
        const animateText = () => {
            if (txtRef.current) {
                txtRef.current.innerHTML = "";

                textContent.split("").forEach((char, index) => {
                    const span = document.createElement("span");
                    span.textContent = char;
                    span.style.animationDelay = `${index * 0.1}s`;
                    span.style.display = char === " " ? "inline-block" : "inline";
                    span.className = "animated-char";
                    txtRef.current.appendChild(span);
                });
            }
        };

        animateText();

        // Hide preloader after animation completes
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, textContent.length * 100 + 1000); // Animation duration + 1 second

        return () => clearTimeout(timer);
    }, []);

    if (!isAnimating) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
                position: 'fixed',
                inset: 0,
                background: '#000',
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Animated Text */}
            <div
                ref={txtRef}
                className="txt"
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    color: '#eee',
                    fontSize: 'clamp(2rem, 6vw, 4rem)',
                    fontFamily: '"Crimson Text", serif',
                    cursor: 'default',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                }}
            />

            {/* Subtitle */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: textContent.length * 0.1 + 0.5, duration: 0.8 }}
                style={{
                    marginTop: '2rem',
                    fontSize: '0.9rem',
                    color: 'rgba(238, 238, 238, 0.6)',
                    fontFamily: '"Crimson Text", serif',
                    fontStyle: 'italic',
                }}
            >
                Simplicity is the ultimate sophistication
            </motion.div>

            {/* CSS for character animation */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap');

                .animated-char {
                    white-space: pre;
                    opacity: 0;
                    transform: translate(-2px, 4px) scale(0.9);
                    filter: blur(6px);
                    animation: fadeIn 0.5s ease-out forwards;
                }
                
                @keyframes fadeIn {
                    to {
                        opacity: 1;
                        transform: translate(0, 0) scale(1);
                        filter: blur(0);
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default PreloaderAdvanced;
