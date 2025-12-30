import { motion } from 'framer-motion';

const ProjectCard = ({ project, onClick }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -10 }}
            onClick={onClick}
            style={{
                background: 'var(--bg-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-purple)';
                e.currentTarget.style.boxShadow =
                    '0 20px 40px rgba(159, 85, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Status Tag */}
            {project.status && (
                <div
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        padding: '0.3rem 0.8rem',
                        background: 'rgba(159, 85, 255, 0.1)',
                        border: '1px solid var(--accent-purple)',
                        borderRadius: '50px',
                        fontSize: '0.85rem',
                        color: 'var(--accent-purple)',
                        fontWeight: 600,
                        zIndex: 3,
                    }}
                >
                    {project.status}
                </div>
            )}

            {/* Image Container */}
            <div
                style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    background: project.bgWhite ? '#ffffff' : '#1a1a1a',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <motion.img
                    src={project.image}
                    alt={project.shortTitle}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: project.imageContain ? 'contain' : 'cover',
                        padding: project.imageContain ? '1.5rem' : '0',
                    }}
                />
            </div>

            {/* Project Info */}
            <div style={{ padding: '1.5rem' }}>
                <h3
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                    }}
                >
                    {project.shortTitle}
                </h3>
                <p
                    style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1rem',
                    }}
                >
                    {project.description}
                </p>
            </div>

            {/* Hover Shimmer Effect */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '75%',
                    height: '100%',
                    background:
                        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
                    transform: 'skewX(-25deg)',
                    pointerEvents: 'none',
                    transition: 'left 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
                className="shimmer-effect"
            />
        </motion.div>
    );
};

export default ProjectCard;
