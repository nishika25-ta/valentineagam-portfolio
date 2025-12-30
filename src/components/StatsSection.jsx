import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const stats = [
        { number: '9+', label: 'Projects Completed', suffix: '' },
        { number: '5+', label: 'Tech Stacks', suffix: '' },
        { number: '3+', label: 'Years Learning', suffix: '' },
        { number: '100', label: 'Passion Level', suffix: '%' },
    ];

    return (
        <section
            ref={ref}
            style={{
                padding: 'var(--space-2xl) 0',
                background: 'var(--bg-primary)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    height: '200px',
                    background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            <div className="container">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 'var(--space-lg)',
                        textAlign: 'center',
                    }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            style={{
                                padding: 'var(--space-lg)',
                                borderRadius: 'var(--radius-lg)',
                                background: 'rgba(28, 28, 31, 0.5)',
                                border: '1px solid var(--border)',
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.5 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.15 + 0.2, type: 'spring' }}
                                style={{
                                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, var(--text-primary), var(--accent))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {stat.number}{stat.suffix}
                            </motion.div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
