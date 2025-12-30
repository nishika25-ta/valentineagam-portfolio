import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section" style={{ position: 'relative', zIndex: 2 }}>
            <div className="container">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr',
                        gap: '4rem',
                        alignItems: 'center',
                    }}
                >
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{ position: 'relative' }}>
                            <img
                                src="/images/logo/vale_pic.jpg"
                                alt="Valentine Agam"
                                style={{
                                    width: '100%',
                                    aspectRatio: '1/1',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2
                            style={{
                                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                fontWeight: 700,
                                marginBottom: '2rem',
                            }}
                        >
                            About Me
                        </h2>

                        <p
                            style={{
                                fontSize: '1.25rem',
                                fontWeight: 500,
                                marginBottom: '1.5rem',
                                color: 'var(--text-primary)',
                            }}
                        >
                            I'm a passionate tech enthusiast from Miri, Sarawak specializing in Data
                            Analysis, Software Development, Web Development, and UI/UX Design and
                            full-stack dev.
                        </p>

                        <p
                            style={{
                                fontSize: '1.05rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                marginBottom: '1rem',
                            }}
                        >
                            With a background in Cognitive Science, I bring a unique perspective to
                            problem-solving, focusing on user-centric solutions that blend
                            functionality with elegant design. I love exploring the intersection of
                            AI, data, and beautiful interfaces.
                        </p>

                        <p
                            style={{
                                fontSize: '1.05rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                marginBottom: '2.5rem',
                            }}
                        >
                            When I'm not coding or designing, you'll find me exploring the latest tech
                            trends, developing personal projects, and reverse engineering apps to
                            understand how things work. I'm constantly expanding my knowledge to stay
                            ahead in this ever-evolving field. I also love cat/car vroom vroom.
                        </p>

                        {/* Download Resume Button */}
                        <motion.a
                            href="/Valentine_Resume_Latest.pdf"
                            download="Valentine_Agam_Resume.pdf"
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '1rem 2.5rem',
                                background: 'rgba(0, 255, 65, 0.05)',
                                border: '1px solid var(--hacker-green)',
                                borderRadius: '4px',
                                color: 'var(--hacker-green)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                boxShadow: '0 0 15px rgba(0, 255, 65, 0.1)',
                                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--hacker-green)';
                                e.currentTarget.style.color = 'var(--bg-primary)';
                                e.currentTarget.style.boxShadow =
                                    '0 0 30px rgba(0, 255, 65, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 255, 65, 0.05)';
                                e.currentTarget.style.color = 'var(--hacker-green)';
                                e.currentTarget.style.boxShadow =
                                    '0 0 15px rgba(0, 255, 65, 0.1)';
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download Resume
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
