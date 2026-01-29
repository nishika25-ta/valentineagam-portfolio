import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
    handleMouseMove,
    handleTouchEnd,
    handleHeadRotation,
    handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import Loading from "../Loading";

const Scene = ({ isMobile = false }) => {
    const canvasDiv = useRef(null);
    const hoverDivRef = useRef(null);
    const sceneRef = useRef(new THREE.Scene());
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [character, setChar] = useState(null);
    
    useEffect(() => {
        // Cleanup flag to prevent duplicate scenes in React StrictMode
        let isCleanedUp = false;
        let animationFrameId = null;
        let lastFrameTime = 0;
        // Target 30fps on mobile, 60fps on desktop
        const targetFPS = isMobile ? 30 : 60;
        const frameInterval = 1000 / targetFPS;

        if (canvasDiv.current) {
            const rect = canvasDiv.current.getBoundingClientRect();
            const container = { width: rect.width, height: rect.height };
            const aspect = container.width / container.height;
            const scene = sceneRef.current;

            const renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true, // Keep antialias for quality
                preserveDrawingBuffer: true,
                powerPreference: 'high-performance',
            });
            renderer.setSize(container.width, container.height);
            // Use device pixel ratio but cap at 2 for performance
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;

            // Handle WebGL context loss
            const canvas = renderer.domElement;
            canvas.addEventListener('webglcontextlost', (event) => {
                event.preventDefault();
                console.warn('WebGL context lost. Waiting for restoration...');
            }, false);

            canvas.addEventListener('webglcontextrestored', () => {
                console.log('WebGL context restored.');
                renderer.render(scene, camera);
            }, false);

            canvasDiv.current.appendChild(renderer.domElement);

            // Camera settings - same for both mobile and desktop for consistent quality
            const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
            camera.position.z = 10;
            camera.position.set(0, 13.1, 24.7);
            camera.zoom = 1.1;
            camera.updateProjectionMatrix();

            let headBone = null;
            let screenLight = null;
            let mixer;

            const clock = new THREE.Clock();

            // Track visibility state for animation loop
            let isVisible = true;

            const light = setLighting(scene, isMobile);

            // Progress callback for actual model loading
            const onProgress = (progress) => {
                setLoadingProgress(Math.round(progress));
                if (progress >= 100) {
                    // Shorter wait on mobile
                    setTimeout(() => {
                        if (!isCleanedUp) {
                            setIsLoading(false);
                        }
                    }, isMobile ? 2000 : 3500);
                }
            };

            const { loadCharacter } = setCharacter(
                renderer,
                scene,
                camera,
                onProgress
            );

            loadCharacter().then((gltf) => {
                if (gltf && !isCleanedUp) {
                    const animations = setAnimations(gltf);
                    hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
                    mixer = animations.mixer;
                    const character = gltf.scene;
                    setChar(character);
                    scene.add(character);
                    headBone = character.getObjectByName("spine006") || null;
                    screenLight = character.getObjectByName("screenlight") || null;

                    // Store initial head rotation to prevent flickering
                    if (headBone) {
                        headBone.userData.initialRotation = {
                            x: headBone.rotation.x,
                            y: headBone.rotation.y
                        };
                        headBone.userData.trackingEnabled = false;
                    }

                    // Model fully loaded, wait a bit before turning on lights and starting intro
                    setTimeout(() => {
                        if (!isCleanedUp) {
                            light.turnOnLights();
                            animations.startIntro();

                            // Enable head tracking after intro animation completes
                            setTimeout(() => {
                                if (headBone && !isCleanedUp) {
                                    headBone.userData.trackingEnabled = true;
                                }
                            }, isMobile ? 1500 : 2500);
                        }
                    }, isMobile ? 1000 : 1500);

                    window.addEventListener("resize", () =>
                        handleResize(renderer, camera, canvasDiv, character)
                    );
                }
            });

            let mouse = { x: 0, y: 0 },
                interpolation = { x: 0.1, y: 0.2 };

            // Throttled mouse move handler for mobile
            let mouseMoveRaf = null;
            const onMouseMove = (event) => {
                if (isMobile && mouseMoveRaf) return;
                
                if (isMobile) {
                    mouseMoveRaf = requestAnimationFrame(() => {
                        handleMouseMove(event, (x, y) => (mouse = { x, y }));
                        mouseMoveRaf = null;
                    });
                } else {
                    handleMouseMove(event, (x, y) => (mouse = { x, y }));
                }
            };
            
            let debounce;
            const onTouchStart = (event) => {
                const element = event.target;
                debounce = setTimeout(() => {
                    element?.addEventListener("touchmove", (e) =>
                        handleTouchMove(e, (x, y) => (mouse = { x, y }))
                    , { passive: true });
                }, 200);
            };

            const onTouchEnd = () => {
                handleTouchEnd((x, y, interpolationX, interpolationY) => {
                    mouse = { x, y };
                    interpolation = { x: interpolationX, y: interpolationY };
                });
            };

            document.addEventListener("mousemove", onMouseMove, { passive: true });
            const landingDiv = document.getElementById("landingDiv");
            if (landingDiv) {
                landingDiv.addEventListener("touchstart", onTouchStart, { passive: true });
                landingDiv.addEventListener("touchend", onTouchEnd, { passive: true });
            }
            
            const animate = (currentTime) => {
                // Stop animation loop if component is cleaned up
                if (isCleanedUp) return;

                animationFrameId = requestAnimationFrame(animate);

                // Frame rate limiting for mobile
                if (isMobile) {
                    const elapsed = currentTime - lastFrameTime;
                    if (elapsed < frameInterval) return;
                    lastFrameTime = currentTime - (elapsed % frameInterval);
                }

                // Always get delta first to prevent accumulation
                const delta = clock.getDelta();

                // Cap delta to prevent issues from large time jumps
                const safeDelta = Math.min(delta, 0.1);

                // Only update animations when visible (performance optimization)
                if (isVisible) {
                    if (headBone && headBone.userData.trackingEnabled) {
                        handleHeadRotation(
                            headBone,
                            mouse.x,
                            mouse.y,
                            interpolation.x,
                            interpolation.y,
                            THREE.MathUtils.lerp
                        );
                        light.setPointLight(screenLight);
                    }
                    if (mixer) {
                        mixer.update(safeDelta);
                    }
                }

                // Always render to keep WebGL context alive
                renderer.render(scene, camera);
            };
            animate(0);

            // Scroll-based show/hide for the character
            let scrollTicking = false;
            const handleScroll = () => {
                if (!scrollTicking) {
                    requestAnimationFrame(() => {
                        if (canvasDiv.current) {
                            const scrollY = window.scrollY;
                            // Threshold where the hero section ends
                            const heroEndThreshold = window.innerHeight * (isMobile ? 0.7 : 0.5);

                            // Binary visibility: fully visible in hero, hidden elsewhere
                            const shouldBeVisible = scrollY < heroEndThreshold;

                            // Update visibility flag for animation loop
                            isVisible = shouldBeVisible;

                            // Hide/show using Three.js model visibility
                            if (character) {
                                character.visible = shouldBeVisible;
                            }

                            // Only disable pointer events when hidden
                            canvasDiv.current.style.pointerEvents = shouldBeVisible ? 'auto' : 'none';
                        }
                        scrollTicking = false;
                    });
                    scrollTicking = true;
                }
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            // Run immediately to set initial state
            handleScroll();

            return () => {
                // Set cleanup flag immediately
                isCleanedUp = true;

                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                if (mouseMoveRaf) {
                    cancelAnimationFrame(mouseMoveRaf);
                }
                clearTimeout(debounce);
                scene.clear();
                renderer.dispose();
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener("resize", () =>
                    handleResize(renderer, camera, canvasDiv, character)
                );
                if (canvasDiv.current && canvasDiv.current.contains(renderer.domElement)) {
                    canvasDiv.current.removeChild(renderer.domElement);
                }
                if (landingDiv) {
                    document.removeEventListener("mousemove", onMouseMove);
                    landingDiv.removeEventListener("touchstart", onTouchStart);
                    landingDiv.removeEventListener("touchend", onTouchEnd);
                }
            };
        }
    }, [isMobile]);

    return (
        <>
            {isLoading && <Loading percent={loadingProgress} />}
            <div className="character-container">
                <div className="character-model" ref={canvasDiv}>
                    <div className="character-rim"></div>
                    <div className="character-hover" ref={hoverDivRef}></div>
                </div>
            </div>
        </>
    );
};

export default Scene;
