import React, { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

const StarBackground = ({ isMobile }) => {
    const ref = useRef();
    
    // Reduce star count on mobile (1500 vs 5000) - still looks good
    const sphere = useMemo(() => {
        const count = isMobile ? 1500 : 5000;
        return random.inSphere(new Float32Array(count * 3), { radius: 1.2 });
    }, [isMobile]);

    useFrame((state, delta) => {
        if (ref.current) {
            // Much slower rotation on mobile
            const speed = isMobile ? 0.3 : 1;
            ref.current.rotation.x -= (delta / 10) * speed;
            ref.current.rotation.y -= (delta / 15) * speed;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled
            >
                <PointMaterial
                    transparent
                    color="#fff"
                    size={isMobile ? 0.003 : 0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const StarsCanvas = ({ isMobile }) => (
    <div
        style={{
            width: '100%',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -10,
            pointerEvents: 'none',
            backgroundColor: 'black'
        }}
    >
        <Canvas 
            camera={{ position: [0, 0, 1] }}
            // Keep quality, optimize elsewhere
            dpr={Math.min(window.devicePixelRatio, 2)}
            gl={{ 
                antialias: true,
                powerPreference: 'high-performance',
                alpha: true,
            }}
        >
            <Suspense fallback={null}>
                <StarBackground isMobile={isMobile} />
            </Suspense>
        </Canvas>
    </div>
);

export default StarsCanvas;
