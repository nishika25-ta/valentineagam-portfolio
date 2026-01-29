import { useEffect, useState } from "react";

import About from "./About";
import Career from "./Career";
import Landing from "./Landing";
import SocialIcons from "./SocialIcons";
import Projects from "./Projects";
import setSplitText from "./utils/splitText";
import TechStack from "./TechStack";
import BottomNav from "./BottomNav";
import CTASection from "./CTASection";
import Footer from "./Footer";

const MainContainer = ({ children, isMobile: isMobileProp }) => {
    const [isDesktopView, setIsDesktopView] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.innerWidth > 1024 && !('ontouchstart' in window) && navigator.maxTouchPoints === 0;
    });

    useEffect(() => {
        let resizeTimeout;
        
        const resizeHandler = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const isDesktop = window.innerWidth > 1024 && !('ontouchstart' in window) && navigator.maxTouchPoints === 0;
                setIsDesktopView(isDesktop);
                setSplitText();
            }, 150);
        };

        // Initial call
        const isDesktop = window.innerWidth > 1024 && !('ontouchstart' in window) && navigator.maxTouchPoints === 0;
        setIsDesktopView(isDesktop);
        setSplitText();
        
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <div className="container-main">
            <SocialIcons />
            <BottomNav />

            {/* Character - show on desktop (fixed position) */}
            {isDesktopView && children}

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    {/* On mobile, character is inside Landing section */}
                    <Landing>{!isDesktopView && children}</Landing>
                    <About />
                    <Career />
                    <Projects />
                    <TechStack />
                    <CTASection />
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
