import { useEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";

import Logo from "/images/logo.png";

import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// Export a smoother-like interface for compatibility
export let smoother = {
    paused: () => { },
    scrollTop: () => { },
    scrollTo: () => { },
    _lenis: null,
};

const Navbar = () => {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Detect mobile/touch devices
        const isMobile = window.innerWidth <= 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Only initialize Lenis on desktop for better mobile performance
        if (isMobile) {
            // On mobile, use native smooth scroll
            smoother = {
                paused: () => {},
                scrollTop: (value) => {
                    if (typeof value === "number") {
                        window.scrollTo({ top: value, behavior: 'smooth' });
                    }
                },
                scrollTo: (target, smooth = true) => {
                    const element = typeof target === 'string' ? document.querySelector(target) : target;
                    if (element) {
                        element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
                    }
                },
                _lenis: null,
            };
            return;
        }

        // Initialize Lenis for smooth scrolling (desktop only)
        const lenis = new Lenis({
            duration: 1.2, // Reduced from 1.7 for better performance
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            smoothTouch: false, // Disable on touch devices
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Update the exported smoother object for compatibility
        smoother = {
            paused: (value) => {
                if (value === true) {
                    lenis.stop();
                } else if (value === false) {
                    lenis.start();
                }
            },
            scrollTop: (value) => {
                if (typeof value === "number") {
                    lenis.scrollTo(value, { immediate: true });
                }
            },
            scrollTo: (target, smooth = true) => {
                lenis.scrollTo(target, { immediate: !smooth });
            },
            _lenis: lenis,
        };

        // Initially pause scrolling
        lenis.stop();

        const links = document.querySelectorAll(".header ul a");
        links.forEach((elem) => {
            const element = elem;
            element.addEventListener("click", (e) => {
                if (window.innerWidth > 1024) {
                    e.preventDefault();
                    const section = elem.getAttribute("data-href");
                    lenis.scrollTo(section);
                }
            });
        });

        window.addEventListener("resize", () => {
            ScrollTrigger.refresh(true);
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <div className="header">
                <a href="/#" className="navbar-title" data-cursor="disable">
                    <img
                        src={Logo}
                        alt="Logo"
                        width={50}
                        style={{
                            filter: "invert(100%)",
                        }}
                    />
                </a>

                <ul>
                    <li>
                        <a data-href="#about" href="#about">
                            <HoverLinks text="ABOUT" />
                        </a>
                    </li>
                    <li>
                        <a data-href="#work" href="#work">
                            <HoverLinks text="WORK" />
                        </a>
                    </li>
                    <li>
                        <a data-href="#contact" href="#contact">
                            <HoverLinks text="CONTACT" />
                        </a>
                    </li>
                </ul>
            </div>

            <div className="landing-circle1"></div>
            <div className="landing-circle2"></div>
            <div className="nav-fade"></div>
        </>
    );
};

export default Navbar;
