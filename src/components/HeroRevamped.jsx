import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';

const HeroRevamped = () => {
    const heroRef = useRef(null);
    const orbsRef = useRef([]);
    const [roleIndex, setRoleIndex] = useState(0);

    const roles = [
        'Full-Stack Developer',
        'UI/UX Designer',
        'AI/ML Engineer',
        'Web Developer',
        'Software Developer',
        'Data Analyst',
    ];

    // Mouse position for 3D tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), springConfig);

    useEffect(() => {
        // Rotate through roles
        const roleInterval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);

        // Animate floating orbs
        orbsRef.current.forEach((orb, i) => {
            if (orb) {
                gsap.to(orb, {
                    y: 'random(-40, 40)',
                    x: 'random(-30, 30)',
                    duration: 'random(4, 7)',
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.3,
                });
            }
        });

        return () => clearInterval(roleInterval);
    }, []);

    const handleMouseMove = (e) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseX.set(e.clientX - centerX);
            mouseY.set(e.clientY - centerY);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: i * 0.03 },
        }),
    };

    const name = "Valentine Agam";

    return (
        <section
            ref={heroRef}
            onMouseMove={handleMouseMove}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6rem 2rem',
                position: 'relative',
                overflow: 'hidden',
                perspective: '1000px',
            }}
        >
            {/* Animated Grid Background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)',
                }}
            />

            {/* Floating Orbs */}
            {[
                { top: '10%', right: '15%', size: 450, color: 'rgba(99, 102, 241, 0.2)', blur: 80 },
                { bottom: '15%', left: '5%', size: 550, color: 'rgba(139, 92, 246, 0.15)', blur: 100 },
                { top: '50%', right: '30%', size: 250, color: 'rgba(99, 102, 241, 0.25)', blur: 50 },
                { top: '30%', left: '20%', size: 180, color: 'rgba(168, 85, 247, 0.2)', blur: 40 },
            ].map((orb, i) => (
                <div
                    key={i}
                    ref={(el) => (orbsRef.current[i] = el)}
                    style={{
                        position: 'absolute',
                        top: orb.top,
                        bottom: orb.bottom,
                        left: orb.left,
                        right: orb.right,
                        width: orb.size,
                        height: orb.size,
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                        borderRadius: '50%',
                        filter: `blur(${orb.blur}px)`,
                        pointerEvents: 'none',
                    }}
                />
            ))}

            {/* Floating Particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, Math.sin(i) * 20, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 5 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                    style={{
                        position: 'absolute',
                        width: 4 + (i % 3) * 2,
                        height: 4 + (i % 3) * 2,
                        background: i % 2 === 0 ? 'var(--accent)' : 'var(--accent-secondary)',
                        borderRadius: '50%',
                        top: `${15 + (i * 7) % 70}%`,
                        left: `${10 + (i * 11) % 80}%`,
                        boxShadow: `0 0 ${10 + i * 2}px ${i % 2 === 0 ? 'var(--accent)' : 'var(--accent-secondary)'}`,
                        pointerEvents: 'none',
                    }}
                />
            ))}

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}
                    >
                        {/* Badge */}
                        <motion.div
                            variants={itemVariants}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.6rem 1.25rem',
                                background: 'rgba(99, 102, 241, 0.1)',
                                border: '1px solid rgba(99, 102, 241, 0.3)',
                                borderRadius: '50px',
                                marginBottom: '2.5rem',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <motion.span
                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    width: 10,
                                    height: 10,
                                    background: '#22c55e',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 10px #22c55e',
                                }}
                            />
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                                Available for work
                            </span>
                        </motion.div>

                        {/* Animated Name - Letter by Letter */}
                        <motion.h1
                            variants={itemVariants}
                            style={{
                                marginBottom: '1.5rem',
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: '0.15em',
                            }}
                        >
                            {name.split('').map((letter, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariants}
                                    whileHover={{
                                        scale: 1.2,
                                        color: 'var(--accent)',
                                        textShadow: '0 0 30px var(--accent)',
                                    }}
                                    style={{
                                        display: 'inline-block',
                                        cursor: 'default',
                                        color: i >= 10 ? 'var(--accent)' : 'var(--text-primary)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </motion.h1>

                        {/* Glitch Role Text */}
                        <motion.div
                            variants={itemVariants}
                            style={{
                                height: '3rem',
                                overflow: 'visible',
                                marginBottom: '1.5rem',
                                position: 'relative',
                            }}
                        >
                            <motion.p
                                key={roleIndex}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="glitch-text-transition"
                                style={{
                                    fontSize: 'clamp(1.3rem, 2.8vw, 1.8rem)',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    color: 'rgba(255,255,255,0.95)',
                                    textTransform: 'uppercase',
                                    position: 'relative',
                                    cursor: 'default',
                                    textShadow: `
                                        1px 1px rgba(246, 0, 153, 0.8),
                                        -1px -1px rgba(15, 210, 255, 0.8),
                                        -1px 0px rgba(255, 210, 0, 1)
                                    `,
                                }}
                            >
                                {roles[roleIndex]}
                            </motion.p>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            style={{
                                fontSize: '1.1rem',
                                color: 'var(--text-muted)',
                                maxWidth: '600px',
                                margin: '0 auto 3rem',
                                lineHeight: 1.8,
                            }}
                        >
                            Crafting beautiful, functional digital experiences that blend
                            cutting-edge technology with elegant design.
                        </motion.p>

                        {/* CTA Buttons with Glow */}
                        <motion.div
                            variants={itemVariants}
                            style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}
                        >
                            <motion.a
                                href="#projects"
                                className="btn btn-primary"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' }}
                                whileTap={{ scale: 0.98 }}
                                style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
                            >
                                <span style={{ position: 'relative', zIndex: 1 }}>View Projects</span>
                            </motion.a>
                            <motion.a
                                href="#about"
                                className="btn btn-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
                            >
                                About Me
                            </motion.a>
                        </motion.div>

                        {/* Scroll Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            style={{
                                marginTop: '5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.75rem',
                            }}
                        >
                            <motion.span
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}
                            >
                                SCROLL TO EXPLORE
                            </motion.span>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                style={{
                                    width: 28,
                                    height: 48,
                                    border: '2px solid var(--border)',
                                    borderRadius: 14,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    paddingTop: 10,
                                }}
                            >
                                <motion.div
                                    animate={{ opacity: [1, 0.2, 1], y: [0, 12, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{
                                        width: 4,
                                        height: 10,
                                        background: 'linear-gradient(180deg, var(--accent), var(--accent-secondary))',
                                        borderRadius: 2,
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* CSS for glitch transition effect */}
            <style>{`
                @keyframes glitch-wiggle {
                    0% { 
                        transform: skewX(24deg);
                        text-shadow: 1px 1px rgba(246, 0, 153, 0.8),
                                   -1px -1px rgba(15, 210, 255, 0.8),
                                   -1px 0px rgba(255, 210, 0, 1);
                    }
                    10% { 
                        transform: skewX(-8deg);
                        text-shadow: -5px 3px rgba(246, 0, 153, 0.9),
                                   3px -2px rgba(15, 210, 255, 0.9),
                                   1px 1px rgba(255, 210, 0, 1);
                    }
                    20% { 
                        transform: skewX(55deg);
                        text-shadow: 8px -4px rgba(246, 0, 153, 1),
                                   -6px 5px rgba(15, 210, 255, 1),
                                   2px -3px rgba(255, 210, 0, 1);
                    }
                    30% { 
                        transform: skewX(-90deg);
                        text-shadow: -12px 8px rgba(246, 0, 153, 1),
                                   10px -6px rgba(15, 210, 255, 1),
                                   -3px 4px rgba(255, 210, 0, 1);
                    }
                    40% { 
                        transform: skewX(29deg);
                        text-shadow: 15px -10px rgba(246, 0, 153, 0.9),
                                   -13px 9px rgba(15, 210, 255, 0.9),
                                   4px -2px rgba(255, 210, 0, 1);
                    }
                    50% { 
                        transform: skewX(-90deg);
                        text-shadow: -20px 15px rgba(246, 0, 153, 1),
                                   18px -12px rgba(15, 210, 255, 1),
                                   -5px 7px rgba(255, 210, 0, 1);
                    }
                    60% { 
                        transform: skewX(3deg);
                        text-shadow: 25px -18px rgba(246, 0, 153, 0.9),
                                   -22px 16px rgba(15, 210, 255, 0.9),
                                   6px -4px rgba(255, 210, 0, 1);
                    }
                    70% { 
                        transform: skewX(-2deg);
                        text-shadow: -10px 8px rgba(246, 0, 153, 0.8),
                                   9px -6px rgba(15, 210, 255, 0.8),
                                   -2px 3px rgba(255, 210, 0, 1);
                    }
                    80% { 
                        transform: skewX(1deg);
                        text-shadow: 5px -4px rgba(246, 0, 153, 0.8),
                                   -4px 3px rgba(15, 210, 255, 0.8),
                                   1px -1px rgba(255, 210, 0, 1);
                    }
                    90% { 
                        transform: skewX(10deg);
                        text-shadow: 2px -2px rgba(246, 0, 153, 0.8),
                                   -2px 2px rgba(15, 210, 255, 0.8),
                                   -1px 1px rgba(255, 210, 0, 1);
                    }
                    100% { 
                        transform: skewX(0deg);
                        text-shadow: 1px 1px rgba(246, 0, 153, 0.8),
                                   -1px -1px rgba(15, 210, 255, 0.8),
                                   -1px 0px rgba(255, 210, 0, 1);
                    }
                }

                .glitch-text-transition {
                    animation: glitch-wiggle 0.4s ease-out;
                }
            `}</style>
        </section>
    );
};

export default HeroRevamped;
