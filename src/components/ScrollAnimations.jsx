import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionTransition = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -50]);

    return (
        <motion.div
            ref={ref}
            style={{
                opacity,
                scale,
                y,
            }}
        >
            {children}
        </motion.div>
    );
};

const ParallaxSection = ({ children, speed = 0.5 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

    return (
        <motion.div ref={ref} style={{ y }}>
            {children}
        </motion.div>
    );
};

const RevealSection = ({ children, direction = 'up' }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const animations = {
            up: { y: 100, opacity: 0 },
            down: { y: -100, opacity: 0 },
            left: { x: -100, opacity: 0 },
            right: { x: 100, opacity: 0 },
            scale: { scale: 0.5, opacity: 0 },
        };

        gsap.fromTo(
            element,
            animations[direction],
            {
                y: 0,
                x: 0,
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                    scrub: 0.5,
                },
            }
        );
    }, [direction]);

    return <div ref={ref}>{children}</div>;
};

const StaggeredReveal = ({ children, staggerDelay = 0.1 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const items = element.querySelectorAll('.stagger-item');

        gsap.fromTo(
            items,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: staggerDelay,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, [staggerDelay]);

    return <div ref={ref}>{children}</div>;
};

const PinSection = ({ children, pinSpacing = true }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        ScrollTrigger.create({
            trigger: element,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing,
            anticipatePin: 1,
        });
    }, [pinSpacing]);

    return <div ref={ref}>{children}</div>;
};

export { SectionTransition, ParallaxSection, RevealSection, StaggeredReveal, PinSection };
