import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Controller from "./components/Controller";
import DRUMS from "./media/DRUMS.mp3";
import BVOC from "./media/BVOC.mp3";
import HEHEVOC from "./media/HEHEVOC.mp3";
import HIGHVOC from "./media/HIGHVOC.mp3";
import JIBRISH from "./media/JIBRISH.mp3";
import LEAD1 from "./media/LEAD1.mp3";
import UUHOVOC from "./media/LEAD1.mp3";
import _tambourine_shake_higher from "./media/_tambourine_shake_higher.mp3";

function App() {
    const [loop, setLoop] = useState(false);
    const toggleLoop = () => {
        setLoop(!loop);
    };

    const [sounds, setRefs] = useState<any>([
        { ref: useRef<any>(null), sound: DRUMS, name: "Drums" },
        { ref: useRef<any>(null), sound: BVOC, name: "BVOC" },
        { ref: useRef<any>(null), sound: HEHEVOC, name: "HEHEVOC" },
        { ref: useRef<any>(null), sound: HIGHVOC, name: "HIGHVOC" },
        { ref: useRef<any>(null), sound: JIBRISH, name: "JIBRISH" },
        { ref: useRef<any>(null), sound: LEAD1, name: "LEAD1" },
        { ref: useRef<any>(null), sound: UUHOVOC, name: "UUHOVOC" },
        {
            ref: useRef<any>(null),
            sound: _tambourine_shake_higher,
            name: "_tambourine_shake_higher",
        },
    ]);
    const play = () => {
        for (const sound of sounds) {
            sound.ref.current.play();
        }
    };
    const pause = () => {
        for (const sound of sounds) {
            sound.ref.current.pause();
        }
    };
    const setStartOver = () => {
        for (const sound of sounds) {
            sound.ref.current.currentTime = 0;
        }
    };
    const setAlmostEnd = () => {
        for (const sound of sounds) {
            sound.ref.current.currentTime = 15;
        }
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
                    {sounds.map((sound: any, index: number) => {
                        return (
                            <Controller
                                key={index}
                                name={sound.name}
                                sound={sound.sound}
                                audioRef={sound.ref}
                                loop={loop}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
