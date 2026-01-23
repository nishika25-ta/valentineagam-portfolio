import { useState } from 'react';
import { motion } from 'framer-motion';

const TechMarquee = () => {
    const [isPaused, setIsPaused] = useState(false);

    const technologies = [
        { name: 'React', icon: '/images/tech/react.png', color: '#61dafb' },
        { name: 'Python', icon: '/images/tech/python.png', color: '#3776ab' },
        { name: 'Flutter', icon: '/images/tech/flutter.png', color: '#02569B' },
        { name: 'Machine Learning', icon: '/images/tech/ml.png', color: '#FF6F00' },
        { name: 'UI/UX Design', icon: '/images/tech/uiux.png', color: '#FF4081' },
        { name: 'Supabase', icon: '/images/tech/supabase.png', color: '#3ECF8E' },
        { name: 'PostgreSQL', icon: '/images/tech/postgresql.png', color: '#336791' },
        { name: 'YOLO', icon: '/images/tech/yolo.png', color: '#00FFFF' },
        { name: 'TensorFlow', icon: '/images/tech/tensorflow.png', color: '#FF6F00' },
        { name: 'Figma', icon: '/images/tech/figma.png', color: '#F24E1E' },
        { name: 'JavaScript', icon: '/images/tech/javascript.png', color: '#F7DF1E' },
        { name: 'TypeScript', icon: '/images/tech/typescript.png', color: '#3178C6' },
        { name: 'Node.js', icon: '/images/tech/nodejs.png', color: '#339933' },
        { name: 'Electron', icon: '/images/tech/electron.png', color: '#47848F' },
        { name: 'Flask', icon: '/images/tech/flask.png', color: '#000000' },
    ];

    // Triple the array for seamless loop
    const itemsRow1 = [...technologies, ...technologies, ...technologies];
    const itemsRow2 = [...technologies.slice().reverse(), ...technologies.slice().reverse(), ...technologies.slice().reverse()];

    return (
        <div
            style={{
                overflow: 'hidden',
                padding: '3rem 0',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg-secondary)',
                position: 'relative',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Gradient Overlays */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '200px',
                    background: 'linear-gradient(90deg, var(--bg-secondary) 0%, transparent 100%)',
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '200px',
                    background: 'linear-gradient(270deg, var(--bg-secondary) 0%, transparent 100%)',
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            />

            {/* Ambient Glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    height: '150px',
                    background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Row 1 - Left to Right */}
            <motion.div
                animate={{ x: isPaused ? '0%' : ['-33.333%', '-66.666%'] }}
                transition={{
                    duration: isPaused ? 0 : 40,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'loop',
                }}
                style={{
                    display: 'flex',
                    gap: '3rem',
                    whiteSpace: 'nowrap',
                    marginBottom: '1.5rem',
                }}
            >
                {itemsRow1.map((tech, i) => (
                    <motion.div
                        key={i}
                        whileHover={{
                            scale: 1.15,
                            y: -5,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(28, 28, 31, 0.5)',
                            border: '1px solid var(--border)',
                            cursor: 'pointer',
                            position: 'relative',
                        }}
                    >
                        {/* Hover Glow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            style={{
                                position: 'absolute',
                                inset: -2,
                                background: `radial-gradient(circle at center, ${tech.color}40 0%, transparent 70%)`,
                                borderRadius: 'var(--radius-md)',
                                filter: 'blur(8px)',
                                zIndex: -1,
                            }}
                        />

                        <img
                            src={tech.icon}
                            alt={tech.name}
                            style={{
                                width: '32px',
                                height: '32px',
                                objectFit: 'contain',
                                borderRadius: '6px',
                            }}
                        />
                        <span
                            style={{
                                fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                                fontWeight: 500,
                                color: 'var(--text-primary)',
                                fontFamily: '"Geist", sans-serif',
                            }}
                        >
                            {tech.name}
                        </span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Row 2 - Right to Left */}
            <motion.div
                animate={{ x: isPaused ? '0%' : ['-66.666%', '-33.333%'] }}
                transition={{
                    duration: isPaused ? 0 : 45,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'loop',
                }}
                style={{
                    display: 'flex',
                    gap: '3rem',
                    whiteSpace: 'nowrap',
                }}
            >
                {itemsRow2.map((tech, i) => (
                    <motion.div
                        key={i}
                        whileHover={{
                            scale: 1.15,
                            y: -5,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(28, 28, 31, 0.5)',
                            border: '1px solid var(--border)',
                            cursor: 'pointer',
                            position: 'relative',
                        }}
                    >
                        {/* Hover Glow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            style={{
                                position: 'absolute',
                                inset: -2,
                                background: `radial-gradient(circle at center, ${tech.color}40 0%, transparent 70%)`,
                                borderRadius: 'var(--radius-md)',
                                filter: 'blur(8px)',
                                zIndex: -1,
                            }}
                        />

                        <img
                            src={tech.icon}
                            alt={tech.name}
                            style={{
                                width: '32px',
                                height: '32px',
                                objectFit: 'contain',
                                borderRadius: '6px',
                            }}
                        />
                        <span
                            style={{
                                fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                                fontWeight: 500,
                                color: 'var(--text-primary)',
                                fontFamily: '"Geist", sans-serif',
                            }}
                        >
                            {tech.name}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default TechMarquee;
