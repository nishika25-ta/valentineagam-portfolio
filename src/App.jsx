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
                        {/* Animated Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src="/images/logo/valelogo.jpeg"
                                alt="Valentine Agam Logo"
                                style={{
                                    width: '120px',
                                    height: 'auto',
                                    borderRadius: '12px',
                                }}
                            />
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
