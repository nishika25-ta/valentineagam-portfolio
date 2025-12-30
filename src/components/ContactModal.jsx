import { motion, AnimatePresence } from 'framer-motion';

const ContactModal = ({ onClose }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(24px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        padding: '3rem',
                        maxWidth: '600px',
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            fontSize: '2rem',
                            color: 'var(--text-secondary)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            transition: 'all 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = 'var(--text-primary)';
                            e.target.style.background = 'rgba(159, 85, 255, 0.1)';
                            e.target.style.transform = 'rotate(90deg)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = 'var(--text-secondary)';
                            e.target.style.background = 'none';
                            e.target.style.transform = 'rotate(0deg)';
                        }}
                    >
                        ×
                    </button>

                    <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Get in Touch</h2>
                    <p
                        style={{
                            textAlign: 'center',
                            color: 'var(--text-secondary)',
                            marginBottom: '2rem',
                        }}
                    >
                        I'm open to discussing new projects, opportunities, or just having a chat.
                        Feel free to reach out through any of these channels.
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gap: '1rem',
                        }}
                    >
                        {/* WhatsApp */}
                        <motion.a
                            href="https://wa.me/60146521429"
                            target="_blank"
                            rel="noopener"
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="glass glass-hover"
                            style={{
                                padding: '1.5rem',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none',
                            }}
                        >
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(37, 211, 102, 0.1)',
                                }}
                            >
                                <img
                                    src="/images/logo/whatsapp_logo.png"
                                    alt="WhatsApp"
                                    style={{ width: '32px', height: '32px' }}
                                />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>WhatsApp</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    +60 14-652 1429
                                </p>
                            </div>
                        </motion.a>

                        {/* Email */}
                        <motion.a
                            href="mailto:valentineagam6@gmail.com"
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="glass glass-hover"
                            style={{
                                padding: '1.5rem',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none',
                            }}
                        >
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(234, 67, 53, 0.1)',
                                }}
                            >
                                <img
                                    src="/images/logo/gmail_logo.jpg"
                                    alt="Email"
                                    style={{ width: '32px', height: '32px', borderRadius: '8px' }}
                                />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Email</h3>
                                <p
                                    style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.9rem',
                                        wordBreak: 'break-all',
                                    }}
                                >
                                    valentineagam6@gmail.com
                                </p>
                            </div>
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ContactModal;
