import { useState, useEffect, useRef } from 'react';
import { initialFX } from './utils/initialFX';

const Loading = ({ percent }) => {
    const containerRef = useRef(null);
    const [isComplete, setIsComplete] = useState(false);
    const [shouldExit, setShouldExit] = useState(false);

    const fullName = "Valentine Agam";

    // Animate text character by character - optimized with batch DOM update
    useEffect(() => {
        if (containerRef.current) {
            // Clear any existing content to prevent duplication on re-renders
            containerRef.current.innerHTML = '';

            // Create all elements in a document fragment (batch DOM update)
            const fragment = document.createDocumentFragment();

            fullName.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'splash-char';
                span.style.animationDelay = `${index * 0.08}s`;
                if (char === ' ') {
                    span.style.width = '0.3em';
                }
                fragment.appendChild(span);
            });

            // Single DOM update
            containerRef.current.appendChild(fragment);
        }
    }, []);

    // Handle exit when loading is complete
    useEffect(() => {
        if (percent >= 100 && !isComplete) {
            // Wait for text animation to complete (14 chars * 0.08s + 0.4s animation = ~1.5s)
            setTimeout(() => {
                setIsComplete(true);
                setTimeout(() => {
                    setShouldExit(true);
                    initialFX();
                }, 600);
            }, 1500);
        }
    }, [percent, isComplete]);

    if (shouldExit) {
        return null;
    }

    return (
        <div
            className={`splash-screen ${isComplete ? 'fade-out' : ''}`}
        >
            <div
                ref={containerRef}
                className="splash-text"
            />

            <style>{`
                .splash-screen {
                    position: fixed;
                    inset: 0;
                    background: #000;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: "Crimson Text", serif;
                    opacity: 1;
                    transition: opacity 0.6s ease-out;
                    /* Hardware acceleration */
                    will-change: opacity;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }

                .splash-screen.fade-out {
                    opacity: 0;
                }

                .splash-text {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 0;
                    color: #eee;
                    font-size: clamp(24px, 5vw, 42px);
                    font-weight: 400;
                    letter-spacing: 3px;
                    /* Hardware acceleration */
                    will-change: auto;
                    transform: translateZ(0);
                }

                .splash-char {
                    display: inline-block;
                    opacity: 0;
                    transform: translate3d(0, 8px, 0) scale(0.92);
                    animation: splashFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    /* Hardware acceleration */
                    will-change: transform, opacity;
                    backface-visibility: hidden;
                }

                @keyframes splashFadeIn {
                    0% {
                        opacity: 0;
                        transform: translate3d(0, 8px, 0) scale(0.92);
                    }
                    100% {
                        opacity: 1;
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                }

                /* Remove will-change after animation completes */
                .splash-char {
                    animation-fill-mode: forwards;
                }
            `}</style>
        </div>
    );
};

export default Loading;
