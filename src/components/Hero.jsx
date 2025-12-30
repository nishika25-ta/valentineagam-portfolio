import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
    return (
        <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial
                color="#9F55FF"
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0.4}
            />
        </Sphere>
    );
};

const Hero = () => {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const words = ['UI/UX Designer', 'Data Analyst', 'Software Developer', 'Full-Stack Developer'];

    useEffect(() => {
        const currentWord = words[wordIndex];
        const shouldDelete = !isDeleting && text === currentWord;
        const shouldSwitch = isDeleting && text === '';

        if (shouldSwitch) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
            return;
        }

        if (shouldDelete) {
            setTimeout(() => setIsDeleting(true), 2000);
            return;
        }

        const timeout = setTimeout(
            () => {
                setText(
                    isDeleting
                        ? currentWord.substring(0, text.length - 1)
                        : currentWord.substring(0, text.length + 1)
                );
            },
            isDeleting ? 75 : 150
        );

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    const scrollToWork = () => {
        const element = document.getElementById('work');
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
        <section
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '8rem 2rem 4rem',
                overflow: 'hidden',
            }}
        >
            {/* 3D Background */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: '10%',
                    width: '50%',
                    height: '100%',
                    opacity: 0.3,
                    pointerEvents: 'none',
                }}
            >
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <AnimatedSphere />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    textAlign: 'center',
                    zIndex: 2,
                    position: 'relative',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                <motion.h1
                    variants={itemVariants}
                    style={{
                        fontSize: 'clamp(3rem, 7vw, 5rem)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        marginBottom: '1rem',
                    }}
                >
                    HI! I'm <span className="gradient-text">Valentine Agam</span>
                </motion.h1>

                <motion.h2
                    variants={itemVariants}
                    style={{
                        fontSize: 'clamp(1.2rem, 3vw, 1.75rem)',
                        color: 'var(--text-secondary)',
                        marginBottom: '1.5rem',
                        minHeight: '2.5rem',
                    }}
                >
                    I'm a{' '}
                    <span
                        style={{
                            color: 'var(--accent-purple)',
                            fontWeight: 600,
                        }}
                    >
                        {text}
                    </span>
                    <span
                        style={{
                            display: 'inline-block',
                            width: '4px',
                            height: '1.2em',
                            background: 'var(--accent-purple)',
                            marginLeft: '2px',
                            animation: 'blink 1s infinite',
                            verticalAlign: 'middle',
                        }}
                    />
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '600px',
                        margin: '0 auto 2.5rem',
                    }}
                >
                    Designing efficient and aesthetic digital experiences and developing
                    software that solve real-world problems.
                </motion.p>

                <motion.div variants={itemVariants}>
                    <button
                        onClick={scrollToWork}
                        className="btn btn-primary"
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        View My Work
                    </button>
                </motion.div>
            </motion.div>

            {/* Gradient Orbs */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(159, 85, 255, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    animation: 'float 8s ease-in-out infinite',
                    pointerEvents: 'none',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '15%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(0, 245, 255, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    animation: 'float 10s ease-in-out infinite reverse',
                    pointerEvents: 'none',
                }}
            />
        </section>
    );
};

export default Hero;
