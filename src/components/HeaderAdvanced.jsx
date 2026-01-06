import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticButton = ({ children, href, className, style, download }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 300 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set((e.clientX - centerX) * 0.3);
            y.set((e.clientY - centerY) * 0.3);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            download={download}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ ...style, x: springX, y: springY }}
        >
            {children}
        </motion.a>
    );
};

const HeaderAdvanced = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [time, setTime] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Update time
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }));
        };
        updateTime();
        const timeInterval = setInterval(updateTime, 1000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(timeInterval);
        };
    }, []);

    const navLinks = [
        { id: 'projects', label: 'Projects' },
        { id: 'about', label: 'About' },
    ];

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '1rem 0',
                background: isScrolled ? 'rgba(9, 9, 11, 0.85)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                borderBottom: isScrolled ? '1px solid var(--border)' : 'none',
                transition: 'all 0.3s ease',
            }}
        >
            <div
                className="container"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* Logo with hover effect */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                    }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <motion.img
                        whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 0.5 }}
                        src="/images/logo/valelogo.jpeg"
                        alt="Valentine Agam Logo"
                        style={{
                            width: '45px',
                            height: 'auto',
                            borderRadius: '8px',
                            border: '2px solid var(--border)',
                        }}
                    />

                    {/* Live Clock */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            fontSize: '0.7rem',
                            color: 'var(--text-muted)',
                            fontFamily: 'monospace',
                            padding: '0.25rem 0.5rem',
                            background: 'var(--bg-card)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border)',
                        }}
                    >
                        {time}
                    </motion.span>
                </motion.div>

                {/* Navigation */}
                <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map((link, i) => (
                        <MagneticButton
                            key={link.id}
                            href={`#${link.id}`}
                            style={{
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                color: 'var(--text-secondary)',
                                position: 'relative',
                                padding: '0.5rem 0',
                            }}
                        >
                            <motion.span
                                whileHover={{ color: 'var(--text-primary)' }}
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                }}
                            >
                                {link.label}
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: -4,
                                        left: 0,
                                        right: 0,
                                        height: 2,
                                        background: 'var(--accent)',
                                        transformOrigin: 'left',
                                    }}
                                />
                            </motion.span>
                        </MagneticButton>
                    ))}

                    <MagneticButton
                        href="/Valentine_Resume_Latest.pdf"
                        download
                        className="btn btn-secondary"
                        style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                    >
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <span>Resume</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </motion.span>
                    </MagneticButton>
                </nav>
            </div>
        </motion.header>
    );
};

export default HeaderAdvanced;
