import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring', damping: 25, stiffness: 300 },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: 20,
            transition: { duration: 0.2 },
        },
    };

    return (
        <AnimatePresence>
            <motion.div
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(9, 9, 11, 0.9)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                }}
            >
                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '2.5rem',
                        maxWidth: '950px',
                        maxHeight: '85vh',
                        overflow: 'auto',
                        width: '100%',
                        position: 'relative',
                        boxShadow: '0 0 80px rgba(99, 102, 241, 0.15)',
                    }}
                >
                    {/* Gradient accent */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))',
                            borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
                        }}
                    />

                    {/* Close Button */}
                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            fontSize: '1.25rem',
                            color: 'var(--text-secondary)',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            cursor: 'pointer',
                            width: '42px',
                            height: '42px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        ×
                    </motion.button>

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: '1.75rem', marginBottom: '1rem', paddingRight: '3rem' }}
                    >
                        {project.title}
                    </motion.h2>

                    {/* Keywords */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}
                    >
                        {project.keywords.map((keyword, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.05 }}
                                className="tag"
                            >
                                {keyword}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            color: 'var(--text-secondary)',
                            lineHeight: 1.8,
                            marginBottom: '2rem',
                            fontSize: '0.95rem',
                        }}
                        dangerouslySetInnerHTML={{ __html: project.fullDescription }}
                    />

                    {/* Images */}
                    {project.images && project.images.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '1rem',
                            }}
                        >
                            {project.images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    style={{
                                        borderRadius: 'var(--radius-md)',
                                        overflow: 'hidden',
                                        border: '1px solid var(--border)',
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.title} - ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            display: 'block',
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
