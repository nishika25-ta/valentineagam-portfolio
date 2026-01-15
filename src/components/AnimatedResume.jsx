import { motion } from 'framer-motion';

const AnimatedResume = ({ href = "/Valentine_Resume_2026.pdf", download = "Valentine_Resume_2026.pdf" }) => {
    return (
        <a
            href={href}
            download={download}
            className="letter-image"
            style={{
                position: 'relative',
                width: '50px',
                height: '50px',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className="animated-mail">
                <div className="back-fold"></div>
                <div className="letter">
                    <div className="letter-border"></div>
                    <div className="letter-title"></div>
                    <div className="letter-context"></div>
                    <div className="letter-stamp">
                        <div className="letter-stamp-inner"></div>
                    </div>
                </div>
                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
            </div>
            <div className="shadow"></div>

            <style>{`
                .letter-image {
                    transform: scale(0.4);
                }

                .animated-mail {
                    position: absolute;
                    height: 150px;
                    width: 200px;
                    transition: .4s;
                }
                
                .animated-mail .body {
                    position: absolute;
                    bottom: 0;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 0 100px 200px;
                    border-color: transparent transparent #6366f1 transparent;
                    z-index: 2;
                }
                
                .animated-mail .top-fold {
                    position: absolute;
                    top: 50px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 50px 100px 0 100px;
                    transform-origin: 50% 0%;
                    transition: transform .4s .4s, z-index .2s .4s;
                    border-color: #4f46e5 transparent transparent transparent;
                    z-index: 2;
                }
                
                .animated-mail .back-fold {
                    position: absolute;
                    bottom: 0;
                    width: 200px;
                    height: 100px;
                    background: #4f46e5;
                    z-index: 0;
                }
                
                .animated-mail .left-fold {
                    position: absolute;
                    bottom: 0;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 50px 0 50px 100px;
                    border-color: transparent transparent transparent #5b52e8;
                    z-index: 2;
                }
                
                .animated-mail .letter {
                    left: 20px;
                    bottom: 0px;
                    position: absolute;
                    width: 160px;
                    height: 60px;
                    background: white;
                    z-index: 1;
                    overflow: hidden;
                    transition: .4s .2s;
                }
                
                .animated-mail .letter .letter-border {
                    height: 10px;
                    width: 100%;
                    background: repeating-linear-gradient(
                        -45deg,
                        #6366f1,
                        #6366f1 8px,
                        transparent 8px,
                        transparent 18px
                    );
                }
                
                .animated-mail .letter .letter-title {
                    margin-top: 10px;
                    margin-left: 5px;
                    height: 10px;
                    width: 40%;
                    background: #6366f1;
                }

                .animated-mail .letter .letter-context {
                    margin-top: 10px;
                    margin-left: 5px;
                    height: 10px;
                    width: 20%;
                    background: #6366f1;
                }
                
                .animated-mail .letter .letter-stamp {
                    margin-top: 30px;
                    margin-left: 120px;
                    border-radius: 100%;
                    height: 30px;
                    width: 30px;
                    background: #6366f1;
                    opacity: 0.3;
                }

                .shadow {
                    position: absolute;
                    top: 200px;
                    left: 50%;
                    width: 400px;
                    height: 30px;
                    transition: .4s;
                    transform: translateX(-50%);
                    border-radius: 100%;
                    background: radial-gradient(rgba(99, 102, 241, 0.3), rgba(0,0,0,0.0), rgba(0,0,0,0.0));
                }

                .letter-image:hover .animated-mail {
                    transform: translateY(50px);
                }
                
                .letter-image:hover .animated-mail .top-fold {
                    transition: transform .4s, z-index .2s;
                    transform: rotateX(180deg);
                    z-index: 0;
                }
                
                .letter-image:hover .animated-mail .letter {
                    height: 180px;
                }
                
                .letter-image:hover .shadow {
                    width: 250px;
                }
            `}</style>
        </a>
    );
};

export default AnimatedResume;
