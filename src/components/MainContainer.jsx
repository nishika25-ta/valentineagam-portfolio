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

const MainContainer = ({ children }) => {
    const [isDesktopView, setIsDesktopView] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth > 1024 : false
    );

    useEffect(() => {
        const resizeHandler = () => {
            setIsDesktopView(window.innerWidth > 1024);
            setSplitText();
        };

        resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return (
        <div className="container-main">
            <SocialIcons />
            <BottomNav />

            {/* Desktop-only character */}
            {isDesktopView && children}

            <div id="smooth-wrapper">
                <div id="smooth-content">
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
