import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Controller from "./components/Controller";
import noVocals from "./media/noVocals.mp3";
import vocalsOnly from "./media/vocalsOnly.mp3";
function App() {
    const [loop, setLoop] = useState(false);
    const toggleLoop = () => {
        setLoop(!loop);
    };
    const audioRef1 = useRef<any>(null);
    const audioRef2 = useRef<any>(null);
    const play = () => {
        audioRef1.current.play();
        audioRef2.current.play();
    };
    const pause = () => {
        audioRef1.current.pause();
        audioRef2.current.pause();
    };
    const setStartOver = () => {
        audioRef1.current.currentTime = 0;
        audioRef2.current.currentTime = 0;
    };
    const setAlmostEnd = () => {
        audioRef1.current.currentTime = 150;
        audioRef2.current.currentTime = 150;
    };

    return (
        <div className="App">
            <div className="Looper">
                <div className="contoller1" onClick={play}>
                    play
                </div>
                <div className="contoller1" onClick={pause}>
                    pause
                </div>
                <div className="contoller1" onClick={setStartOver}>
                    setStartOver
                </div>
                <div className="contoller1" onClick={setAlmostEnd}>
                    setAlmostEnd
                </div>
          
                <div className="contoller1" onClick={toggleLoop}>
                    toogleLoop
                </div>
                <div className="bar1">
                    <Controller
                        name="noVocals"
                        sound={noVocals}
                        audioRef={audioRef1}
                        loop={loop}
                    />
                    <Controller
                    className="contoller2"
                        name="vocalsOnly"
                        sound={vocalsOnly}
                        audioRef={audioRef2}
                        loop={loop}
                    />
                </div>
            </div>
        </div>
    );
}
                        

export default App;
