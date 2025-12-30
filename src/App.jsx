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
                                fontSize: '3rem',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                            }}
                        >
                            <span className="text-gradient">VA.</span>
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
                            <HeroRevamped />
                            <TechMarquee />
                            <WaveDivider color="var(--bg-secondary)" />
                            <VideoShowcase />
                            <WaveDivider color="var(--bg-primary)" flip />
                            <ProjectsAdvanced />
                            <StatsSection />
                            <ExperienceTimeline />
                            <AboutAdvanced />
                            <CTASection />
                        </main>

                        <FooterAdvanced />
                    </motion.div>
                </>
            )}
        </>
    );
}

export default App;
