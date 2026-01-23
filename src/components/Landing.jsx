import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./styles/Landing.css";

const AnimatedText = ({ text, className }) => {
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            textRef.current.innerHTML = '';
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.animationDelay = `${index * 0.08}s`;
                span.style.display = char === ' ' ? 'inline-block' : 'inline';
                span.className = 'animated-char';
                textRef.current.appendChild(span);
            });
        }
    }, [text]);

    return <span ref={textRef} className={`animated-text ${className || ''}`}></span>;
};

const Landing = ({ children }) => {
    const [roleText, setRoleText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const roles = ['UI/UX Designer', 'Data Analyst', 'Software Developer', 'Full-Stack Developer'];

    useEffect(() => {
        const currentWord = roles[wordIndex];
        const shouldDelete = !isDeleting && roleText === currentWord;
        const shouldSwitch = isDeleting && roleText === '';

        if (shouldSwitch) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        if (shouldDelete) {
            setTimeout(() => setIsDeleting(true), 2000);
            return;
        }

        const timeout = setTimeout(
            () => {
                setRoleText(
                    isDeleting
                        ? currentWord.substring(0, roleText.length - 1)
                        : currentWord.substring(0, roleText.length + 1)
                );
            },
            isDeleting ? 75 : 150
        );

        return () => clearTimeout(timeout);
    }, [roleText, isDeleting, wordIndex]);

    return (
        <div className="landing-section" id="landingDiv">
            <div className="landing-container">
                {/* Name on the LEFT side */}
                <motion.div
                    className="landing-intro-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="name-label">Hello, I'm</div>
                    <h1 className="name-title">
                        <AnimatedText text="Valentine" />
                    </h1>
                    <h1 className="name-title name-accent">
                        <AnimatedText text="Agam" />
                    </h1>
                </motion.div>

                {/* Role on the RIGHT side */}
                <motion.div
                    className="landing-intro-right"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    <div className="role-label">Specializing in</div>
                    <h2 className="role-text">
                        <span className="role-dynamic">
                            {roleText}
                        </span>
                        <span className="cursor-blink" />
                    </h2>
                    <div className="role-tagline">Creating digital experiences that matter</div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                >
                    <div className="scroll-mouse">
                        <div className="scroll-wheel"></div>
                    </div>
                    <motion.div
                        className="scroll-arrow"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                            <path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                    <span className="scroll-text">Scroll to explore</span>
                </motion.div>
            </div>
            {children}
        </div>
    );
};

export default Landing;
