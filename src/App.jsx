import { useState, useEffect } from "react";
import "./index.css";
import CharacterModel from "./components/Character/index.jsx";
import MainContainer from "./components/MainContainer.jsx";
import StarsCanvas from "./components/StarBackground.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import InteractiveCursor from "./components/InteractiveCursor.jsx";

function App() {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.innerWidth <= 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <main className="main-body">
            {/* Only show custom cursor on desktop */}
            {!isMobile && <InteractiveCursor />}
            
            {/* ScrollProgress is lightweight, keep it */}
            <ScrollProgress />
            
            {/* Stars - always show but optimized for mobile */}
            <StarsCanvas isMobile={isMobile} />
            
            <MainContainer isMobile={isMobile}>
                {/* Character - always show but optimized for mobile */}
                <CharacterModel isMobile={isMobile} />
            </MainContainer>
        </main>
    );
}

export default App;
