import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CTASection = () => {
    return (
        <section
            style={{
                padding: 'var(--space-3xl) 0',
                position: 'relative',
                overflow: 'hidden',
                background: 'transparent',
            }}
        >
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'inline-block',
                            fontSize: '0.85rem',
                            color: 'var(--accent)',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            marginBottom: '1rem',
                        }}
                    >
                        LET'S WORK TOGETHER
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            marginBottom: '1.5rem',
                            lineHeight: 1.2,
                        }}
                    >
                        Have a project in mind?
                        <br />
                        <span className="text-gradient">Let's create something amazing.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '2.5rem',
                            lineHeight: 1.8,
                        }}
                    >
                        I'm always open to discussing new projects, creative ideas,
                        or opportunities to be part of your vision.
                    </motion.p>

                    {/* CTA Buttons with Magnetic Effect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
                    >
                        <MagneticButton
                            href="mailto:valentineagam6@gmail.com"
                            primary
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span style={{ position: 'relative', zIndex: 1 }}>Get In Touch</span>
                        </MagneticButton>

                        <MagneticButton
                            href="https://wa.me/60146521429"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            WhatsApp
                        </MagneticButton>
                    </motion.div>

                    {/* Social Media Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            or connect via:
                        </span>

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {[
                                { icon: 'GitHub', href: 'https://github.com/nishika25-ta', svg: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                                { icon: 'LinkedIn', href: 'https://www.linkedin.com/in/valentine-a-a278a7254', svg: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{
                                        scale: 1.2,
                                        rotate: 5,
                                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        background: 'rgba(28, 28, 31, 0.6)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid var(--border)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                    }}
                                    title={social.icon}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-primary)">
                                        <path d={social.svg} />
                                    </svg>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Availability Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, type: 'spring' }}
                        style={{
                            marginTop: '2.5rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: '50px',
                        }}
                    >
                        <motion.span
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                width: 10,
                                height: 10,
                                background: '#22c55e',
                                borderRadius: '50%',
                                boxShadow: '0 0 15px #22c55e',
                            }}
                        />
                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                            Available for new opportunities
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

// Magnetic Button Component
const MagneticButton = ({ children, href, primary, ...props }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Magnetic effect - pull towards cursor
        x.set(distanceX * 0.3);
        y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            className={`btn ${primary ? 'btn-primary' : 'btn-secondary'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x: xSpring,
                y: ySpring,
                padding: '1rem 2.5rem',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: primary ? '0 0 40px rgba(99, 102, 241, 0.6)' : '0 10px 30px rgba(0,0,0,0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.a>
    );
};

export default CTASection;
