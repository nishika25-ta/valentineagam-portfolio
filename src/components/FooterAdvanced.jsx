import { motion } from 'framer-motion';

const FooterAdvanced = () => {
    const currentYear = new Date().getFullYear();

    const links = [
        { label: 'Email', href: 'mailto:valentineagam6@gmail.com' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/valentine-a-a278a7254/' },
        { label: 'Instagram', href: 'https://www.instagram.com/issav5_' },
        { label: 'WhatsApp', href: 'https://wa.me/60146521429' },
    ];

    return (
        <footer
            style={{
                padding: 'var(--space-2xl) 0 var(--space-lg)',
                borderTop: '1px solid var(--border)',
                position: 'relative',
            }}
        >
            {/* Subtle gradient */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '50%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                }}
            />

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 'var(--space-md)',
                    }}
                >
                    {/* Left */}
                    <div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                            © {currentYear} Valentine Agam
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Built with React & Framer Motion
                        </p>
                    </div>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                        {links.map((link, i) => (
                            <motion.a
                                key={i}
                                href={link.href}
                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                whileHover={{ y: -2, color: 'var(--accent)' }}
                                style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    transition: 'color 0.2s ease',
                                }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default FooterAdvanced;
