import { motion } from 'framer-motion';

const CTASection = () => {
    return (
        <section
            style={{
                padding: 'var(--space-3xl) 0',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Gradient background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
                }}
            />

            {/* Glow effect */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
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

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        <motion.a
                            href="mailto:valentineagam6@gmail.com"
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
                        >
                            <span style={{ position: 'relative', zIndex: 1 }}>Get In Touch</span>
                        </motion.a>
                        <motion.a
                            href="https://wa.me/60146521429"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
                        >
                            WhatsApp
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
