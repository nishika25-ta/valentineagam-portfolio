import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const VantaBackground = () => {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        const loadVanta = async () => {
            if (!vantaEffect && vantaRef.current) {
                try {
                    // Dynamically import VANTA
                    const VANTA = await import('vanta/dist/vanta.clouds2.min');

                    const effect = VANTA.default({
                        el: vantaRef.current,
                        THREE: THREE,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        backgroundColor: 0x000000,
                        skyColor: 0x0a0a0f,
                        cloudColor: 0x1a1a2e,
                        cloudShadowColor: 0x0d0d12,
                        sunColor: 0x6366f1,
                        sunGlareColor: 0x8b5cf6,
                        sunlightColor: 0x4f46e5,
                        speed: 0.8,
                    });
                    setVantaEffect(effect);
                } catch (error) {
                    console.error('Error loading Vanta:', error);
                }
            }
        };

        loadVanta();

        return () => {
            if (vantaEffect) {
                vantaEffect.destroy();
            }
        };
    }, [vantaEffect]);

    return (
        <div
            ref={vantaRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
};

export default VantaBackground;
