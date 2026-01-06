import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const StatsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const stats = [
        { number: 9, label: 'Projects Completed', suffix: '+', icon: '🚀', color: '#6366f1', percentage: 75 },
        { number: 5, label: 'Tech Stacks', suffix: '+', icon: '⚡', color: '#8b5cf6', percentage: 62 },
        { number: 3, label: 'Years Learning', suffix: '+', icon: '📚', color: '#ec4899', percentage: 50 },
        { number: 100, label: 'Passion Level', suffix: '%', icon: '🔥', color: '#f59e0b', percentage: 100 },
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
                    width: '70%',
                    height: '300px',
                    background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.sin(i) * 20, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 5 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                    }}
                    style={{
                        position: 'absolute',
                        width: 4,
                        height: 4,
                        background: i % 2 === 0 ? 'var(--accent)' : 'var(--accent-secondary)',
                        borderRadius: '50%',
                        top: `${20 + (i * 10) % 60}%`,
                        left: `${10 + (i * 13) % 80}%`,
                        boxShadow: `0 0 10px ${i % 2 === 0 ? 'var(--accent)' : 'var(--accent-secondary)'}`,
                        pointerEvents: 'none',
                    }}
                />
            ))}

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div
                    className="stats-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 'var(--space-lg)',
                        textAlign: 'center',
                    }}
                >
                    {stats.map((stat, i) => (
                        <StatCard key={i} stat={stat} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const StatCard = ({ stat, index, isInView }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = stat.number;
            const duration = 2000; // 2 seconds
            const increment = end / (duration / 16); // 60fps

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, stat.number]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: `0 10px 40px ${stat.color}30`,
            }}
            style={{
                padding: 'var(--space-xl)',
                borderRadius: 'var(--radius-xl)',
                background: 'rgba(28, 28, 31, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
            }}
        >
            {/* Animated gradient border */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                    position: 'absolute',
                    inset: -1,
                    background: `linear-gradient(135deg, ${stat.color}, transparent)`,
                    borderRadius: 'var(--radius-xl)',
                    zIndex: -1,
                }}
            />

            {/* Circular Progress Ring */}
            <div style={{ position: 'relative', marginBottom: '1.5rem', display: 'inline-block' }}>
                <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                    {/* Background circle */}
                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <motion.circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke={stat.color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 50}`}
                        initial={{ strokeDashoffset: `${2 * Math.PI * 50}` }}
                        animate={
                            isInView
                                ? {
                                    strokeDashoffset: `${2 * Math.PI * 50 * (1 - stat.percentage / 100)}`,
                                }
                                : {}
                        }
                        transition={{ duration: 2, delay: index * 0.15, ease: 'easeOut' }}
                        style={{
                            filter: `drop-shadow(0 0 8px ${stat.color})`,
                        }}
                    />
                </svg>

                {/* Icon in center */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '2.5rem',
                    }}
                >
                    {stat.icon}
                </div>
            </div>

            {/* Animated Number */}
            <motion.div
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: 'spring' }}
                style={{
                    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${stat.color}, var(--text-primary))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem',
                }}
            >
                {count}
                {stat.suffix}
            </motion.div>

            {/* Label */}
            <p
                style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                }}
            >
                {stat.label}
            </p>

            {/* Hover particle effect */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at center, ${stat.color}15 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }}
            />
        </motion.div>
    );
};

export default StatsSection;
