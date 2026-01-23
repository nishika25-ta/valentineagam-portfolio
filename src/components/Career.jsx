import "./styles/Career.css";

const Career = () => {
    return (
        <div className="career-section section-container">
            <div className="career-container">
                <h2>
                    My career <span>&</span>
                    <br /> experience
                </h2>
                <div className="career-info">
                    <div className="career-timeline">
                        <div className="career-dot"></div>
                    </div>
                    <div className="career-info-box">
                        <div className="career-info-in">
                            <div className="career-role">
                                <h4>Business Development Executive</h4>
                                <h5>Zenara Jaya</h5>
                            </div>
                            <h3>NOW</h3>
                        </div>
                        <p>
                            Leading digital transformation initiatives, replacing legacy systems
                            with scalable SaaS integrations. Bridging technical and business needs
                            using front-end expertise (React, JavaScript) to advise on solution
                            architecture. Boosting SaaS adoption by translating technical features
                            into business outcomes with focus on ROI and long-term scalability.
                        </p>
                    </div>
                    <div className="career-info-box">
                        <div className="career-info-in">
                            <div className="career-role">
                                <h4>Data Analyst Intern</h4>
                                <h5>Sarawak Oil Palms Berhad (SOPB)</h5>
                            </div>
                            <h3>2024</h3>
                        </div>
                        <p>
                            Supported geospatial projects with GIS and Python solutions, optimizing
                            datasets and automating Excel reporting. Developed TensorFlow and
                            YOLO-based machine learning models, achieving 90% accuracy in soil hole
                            detection and 2x faster oil palm identification.
                        </p>
                    </div>
                    <div className="career-info-box">
                        <div className="career-info-in">
                            <div className="career-role">
                                <h4>B.Sc. Cognitive Science</h4>
                                <h5>University Malaysia Sarawak (UNIMAS)</h5>
                            </div>
                            <h3>2022 - 2025</h3>
                        </div>
                        <p>
                            Specialized in Computer Science, Data Science, and Artificial Intelligence.
                            Achieved Dean's List in Year 3, completing coursework in Data Analysis,
                            Software Development, Web Development, and AI. Developed YOLO-based
                            detection models with 92% accuracy as Final Year Project.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Career;
