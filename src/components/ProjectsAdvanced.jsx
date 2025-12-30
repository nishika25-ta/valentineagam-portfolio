import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const ProjectsAdvanced = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    const completedProjects = projectsData.filter((p) => !p.status);

    useEffect(() => {
        // GSAP scroll animations
        cardsRef.current.forEach((card, i) => {
            if (card) {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                        delay: i * 0.1,
                    }
                );
            }
        });
    }, []);

    return (
        <section id="projects" className="section" ref={sectionRef}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: 'var(--space-2xl)' }}
                >
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{
                            display: 'inline-block',
                            fontSize: '0.85rem',
                            color: 'var(--accent)',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            marginBottom: '0.75rem',
                        }}
                    >
                        FEATURED WORK
                    </motion.span>
                    <h2 style={{ marginBottom: 'var(--space-sm)' }}>
                        Selected <span className="text-gradient">Projects</span>
                    </h2>
                    <p style={{ maxWidth: '550px', fontSize: '1.05rem' }}>
                        A collection of my recent work spanning AI, mobile development, and full-stack solutions.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                        gap: 'var(--space-lg)',
                    }}
                >
                    {completedProjects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="card"
                            onClick={() => setSelectedProject(project)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {/* Project Image */}
                            <div
                                style={{
                                    width: '100%',
                                    aspectRatio: '16 / 10',
                                    background: project.bgWhite ? '#f5f5f5' : 'var(--bg-elevated)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                <motion.img
                                    src={project.image}
                                    alt={project.shortTitle}
                                    animate={{
                                        scale: hoveredIndex === index ? 1.08 : 1,
                                    }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    style={{
                                        width: project.imageContain ? '55%' : '100%',
                                        height: project.imageContain ? 'auto' : '100%',
                                        maxHeight: project.imageContain ? '75%' : 'none',
                                        objectFit: project.imageContain ? 'contain' : 'cover',
                                        borderRadius: 'var(--radius-md)',
                                    }}
                                />

                                {/* Hover Overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(9, 9, 11, 0.9) 0%, transparent 50%)',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                        paddingBottom: '1rem',
                                    }}
                                >
                                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--accent)' }}>
                                        View Details →
                                    </span>
                                </motion.div>
                            </div>

                            {/* Project Info */}
                            <div style={{ padding: 'var(--space-md)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                {/* Tags */}
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 'var(--space-sm)' }}>
                                    {project.keywords.slice(0, 2).map((keyword, i) => (
                                        <span key={i} className="tag">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    {project.shortTitle}
                                </h3>

                                {/* Description */}
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, flex: 1 }}>
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

export default ProjectsAdvanced;
