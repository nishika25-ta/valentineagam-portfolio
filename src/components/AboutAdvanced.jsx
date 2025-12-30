import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutAdvanced = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const skills = ['React', 'Python', 'Flutter', 'UI/UX', 'AI/ML', 'Web Dev', 'Full-Stack', 'Data Analysis'];

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
                    {/* Image with glow effect */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ position: 'relative' }}
                    >
                        {/* Glow behind image */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: '-20%',
                                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
                                filter: 'blur(40px)',
                                pointerEvents: 'none',
                            }}
                        />

                        <div
                            ref={imageRef}
                            style={{
                                borderRadius: 'var(--radius-xl)',
                                overflow: 'hidden',
                                border: '1px solid var(--border)',
                                position: 'relative',
                                boxShadow: 'var(--shadow-lg)',
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
                        </div>
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

                        {/* Skills with stagger */}
                        <motion.div
                            variants={itemVariants}
                            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}
                        >
                            {skills.map((skill, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="tag"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Download Button */}
                        <motion.a
                            variants={itemVariants}
                            href="/Valentine_Resume_Latest.pdf"
                            download="Valentine_Agam_Resume.pdf"
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
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
