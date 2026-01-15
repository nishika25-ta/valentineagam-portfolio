import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutAdvanced = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const imageContainerRef = useRef(null);

    const [hoveredSkill, setHoveredSkill] = useState(null);

    // Mouse position for 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-200, 200], [10, -10]), { damping: 20, stiffness: 200 });
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), { damping: 20, stiffness: 200 });

    const skills = [
        { name: 'React', level: 90, icon: '⚛️' },
        { name: 'Python', level: 85, icon: '🐍' },
        { name: 'Flutter', level: 80, icon: '📱' },
        { name: 'UI/UX', level: 88, icon: '🎨' },
        { name: 'AI/ML', level: 75, icon: '🤖' },
        { name: 'Web Dev', level: 92, icon: '🌐' },
        { name: 'Full-Stack', level: 87, icon: '⚡' },
        { name: 'Data Analysis', level: 78, icon: '📊' },
    ];

    useEffect(() => {
        // Parallax effect on image
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                yPercent: -10,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        }
    }, []);

    const handleMouseMove = (e) => {
        const rect = imageContainerRef.current?.getBoundingClientRect();
        if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseX.set(e.clientX - centerX);
            mouseY.set(e.clientY - centerY);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section id="about" className="section" ref={sectionRef}>
            <div className="container">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: 'var(--space-2xl)',
                        alignItems: 'center',
                    }}
                >
                    {/* Image with enhanced effects */}
                    <motion.div
                        ref={imageContainerRef}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            position: 'relative',
                            perspective: '1000px',
                        }}
                    >
                        {/* Animated gradient border */}
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            style={{
                                position: 'absolute',
                                inset: -3,
                                background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #6366f1)',
                                borderRadius: 'var(--radius-xl)',
                                filter: 'blur(6px)',
                                opacity: 0.6,
                                zIndex: -1,
                            }}
                        />

                        {/* Glow behind image */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: '-30%',
                                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
                                filter: 'blur(50px)',
                                pointerEvents: 'none',
                                zIndex: -2,
                            }}
                        />

                        <motion.div
                            ref={imageRef}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                                borderRadius: 'var(--radius-xl)',
                                overflow: 'hidden',
                                border: '1px solid var(--border)',
                                position: 'relative',
                                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            <img
                                src="/images/logo/vale_pic.jpg"
                                alt="Valentine Agam"
                                style={{
                                    width: '100%',
                                    aspectRatio: '1/1',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />

                            {/* Overlay gradient */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(180deg, transparent 60%, rgba(9, 9, 11, 0.8) 100%)',
                                    pointerEvents: 'none',
                                }}
                            />

                            {/* Floating badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                style={{
                                    position: 'absolute',
                                    bottom: 20,
                                    left: 20,
                                    display: 'flex',
                                    gap: '0.5rem',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {['💻 Developer', '🎨 Designer', '🚀 Innovator'].map((badge, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        style={{
                                            padding: '0.4rem 0.8rem',
                                            background: 'rgba(99, 102, 241, 0.2)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(99, 102, 241, 0.4)',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: 'var(--text-primary)',
                                        }}
                                    >
                                        {badge}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.span
                            variants={itemVariants}
                            style={{
                                display: 'inline-block',
                                fontSize: '0.85rem',
                                color: 'var(--accent)',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                marginBottom: '0.75rem',
                            }}
                        >
                            ABOUT ME
                        </motion.span>

                        <motion.h2 variants={itemVariants} style={{ marginBottom: 'var(--space-md)' }}>
                            Passionate About <span className="text-gradient">Technology</span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: 'var(--space-md)', lineHeight: 1.7 }}
                        >
                            I'm a tech enthusiast from Miri, Sarawak specializing in software development, UI/UX design, and artificial intelligence.
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            style={{ marginBottom: 'var(--space-sm)', lineHeight: 1.8 }}
                        >
                            With a background in Cognitive Science, I bring a unique perspective to problem-solving, focusing on user-centric solutions that blend functionality with elegant design.
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            style={{ marginBottom: 'var(--space-lg)', lineHeight: 1.8, color: 'var(--accent)' }}
                        >
                            I also specialize in AI/ML, Web Development, and more!
                        </motion.p>

                        {/* Skills with interactive ratings */}
                        <motion.div
                            variants={itemVariants}
                            style={{ marginBottom: 'var(--space-lg)' }}
                        >
                            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Core Skills</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                                {skills.map((skill, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + i * 0.05 }}
                                        onHoverStart={() => setHoveredSkill(i)}
                                        onHoverEnd={() => setHoveredSkill(null)}
                                        style={{
                                            padding: '0.75rem',
                                            background: hoveredSkill === i ? 'rgba(99, 102, 241, 0.15)' : 'rgba(28, 28, 31, 0.5)',
                                            border: hoveredSkill === i ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border)',
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ fontSize: '1.2rem' }}>{skill.icon}</span>
                                                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{skill.name}</span>
                                            </div>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>{skill.level}%</span>
                                        </div>
                                        {/* Progress bar */}
                                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                                                style={{
                                                    height: '100%',
                                                    background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))',
                                                    borderRadius: '2px',
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Download Button */}
                        <motion.a
                            variants={itemVariants}
                            href="/Valentine_Resume_2026.pdf"
                            download="Valentine_Resume_2026.pdf"
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1 }}>
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <span style={{ position: 'relative', zIndex: 1 }}>Download Resume</span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutAdvanced;
