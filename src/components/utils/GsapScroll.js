/* eslint-disable no-undef */
import * as THREE from "three";
import gsap from "gsap";

export function setCharTimeline(character, camera) {
    let intensity = 0;
    setInterval(() => {
        intensity = Math.random();
    }, 200);

    // Timeline 1: Character completely disappears by end of landing section
    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".landing-section",
            start: "top top",
            end: "70% top", // Complete animation at 70% of landing section
            scrub: 1.5,
            invalidateOnRefresh: true,
            onLeave: () => {
                // Ensure character is completely hidden when leaving
                gsap.set(".character-model", { visibility: "hidden", opacity: 0 });
            },
            onEnterBack: () => {
                // Show character when scrolling back up
                gsap.set(".character-model", { visibility: "visible" });
            }
        },
    });

    let screenLight, monitor;
    character?.children.forEach((object) => {
        if (object.name === "Plane004") {
            object.children.forEach((child) => {
                child.material.transparent = true;
                child.material.opacity = 0;
                if (child.material.name === "Material.027") {
                    monitor = child;
                    child.material.color.set("#FFFFFF");
                }
            });
        }
        if (object.name === "screenlight") {
            object.material.transparent = true;
            object.material.opacity = 0;
            object.material.emissive.set("#C8BFFF");
            gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
                emissiveIntensity: () => intensity * 8,
                duration: () => Math.random() * 0.6,
                delay: () => Math.random() * 0.1,
            });
            screenLight = object;
        }
    });

    if (window.innerWidth > 1024) {
        if (character) {
            // Character completely fades out before about section
            tl1
                // Subtle rotation
                .to(
                    character.rotation,
                    { y: 0.1, duration: 1, ease: "sine.out" },
                    0
                )
                // Camera stays relatively stable
                .to(
                    camera.position,
                    { z: 26, duration: 1, ease: "sine.out" },
                    0
                )
                // Character fades to 0 opacity completely
                .to(
                    ".character-model",
                    {
                        opacity: 0,
                        y: "-30%",
                        duration: 1,
                        ease: "power2.inOut"
                    },
                    0
                )
                // Landing text fades
                .to(
                    ".landing-container",
                    {
                        opacity: 0,
                        y: "10%",
                        duration: 0.6,
                        ease: "power1.inOut"
                    },
                    0
                )
                // Rim fades
                .to(
                    ".character-rim",
                    {
                        opacity: 0,
                        duration: 0.5
                    },
                    0
                );
        }
    } else {
        // Mobile: Quick fade
        if (character) {
            tl1
                .to(".landing-container", { opacity: 0, duration: 0.5 }, 0)
                .to(".character-model", { opacity: 0, duration: 0.5 }, 0);
        }
    }
}

export function setAllTimeline() {
    const careerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".career-section",
            start: "top 50%",
            end: "bottom center",
            scrub: 1.5,
            invalidateOnRefresh: true,
        },
    });

    careerTimeline
        .fromTo(
            ".career-timeline",
            { maxHeight: "0%", opacity: 0 },
            { maxHeight: "100%", opacity: 1, duration: 1, ease: "power2.out" },
            0
        )
        .fromTo(
            ".career-info-box",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power2.out" },
            0.2
        )
        .fromTo(
            ".career-dot",
            { scale: 0 },
            { scale: 1, stagger: 0.1, duration: 0.4, ease: "back.out(1.7)" },
            0.3
        );

    if (window.innerWidth > 1024) {
        careerTimeline.fromTo(
            ".career-section",
            { y: 0 },
            { y: "10%", duration: 0.8, ease: "power2.out" },
            0
        );
    }
}
