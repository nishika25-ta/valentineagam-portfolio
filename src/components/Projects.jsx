import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projectsData } from '../data/projectsData';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const completedProjects = projectsData.filter(p => !p.status);
    const ongoingProjects = projectsData.filter(p => p.status === 'In Progress');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <section id="work" className="section" style={{ position: 'relative', zIndex: 2 }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '4rem', textAlign: 'center' }}
                >
                    <h2 className="section-title">Valentine's Projects</h2>
                    <p
                        style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.1rem',
                            maxWidth: '600px',
                            margin: '0 auto',
                        }}
                    >
                        A showcase of my recent work in AI, software development, and design.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2rem',
                    }}
                >
                    {completedProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </motion.div>

                {/* Ongoing Projects Section */}
                {ongoingProjects.length > 0 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ marginTop: '6rem', marginBottom: '4rem', textAlign: 'center' }}
                        >
                            <h2 className="section-title">Ongoing Development</h2>
                            <p
                                style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '1.1rem',
                                    maxWidth: '600px',
                                    margin: '0 auto',
                                }}
                            >
                                A peek into what I'm currently building. These projects are in active
                                development.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                                gap: '2rem',
                            }}
                        >
                            {ongoingProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => setSelectedProject(project)}
                                />
                            ))}
                        </motion.div>
                    </>
                )}
            </div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

export default Projects;
