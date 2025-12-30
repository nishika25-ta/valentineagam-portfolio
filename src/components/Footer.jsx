import { motion } from 'framer-motion';

const Footer = ({ onContactClick }) => {
    return (
        <footer
            style={{
                padding: '6rem 0 3rem',
                textAlign: 'center',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                zIndex: 2,
            }}
        >
            <div className="container">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: '2rem',
                        fontWeight: 600,
                        marginBottom: '2rem',
                    }}
                >
                    Let's build something great together
                </motion.h3>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2.5rem',
                        flexWrap: 'wrap',
                    }}
                >
                    <motion.a
                        href="mailto:valentineagam6@gmail.com"
                        whileHover={{ y: -3, color: 'var(--accent-purple)' }}
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            transition: 'color 0.3s',
                        }}
                    >
                        Email
                    </motion.a>
                    <motion.a
                        href="https://www.linkedin.com/in/valentine-a-a278a7254/"
                        target="_blank"
                        rel="noopener"
                        whileHover={{ y: -3, color: 'var(--accent-purple)' }}
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            transition: 'color 0.3s',
                        }}
                    >
                        LinkedIn
                    </motion.a>
                    <motion.a
                        href="https://www.instagram.com/issav5_"
                        target="_blank"
                        rel="noopener"
                        whileHover={{ y: -3, color: 'var(--accent-purple)' }}
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            transition: 'color 0.3s',
                        }}
                    >
                        Instagram
                    </motion.a>
                </motion.div>

                <p
                    style={{
                        marginTop: '3rem',
                        color: '#666',
                        fontSize: '0.9rem',
                    }}
                >
                    © 2025 Valentine Agam. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
