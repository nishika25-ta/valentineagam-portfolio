import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
    const [loaderText, setLoaderText] = useState('');
    const [showName, setShowName] = useState(false);
    const [nameText, setNameText] = useState('');
    const [showAccess, setShowAccess] = useState(false);

    const messages = [
        'Initializing kernel...',
        'Establishing secure link...',
        'Scanning for Nasi Lemak...',
        'Bypassing firewalls...',
        'Patting the cats...',
        'Killing the bots...',
        'Accessing portfolio...',
        'Loading complete.'
    ];

    const finalName = 'Valentine Agam';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&%$#@!';

    useEffect(() => {
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (messageIndex < messages.length) {
                setLoaderText(`> ${messages[messageIndex]}`);
                messageIndex++;
            } else {
                clearInterval(messageInterval);
                setShowName(true);

                // Start name scramble animation
                let iterations = 0;
                const nameInterval = setInterval(() => {
                    setNameText(
                        finalName
                            .split('')
                            .map((letter, index) => {
                                if (index < iterations) {
                                    return finalName[index];
                                }
                                return chars[Math.floor(Math.random() * chars.length)];
                            })
                            .join('')
                    );

                    if (iterations >= finalName.length) {
                        clearInterval(nameInterval);
                        setTimeout(() => setShowAccess(true), 300);
                    }

                    iterations += 1;
                }, 40);
            }
        }, 200);

        return () => clearInterval(messageInterval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'var(--bg-primary)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
            }}
        >
            <div style={{ textAlign: 'center', maxWidth: '600px', padding: '2rem' }}>
                <motion.div
                    style={{
                        fontSize: '1rem',
                        color: 'var(--hacker-green)',
                        marginBottom: '1.5rem',
                        height: '1.5em',
                    }}
                >
                    {loaderText}
                </motion.div>

                {showName && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                            fontWeight: 700,
                            color: 'var(--hacker-green)',
                            textShadow: '0 0 5px var(--hacker-green), 0 0 10px var(--hacker-red)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        {nameText || finalName}
                    </motion.div>
                )}

                {showAccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: 'var(--hacker-red)',
                            letterSpacing: '2px',
                            textShadow: '0 0 8px var(--hacker-red)',
                        }}
                    >
                        [ACCESS GRANTED]
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Preloader;
