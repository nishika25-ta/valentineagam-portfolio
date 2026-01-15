import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroRevamped from './components/HeroRevamped';
import TechMarquee from './components/TechMarquee';
import VideoShowcase from './components/VideoShowcase';
import ProjectsAdvanced from './components/ProjectsAdvanced';
import StatsSection from './components/StatsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import AboutAdvanced from './components/AboutAdvanced';
import CTASection from './components/CTASection';
import HeaderAdvanced from './components/HeaderAdvanced';
import BottomNav from './components/BottomNav';
import FooterAdvanced from './components/FooterAdvanced';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import WaveDivider from './components/WaveDivider';
import EasterEgg from './components/EasterEgg';
import VantaBackground from './components/VantaBackground';
import { SectionTransition, ParallaxSection, RevealSection } from './components/ScrollAnimations';
import { ChapterDivider } from './components/ChapterDividers';

gsap.registerPlugin(ScrollTrigger);

// Typing Animation Component for Splash Screen
const TypingText = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);

        // Blinking cursor
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => {
            clearInterval(typingInterval);
            clearInterval(cursorInterval);
        };
    }, [text]);

    return (
        <span>
            {displayText}
            <span style={{
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.1s',
                color: 'var(--hacker-red)',
                textShadow: '0 0 10px var(--hacker-red)',
            }}>_</span>
        </span>
    );
};

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading with progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 400);
                    return 100;
                }
                return prev + Math.random() * 20;
            });
        }, 80);

        return () => clearInterval(interval);
    }, []);

    // Hide default cursor
    useEffect(() => {
        if (!isLoading) {
            document.body.style.cursor = 'none';
            const style = document.createElement('style');
            style.innerHTML = '* { cursor: none !important; }';
            document.head.appendChild(style);
        }
    }, [isLoading]);

    // Smooth scroll enhancements
    useEffect(() => {
        if (!isLoading) {
            // Refresh ScrollTrigger on load
            ScrollTrigger.refresh();
        }
    }, [isLoading]);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: '#000',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                            gap: '2rem',
                        }}
                    >
                        {/* Animated Text */}
                        <div
                            className="splash-txt"
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                color: '#eee',
                                fontSize: 'clamp(2rem, 6vw, 4rem)',
                                fontFamily: '"Crimson Text", serif',
                                fontWeight: 600,
                                letterSpacing: '0.02em',
                            }}
                        >
                            {"Valentine Agam".split("").map((char, index) => (
                                <span
                                    key={index}
                                    style={{
                                        whiteSpace: char === " " ? "pre" : "normal",
                                        display: char === " " ? "inline-block" : "inline",
                                        opacity: 0,
                                        transform: 'translate(-2px, 4px) scale(0.9)',
                                        filter: 'blur(6px)',
                                        animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </div>

                        {/* Subtitle */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: "Valentine Agam".length * 0.1 + 0.5, duration: 0.8 }}
                            style={{
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

                            @keyframes fadeIn {
                                to {
                                    opacity: 1;
                                    transform: translate(0, 0) scale(1);
                                    filter: blur(0);
                                }
                            }
                        `}</style>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isLoading && (
                <>
                    <CustomCursor />
                    <BackToTop />
                    <EasterEgg />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* <HeaderAdvanced /> */}
                        <BottomNav />

                        <main>
                            {/* Hero - Grand entrance */}
                            <ParallaxSection speed={0.3}>
                                <HeroRevamped />
                            </ParallaxSection>

                            {/* Chapter 1: Skills */}
                            <ChapterDivider number="Chapter 01" title="Technical Arsenal" />
                            <RevealSection direction="up">
                                <TechMarquee />
                            </RevealSection>

                            <WaveDivider color="var(--bg-secondary)" />

                            {/* Chapter 2: Work Showcase */}
                            <ChapterDivider number="Chapter 02" title="Live Demonstrations" />
                            <SectionTransition>
                                <VideoShowcase />
                            </SectionTransition>

                            <WaveDivider color="var(--bg-primary)" flip />

                            {/* Chapter 3: Featured Projects */}
                            <ChapterDivider number="Chapter 03" title="Featured Creations" />
                            <RevealSection direction="scale">
                                <ProjectsAdvanced />
                            </RevealSection>

                            {/* Chapter 4: Achievements */}
                            <ChapterDivider number="Chapter 04" title="Impact & Achievements" />
                            <SectionTransition>
                                <StatsSection />
                            </SectionTransition>

                            {/* Chapter 5: Journey */}
                            <ChapterDivider number="Chapter 05" title="Professional Journey" />
                            <RevealSection direction="left">
                                <ExperienceTimeline />
                            </RevealSection>

                            {/* Chapter 6: About */}
                            <ChapterDivider number="Chapter 06" title="The Person Behind" />
                            <ParallaxSection speed={0.4}>
                                <AboutAdvanced />
                            </ParallaxSection>

                            {/* Final Chapter: Connect */}
                            <ChapterDivider number="Epilogue" title="Let's Create Together" />
                            <SectionTransition>
                                <CTASection />
                            </SectionTransition>
                        </main>

                        <FooterAdvanced />
                    </motion.div>
                </>
            )}
        </>
    );
}

export default App;
