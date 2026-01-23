import "./index.css";
import CharacterModel from "./components/Character/index.jsx";
import MainContainer from "./components/MainContainer.jsx";
import StarsCanvas from "./components/StarBackground.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import InteractiveCursor from "./components/InteractiveCursor.jsx";

function App() {
    return (
        <main className="main-body">
            <InteractiveCursor />
            <ScrollProgress />
            <StarsCanvas />
            <MainContainer>
                <CharacterModel />
            </MainContainer>
        </main>
    );
}

export default App;

