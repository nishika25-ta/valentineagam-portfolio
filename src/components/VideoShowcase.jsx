import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const videos = [
        {
            id: 1,
            title: 'Collectors World',
            description: 'E-commerce platform for collectibles and rare items',
            src: '/videos/Collectors_world.mp4',
            tags: ['E-Commerce', 'React', 'Full-Stack'],
        },
        {
            id: 2,
            title: 'Dynasty Hotel',
            description: 'Luxury hotel booking and management system',
            src: '/videos/Dynasty.mp4',
            tags: ['Hospitality', 'Booking System', 'UI/UX'],
        },
        {
            id: 3,
            title: 'Kaledi Gallery',
            description: 'Art gallery showcase with modern aesthetics',
            src: '/videos/Kaledi_Demo.mp4',
            tags: ['Gallery', 'Portfolio', 'Design'],
        },
        {
            id: 4,
            title: 'Mal Snow Wash',
            description: 'Car wash service booking platform',
            src: '/videos/Mal_Demo.mp4',
            tags: ['Services', 'Booking', 'Web App'],
        },
        {
            id: 5,
            title: 'Chemara Hotel',
            description: 'Premium hotel website with booking features',
            src: '/videos/chemara_hotel.mp4',
            tags: ['Hotel', 'Premium', 'Full-Stack'],
        },
    ];

    const handleVideoClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section
            style={{
                padding: 'var(--space-3xl) 0',
                background: 'var(--bg-secondary)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '80%',
                    background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.08) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center' }}
                >
                    <motion.span
                        style={{
                            display: 'inline-block',
                            fontSize: '0.85rem',
                            color: 'var(--accent)',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            marginBottom: '0.75rem',
                        }}
                    >
                        WEB DEVELOPMENT
                    </motion.span>
                    <h2>
                        Live <span className="text-gradient">Demos</span>
                    </h2>
                    <p style={{ maxWidth: '500px', margin: '1rem auto 0' }}>
                        Websites and web applications I've built with modern technologies
                    </p>
                </motion.div>

                {/* Main Video Display */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        position: 'relative',
                        borderRadius: 'var(--radius-xl)',
                        overflow: 'hidden',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-primary)',
                        marginBottom: 'var(--space-lg)',
                        boxShadow: '0 0 80px rgba(99, 102, 241, 0.1)',
                    }}
                >
                    {/* Video Container */}
                    <div
                        style={{
                            position: 'relative',
                            aspectRatio: '16 / 9',
                            cursor: 'pointer',
                        }}
                        onClick={handleVideoClick}
                    >
                        <AnimatePresence mode="wait">
                            <motion.video
                                key={activeIndex}
                                ref={videoRef}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                src={videos[activeIndex].src}
                                muted
                                loop
                                playsInline
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </AnimatePresence>

                        {/* Play/Pause Overlay */}
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: isPlaying ? 0 : 1 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0, 0, 0, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 40px rgba(99, 102, 241, 0.5)',
                                }}
                            >
                                {isPlaying ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                        <rect x="6" y="4" width="4" height="16" rx="1" />
                                        <rect x="14" y="4" width="4" height="16" rx="1" />
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 4 }}>
                                        <polygon points="5,3 19,12 5,21" />
                                    </svg>
                                )}
                            </motion.div>
                        </motion.div>

                        {/* Video Info Overlay */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: 'var(--space-lg)',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                {videos[activeIndex].title}
                            </h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                                {videos[activeIndex].description}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {videos[activeIndex].tags.map((tag, i) => (
                                    <span key={i} className="tag" style={{ fontSize: '0.7rem' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Video Thumbnails */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: 'var(--space-sm)',
                    }}
                >
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            onClick={() => {
                                setActiveIndex(index);
                                setIsPlaying(false);
                                if (videoRef.current) {
                                    videoRef.current.pause();
                                    videoRef.current.currentTime = 0;
                                }
                            }}
                            style={{
                                position: 'relative',
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: activeIndex === index
                                    ? '2px solid var(--accent)'
                                    : '2px solid transparent',
                                boxShadow: activeIndex === index
                                    ? '0 0 20px rgba(99, 102, 241, 0.3)'
                                    : 'none',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <video
                                src={video.src}
                                muted
                                style={{
                                    width: '100%',
                                    aspectRatio: '16 / 9',
                                    objectFit: 'cover',
                                    opacity: activeIndex === index ? 1 : 0.6,
                                    transition: 'opacity 0.3s ease',
                                }}
                            />

                            {/* Active indicator */}
                            {activeIndex === index && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: 3,
                                        background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))',
                                    }}
                                />
                            )}

                            {/* Title overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '0.5rem',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                                }}
                            >
                                <p style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 500,
                                    color: activeIndex === index ? 'var(--accent)' : 'var(--text-secondary)',
                                }}>
                                    {video.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
