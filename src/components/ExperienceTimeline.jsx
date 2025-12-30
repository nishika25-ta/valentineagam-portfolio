import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperienceTimeline = () => {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);

    const experiences = [
        {
            year: '2024',
            title: 'AI/ML Developer',
            company: 'Personal Projects',
            description: 'Building explainable AI tools, malware detection systems, and ML pipelines',
            icon: '🤖',
            color: '#6366f1',
        },
        {
            year: '2023',
            title: 'Full-Stack Developer',
            company: 'Freelance',
            description: 'Creating modern web applications with React, Next.js, and cloud backends',
            icon: '💻',
            color: '#8b5cf6',
        },
        {
            year: '2022',
            title: 'Mobile App Developer',
            company: 'University Projects',
            description: 'Built AR navigation apps and cross-platform mobile solutions with Flutter',
            icon: '📱',
            color: '#a855f7',
        },
        {
            year: '2021',
            title: 'UI/UX Designer',
            company: 'Learning Phase',
            description: 'Started journey in design thinking, Figma, and user-centric interfaces',
            icon: '🎨',
            color: '#c084fc',
        },
    ];

    useEffect(() => {
        if (lineRef.current) {
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                padding: 'var(--space-3xl) 0',
                background: 'var(--bg-primary)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background gradient */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    width: '40%',
                    height: '60%',
                    transform: 'translateY(-50%)',
                    background: 'radial-gradient(ellipse at left, rgba(99, 102, 241, 0.1) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}
                >
                    <motion.span
                        style={{
                            display: 'inline-block',
                            fontSize: '0.85rem',
                            color: 'var(--accent)',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            marginBottom: '0.75rem',
                        }}
                    >
                        MY JOURNEY
                    </motion.span>
                    <h2>
                        Experience <span className="text-gradient">Timeline</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div
                    style={{
                        position: 'relative',
                        maxWidth: '800px',
                        margin: '0 auto',
                    }}
                >
                    {/* Center Line */}
                    <div
                        ref={lineRef}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 0,
                            width: 2,
                            background: 'linear-gradient(180deg, var(--accent), var(--accent-secondary), transparent)',
                            transformOrigin: 'top',
                        }}
                    />

                    {/* Experience Items */}
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            style={{
                                display: 'flex',
                                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                                paddingLeft: index % 2 === 0 ? 0 : '52%',
                                paddingRight: index % 2 === 0 ? '52%' : 0,
                                marginBottom: 'var(--space-xl)',
                                position: 'relative',
                            }}
                        >
                            {/* Dot on timeline */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '1.5rem',
                                    transform: 'translateX(-50%)',
                                    width: 16,
                                    height: 16,
                                    background: exp.color,
                                    borderRadius: '50%',
                                    border: '3px solid var(--bg-primary)',
                                    boxShadow: `0 0 20px ${exp.color}`,
                                    zIndex: 2,
                                }}
                            />

                            {/* Content Card */}
                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                style={{
                                    background: 'rgba(28, 28, 31, 0.7)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: 'var(--space-md)',
                                    width: '100%',
                                    cursor: 'default',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{exp.icon}</span>
                                    <div>
                                        <span
                                            style={{
                                                fontSize: '0.75rem',
                                                color: exp.color,
                                                fontWeight: 600,
                                                letterSpacing: '0.1em',
                                            }}
                                        >
                                            {exp.year}
                                        </span>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{exp.title}</h4>
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                    {exp.company}
                                </p>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{exp.description}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;
