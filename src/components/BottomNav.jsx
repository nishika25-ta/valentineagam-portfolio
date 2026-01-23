import { motion } from 'framer-motion';
import { useState } from 'react';

const BottomNav = () => {
    const [activeItem, setActiveItem] = useState('');

    const navItems = [
        {
            id: 'landingDiv',
            label: 'Home',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            )
        },
        {
            id: 'about',
            label: 'About',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            )
        },
        {
            id: 'work',
            label: 'Projects',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                </svg>
            )
        },
        {
            id: 'resume',
            label: 'Resume',
            href: '/Valentine_Resume_2026.pdf',
            download: 'Valentine_Resume_2026.pdf',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            )
        },
    ];

    const handleClick = (item) => {
        setActiveItem(item.id);
        if (item.href) {
            return;
        }
        const element = document.getElementById(item.id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{
                position: 'fixed',
                bottom: '1.5rem',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                zIndex: 1000,
                pointerEvents: 'none',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem 2rem',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '100px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    pointerEvents: 'auto',
                }}
            >
                {navItems.map((item, index) => (
                    item.href ? (
                        <motion.a
                            key={item.id}
                            href={item.href}
                            download={item.download}
                            onClick={() => handleClick(item)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title={item.label}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                background: activeItem === item.id
                                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))'
                                    : 'transparent',
                                color: activeItem === item.id ? '#a5b4fc' : 'rgba(255, 255, 255, 0.6)',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                textDecoration: 'none',
                                position: 'relative',
                            }}
                        >
                            {item.icon}
                            {activeItem === item.id && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: '50%',
                                        border: '2px solid rgba(99, 102, 241, 0.5)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.a>
                    ) : (
                        <motion.button
                            key={item.id}
                            onClick={() => handleClick(item)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title={item.label}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                background: activeItem === item.id
                                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))'
                                    : 'transparent',
                                color: activeItem === item.id ? '#a5b4fc' : 'rgba(255, 255, 255, 0.6)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                            }}
                        >
                            {item.icon}
                            {activeItem === item.id && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: '50%',
                                        border: '2px solid rgba(99, 102, 241, 0.5)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    )
                ))}
            </div>
        </motion.div>
    );
};

export default BottomNav;
