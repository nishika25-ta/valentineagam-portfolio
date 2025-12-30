import { motion } from 'framer-motion';

const TechMarquee = () => {
    const technologies = [
        'React', 'Python', 'Flutter', 'Machine Learning', 'UI/UX Design',
        'Supabase', 'PostgreSQL', 'YOLO', 'TensorFlow', 'Figma',
        'JavaScript', 'TypeScript', 'Node.js', 'Electron', 'Flask',
    ];

    // Double the array for seamless loop
    const items = [...technologies, ...technologies];

    return (
        <div
            style={{
                overflow: 'hidden',
                padding: '2rem 0',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg-secondary)',
            }}
        >
            <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{
                    display: 'flex',
                    gap: '3rem',
                    whiteSpace: 'nowrap',
                }}
            >
                {items.map((tech, i) => (
                    <span
                        key={i}
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            fontWeight: 500,
                            color: i % 2 === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                        }}
                    >
                        {tech}
                        <span style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>◆</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default TechMarquee;
