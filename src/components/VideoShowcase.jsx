import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { videosData } from '../data/videosData';

const VideoShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    // Map videosData to component format
    const videos = videosData.map(video => ({
        id: video.id,
        title: video.title,
        description: video.description,
        src: video.videoPath,
        tags: video.tags,
    }));

    useEffect(() => {
        // Keyboard navigation
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowRight') {
                goToNext();
            } else if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === ' ') {
                e.preventDefault();
                handleVideoClick();
            } else if (e.key === 'f') {
                toggleFullscreen();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [activeIndex, isPlaying]);

    useEffect(() => {
        // Autoplay timer
        let interval;
        if (autoplay && !isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        goToNext();
                        return 0;
                    }
                    return prev + 0.5;
                });
            }, 50); // Update every 50ms for smooth progress
        } else {
            setProgress(0);
        }

        return () => clearInterval(interval);
    }, [autoplay, isPlaying, activeIndex]);

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

    const goToNext = () => {
        setActiveIndex((prev) => (prev + 1) % videos.length);
        setIsPlaying(false);
        setProgress(0);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const goToPrevious = () => {
        setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
        setIsPlaying(false);
        setProgress(0);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
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

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -25, 0],
                        x: [0, Math.sin(i) * 15, 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: 6 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                    style={{
                        position: 'absolute',
                        width: 3,
                        height: 3,
                        background: 'var(--accent)',
                        borderRadius: '50%',
                        top: `${15 + (i * 15) % 70}%`,
                        left: `${5 + (i * 17) % 90}%`,
                        boxShadow: '0 0 10px var(--accent)',
                        pointerEvents: 'none',
                    }}
                />
            ))}

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
                    ref={containerRef}
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
                        boxShadow: '0 0 80px rgba(99, 102, 241, 0.15)',
                    }}
                >
                    {/* Video Container */}
                    <div
                        style={{
                            position: 'relative',
                            aspectRatio: '16 / 9',
                            cursor: 'pointer',
                            background: '#000',
                        }}
                        onClick={handleVideoClick}
                    >
                        <AnimatePresence mode="wait">
                            <motion.video
                                key={activeIndex}
                                ref={videoRef}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
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
                                    boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)',
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

                        {/* Navigation Arrows */}
                        <motion.button
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                background: 'rgba(28, 28, 31, 0.9)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                background: 'rgba(28, 28, 31, 0.9)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </motion.button>

                        {/* Controls Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1 }}
                            animate={{ opacity: isPlaying ? 0 : 1 }}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                display: 'flex',
                                gap: '0.5rem',
                                zIndex: 10,
                            }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setAutoplay(!autoplay);
                                }}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: 'var(--radius-sm)',
                                    background: autoplay ? 'rgba(99, 102, 241, 0.2)' : 'rgba(28, 28, 31, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    border: `1px solid ${autoplay ? 'var(--accent)' : 'var(--border)'}`,
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                }}
                            >
                                {autoplay ? '⏸ Auto' : '▶ Auto'}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFullscreen();
                                }}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: 'var(--radius-sm)',
                                    background: 'rgba(28, 28, 31, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                }}
                            >
                                ⛶
                            </motion.button>
                        </motion.div>

                        {/* Progress Bar */}
                        {autoplay && !isPlaying && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '3px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <motion.div
                                    style={{
                                        height: '100%',
                                        width: `${progress}%`,
                                        background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))',
                                    }}
                                />
                            </div>
                        )}

                        {/* Video Info Overlay */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: 'var(--space-lg)',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 70%, transparent 100%)',
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                {videos[activeIndex].title}
                            </h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                                {videos[activeIndex].description}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {videos[activeIndex].tags.map((tag, i) => (
                                    <span key={i} className="tag" style={{ fontSize: '0.7rem' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Video Thumbnails */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
                            whileHover={{ scale: 1.05, y: -6 }}
                            onClick={() => {
                                setActiveIndex(index);
                                setIsPlaying(false);
                                setProgress(0);
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
                                    ? '0 0 30px rgba(99, 102, 241, 0.4)'
                                    : 'none',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <video
                                src={video.src}
                                muted
                                preload="metadata"
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
                                        height: 4,
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
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                                }}
                            >
                                <p style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    color: activeIndex === index ? 'var(--accent)' : 'var(--text-secondary)',
                                }}>
                                    {video.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Keyboard Shortcuts Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    style={{
                        marginTop: 'var(--space-lg)',
                        textAlign: 'center',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                    }}
                >
                    💡 Use <kbd style={{ padding: '0.2rem 0.4rem', background: 'var(--bg-card)', borderRadius: '4px' }}>←</kbd> <kbd style={{ padding: '0.2rem 0.4rem', background: 'var(--bg-card)', borderRadius: '4px' }}>→</kbd> to navigate, <kbd style={{ padding: '0.2rem 0.4rem', background: 'var(--bg-card)', borderRadius: '4px' }}>Space</kbd> to play/pause, <kbd style={{ padding: '0.2rem 0.4rem', background: 'var(--bg-card)', borderRadius: '4px' }}>F</kbd> for fullscreen
                </motion.div>
            </div>
        </section>
    );
};

export default VideoShowcase;
