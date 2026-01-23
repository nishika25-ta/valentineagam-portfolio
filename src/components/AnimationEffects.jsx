import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Wrapper component for reveal animations
export const RevealOnScroll = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-100px' });
    const controls = useAnimation();

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
            x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
            scale: direction === 'scale' ? 0.8 : 1,
            filter: 'blur(10px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
        },
    };

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Staggered children animation
export const StaggerContainer = ({
    children,
    staggerDelay = 0.1,
    className = '',
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, className = '' }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Animated gradient text
export const GradientText = ({
    children,
    className = '',
    animate = true,
}) => {
    return (
        <motion.span
            className={className}
            style={{
                background: animate
                    ? 'linear-gradient(90deg, #6366f1, #8b5cf6, #c084fc, #8b5cf6, #6366f1)'
                    : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                backgroundSize: animate ? '200% 100%' : '100% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
            }}
            animate={animate ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            {children}
        </motion.span>
    );
};

// Text split and animate character by character
export const AnimatedText = ({
    text,
    className = '',
    delay = 0,
    charDelay = 0.03,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const chars = text.split('');

    return (
        <motion.span
            ref={ref}
            className={className}
            style={{ display: 'inline-flex', flexWrap: 'wrap' }}
        >
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={isInView ? {
                        opacity: 1,
                        y: 0,
                        rotateX: 0
                    } : {}}
                    transition={{
                        duration: 0.4,
                        delay: delay + (index * charDelay),
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                    style={{
                        display: 'inline-block',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

// Parallax wrapper
export const ParallaxWrapper = ({
    children,
    speed = 0.5,
    className = '',
}) => {
    const [offset, setOffset] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                setOffset(scrollProgress * 100 * speed);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <motion.div
            ref={ref}
            style={{ transform: `translateY(${offset}px)` }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Counter animation
export const AnimatedCounter = ({
    target,
    duration = 2,
    prefix = '',
    suffix = '',
    className = '',
}) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = target;
            const incrementTime = (duration * 1000) / end;

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= end) {
                    clearInterval(timer);
                }
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isInView, target, duration]);

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
        >
            {prefix}{count}{suffix}
        </motion.span>
    );
};

export default RevealOnScroll;
