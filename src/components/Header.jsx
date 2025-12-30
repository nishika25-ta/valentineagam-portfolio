import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Header = ({ onContactClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsScrolled(currentScrollY > 50);
            setIsHidden(currentScrollY > lastScrollY && currentScrollY > 200);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: isHidden ? -100 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    padding: '1.5rem 0',
                    background: isScrolled
                        ? 'rgba(11, 11, 15, 0.8)'
                        : 'transparent',
                    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                    borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    transition: 'background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s',
                }}
            >
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '1400px'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--accent-purple)',
                        }}
                    >
                        VA
                    </motion.div>

                    <motion.nav
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{
                            display: 'flex',
                            gap: '2.5rem',
                        }}
                    >
                        <a
                            href="#work"
                            onClick={(e) => scrollToSection(e, 'work')}
                            style={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: 'var(--text-secondary)',
                                transition: 'color 0.3s',
                                position: 'relative',
                            }}
                            onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
                            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                        >
                            Work
                        </a>
                        <a
                            href="#about"
                            onClick={(e) => scrollToSection(e, 'about')}
                            style={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: 'var(--text-secondary)',
                                transition: 'color 0.3s',
                            }}
                            onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
                            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                        >
                            About
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                onContactClick();
                            }}
                            style={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: 'var(--text-secondary)',
                                transition: 'color 0.3s',
                            }}
                            onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
                            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                        >
                            Contact
                        </a>
                    </motion.nav>
                </div>
            </motion.header>

            {/* Progress Bar */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'var(--gradient-primary)',
                    transformOrigin: '0%',
                    scaleX,
                    zIndex: 101,
                }}
            />
        </>
    );
};

export default Header;
