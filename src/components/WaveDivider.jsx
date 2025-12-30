import { motion } from 'framer-motion';

const WaveDivider = ({ flip = false, color = 'var(--bg-secondary)' }) => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '80px',
                overflow: 'hidden',
                transform: flip ? 'rotate(180deg)' : 'none',
            }}
        >
            <motion.svg
                initial={{ x: 0 }}
                animate={{ x: [0, -100, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                viewBox="0 0 1440 80"
                preserveAspectRatio="none"
                style={{
                    position: 'absolute',
                    width: '200%',
                    height: '100%',
                }}
            >
                <path
                    fill={color}
                    d="M0,40 C360,80 720,0 1080,40 C1260,60 1350,60 1440,40 L1440,80 L0,80 Z
                       M1440,40 C1800,80 2160,0 2520,40 C2700,60 2790,60 2880,40 L2880,80 L1440,80 Z"
                />
            </motion.svg>
        </div>
    );
};

export default WaveDivider;
