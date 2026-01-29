import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
    BallCollider,
    Physics,
    RigidBody,
    CylinderCollider,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
    "/images/react.webp",
    "/images/next.webp",
    "/images/node.webp",
    "/images/express.webp",
    "/images/mongo.webp",
    "/images/mysql.webp",
    "/images/typescript.webp",
    "/images/javascript.webp",
];

// Keep good geometry quality
const createSphereGeometry = (isMobile) => {
    return new THREE.SphereGeometry(1, isMobile ? 24 : 28, isMobile ? 24 : 28);
};

function SphereGeo({
    vec = new THREE.Vector3(),
    scale,
    r = THREE.MathUtils.randFloatSpread,
    material,
    isActive,
    isMobile,
    geometry,
}) {
    const api = useRef(null);

    useFrame((_state, delta) => {
        if (!isActive) return;
        delta = Math.min(0.1, delta);
        // Reduced force on mobile
        const forceMult = isMobile ? 0.7 : 1;
        const impulse = vec
            .copy(api.current.translation())
            .normalize()
            .multiply(
                new THREE.Vector3(
                    -50 * delta * scale * forceMult,
                    -150 * delta * scale * forceMult,
                    -50 * delta * scale * forceMult
                )
            );

        api.current?.applyImpulse(impulse, true);
    });

    return (
        <RigidBody
            linearDamping={0.75}
            angularDamping={0.15}
            friction={0.2}
            position={[r(20), r(20) - 25, r(20) - 10]}
            ref={api}
            colliders={false}
        >
            <BallCollider args={[scale]} />
            <CylinderCollider
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0, 1.2 * scale]}
                args={[0.15 * scale, 0.275 * scale]}
            />
            <mesh
                castShadow={!isMobile}
                receiveShadow={!isMobile}
                scale={scale}
                geometry={geometry}
                material={material}
                rotation={[0.3, 1, 1]}
            />
        </RigidBody>
    );
}

function Pointer({ vec = new THREE.Vector3(), isActive }) {
    const ref = useRef(null);

    useFrame(({ pointer, viewport }) => {
        if (!isActive) return;
        const targetVec = vec.lerp(
            new THREE.Vector3(
                (pointer.x * viewport.width) / 2,
                (pointer.y * viewport.height) / 2,
                0
            ),
            0.2
        );
        ref.current?.setNextKinematicTranslation(targetVec);
    });

    return (
        <RigidBody
            position={[100, 100, 100]}
            type="kinematicPosition"
            colliders={false}
            ref={ref}
        >
            <BallCollider args={[2]} />
        </RigidBody>
    );
}

const TechStack = () => {
    const [isActive, setIsActive] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.innerWidth <= 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    });

    // Memoize textures
    const textures = useMemo(() => imageUrls.map((url) => textureLoader.load(url)), []);
    
    // Memoize geometry based on mobile state
    const sphereGeometry = useMemo(() => createSphereGeometry(isMobile), [isMobile]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const workElement = document.getElementById("work");
                    if (workElement) {
                        const scrollY = window.scrollY || document.documentElement.scrollTop;
                        const threshold = workElement.getBoundingClientRect().top;
                        setIsActive(scrollY > threshold);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Check if section is in viewport for lazy rendering
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const techSection = document.querySelector('.techstack');
        if (techSection) {
            observer.observe(techSection);
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    // Good quality materials - same on mobile and desktop
    const materials = useMemo(() => {
        return textures.map((texture) => 
            new THREE.MeshPhysicalMaterial({
                map: texture,
                emissive: "#ffffff",
                emissiveMap: texture,
                emissiveIntensity: 0.3,
                metalness: 0.5,
                roughness: 1,
                clearcoat: 0.1,
            })
        );
    }, [textures]);

    // Fewer spheres on mobile (18 vs 30) - still looks good
    const spheres = useMemo(() => {
        const count = isMobile ? 18 : 30;
        return [...Array(count)].map(() => ({
            scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
        }));
    }, [isMobile]);

    return (
        <div className="techstack">
            <h2 className="techstack-title">
                <span className="techstack-gradient">My Techstack</span>
            </h2>

            {isInView && (
                <Canvas
                    shadows={!isMobile}
                    gl={{ 
                        alpha: true, 
                        stencil: false, 
                        depth: false, 
                        antialias: true,
                        powerPreference: 'high-performance',
                    }}
                    camera={{ 
                        position: [0, 0, isMobile ? 22 : 20], 
                        fov: isMobile ? 35 : 32.5, 
                        near: 1, 
                        far: 100 
                    }}
                    onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
                    className="tech-canvas"
                    dpr={Math.min(window.devicePixelRatio, 2)}
                    frameloop={isActive ? "always" : "demand"}
                >
                    <ambientLight intensity={1} />
                    <spotLight
                        position={[20, 20, 25]}
                        penumbra={1}
                        angle={0.2}
                        color="white"
                        castShadow={!isMobile}
                        shadow-mapSize={isMobile ? [256, 256] : [512, 512]}
                    />
                    <directionalLight position={[0, 5, -4]} intensity={2} />
                    <Physics gravity={[0, 0, 0]}>
                        <Pointer isActive={isActive} />
                        {spheres.map((props, i) => (
                            <SphereGeo
                                key={i}
                                {...props}
                                material={materials[i % materials.length]}
                                isActive={isActive}
                                isMobile={isMobile}
                                geometry={sphereGeometry}
                            />
                        ))}
                    </Physics>
                    <Environment
                        files="/models/char_enviorment.hdr"
                        environmentIntensity={isMobile ? 0.3 : 0.5}
                        environmentRotation={[0, 4, 2]}
                    />
                    {/* Disable post-processing on mobile - big performance gain */}
                    {!isMobile && (
                        <EffectComposer enableNormalPass={false}>
                            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
                        </EffectComposer>
                    )}
                </Canvas>
            )}
        </div>
    );
};

export default TechStack;
