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
import FooterAdvanced from './components/FooterAdvanced';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import WaveDivider from './components/WaveDivider';
import EasterEgg from './components/EasterEgg';
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
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'var(--bg-primary)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                            gap: '2rem',
                        }}
                    >
                        {/* Animated Hacker Name with Typing Effect */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'var(--font-hacker)',
                                fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                                fontWeight: 900,
                                color: 'var(--hacker-green)',
                                textShadow: '0 0 15px var(--hacker-green), 0 0 30px var(--hacker-red), 0 0 60px rgba(191, 0, 255, 0.5), 0 0 90px rgba(255, 0, 64, 0.3)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                            }}
                        >
                            <TypingText text="Valentine Agam" />
                        </motion.div>

                        {/* Progress Bar */}
                        <div
                            style={{
                                width: '200px',
                                height: '3px',
                                background: 'var(--bg-card)',
                                borderRadius: '2px',
                                overflow: 'hidden',
                            }}
                        >
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.1 }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))',
                                    borderRadius: '2px',
                                }}
                            />
                        </div>

                        {/* Progress Percentage */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                letterSpacing: '0.2em',
                                fontFamily: 'monospace',
                            }}
                        >
                            {Math.min(Math.round(progress), 100)}%
                        </motion.p>
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
                        <HeaderAdvanced />

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
