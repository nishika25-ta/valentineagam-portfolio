import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ChapterDivider = ({ number, title }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        gsap.fromTo(
            element,
            { opacity: 0, y: 50, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1,
                },
            }
        );
    }, []);

    return (
        <div
            ref={ref}
            style={{
                padding: 'var(--space-3xl) 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                }}
            />

            {/* Chapter number */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                }}
            >
                {number}
            </motion.div>

            {/* Animated line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                    width: '100px',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                }}
            />

            {/* Title */}
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, var(--text-primary), var(--accent))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {title}
            </motion.h3>

            {/* Animated line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                    width: '100px',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                }}
            />
        </div>
    );
};

const DepthLayer = ({ children, depth = 1 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50 * depth]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

    return (
        <motion.div
            ref={ref}
            style={{
                y,
                opacity,
                willChange: 'transform, opacity',
            }}
        >
            {children}
        </motion.div>
    );
};

export { ChapterDivider, DepthLayer };
