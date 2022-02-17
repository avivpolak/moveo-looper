import React, { useEffect, useRef, useState } from "react";
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
import Cursor from "./components/Cursor";
interface Sounds {
    [key: number]: {
        ref: React.MutableRefObject<HTMLAudioElement | null>;
        sound: string;
        name: string;
        isMuted: boolean;
    };
}
function App() {
    const [progress, setProgress] = useState(0);
    const [sounds, setSounds] = useState<Sounds>({
        1: {
            ref: useRef<any>(null),
            sound: DRUMS,
            name: "Drums",
            isMuted: false,
        },
        2: {
            ref: useRef<any>(null),
            sound: BVOC,
            name: "BVOC",
            isMuted: false,
        },
        3: {
            ref: useRef<any>(null),
            sound: HEHEVOC,
            name: "HEHEVOC",
            isMuted: false,
        },
        4: {
            ref: useRef<any>(null),
            sound: HIGHVOC,
            name: "HIGHVOC",
            isMuted: false,
        },
        5: {
            ref: useRef<any>(null),
            sound: JIBRISH,
            name: "JIBRISH",
            isMuted: false,
        },
        6: {
            ref: useRef<any>(null),
            sound: LEAD1,
            name: "LEAD1",
            isMuted: false,
        },
        7: {
            ref: useRef<any>(null),
            sound: UUHOVOC,
            name: "UUHOVOC",
            isMuted: false,
        },
        8: {
            ref: useRef<any>(null),
            sound: _tambourine_shake_higher,
            name: "_tambourine_shake_higher",
            isMuted: false,
        },
    });
    const getCurrentTime = (id: number) => {
        if (sounds[id].ref.current) {
            return sounds[id]?.ref?.current?.currentTime;
        }
        return 0;
    };
    const getCurrentDuration = (id: number) => {
        if (sounds[id].ref.current) {
            return sounds[id]?.ref?.current?.duration;
        }
        return 0;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = getCurrentTime(1);
            const duration = getCurrentDuration(1);
            if (currentTime && duration) {
                setProgress((currentTime / duration) * 100);
            }
        }, 1);
        return () => clearInterval(interval);
    }, [sounds]);

    const [loop, setLoop] = useState(false);

    const toggleLoop = () => {
        setLoop(!loop);
    };

    const play = () => {
        for (const sound of Object.values(sounds)) {
            sound.ref.current.play();
        }
    };
    const pause = () => {
        for (const sound of Object.values(sounds)) {
            sound.ref.current.pause();
        }
    };
    const setStartOver = () => {
        for (const sound of Object.values(sounds)) {
            sound.ref.current.currentTime = 0;
        }
        setProgress(0);
    };
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const setAlmostEnd = () => {
        for (const sound of Object.values(sounds)) {
            sound.ref.current.currentTime = 15;
        }
    };
    const toggleMute = (id: number) => {
        setSounds({
            ...sounds,
            [id]: { ...sounds[id], isMuted: !sounds[id].isMuted },
        });
    };
    return (
        <div className="App">
            <div className="play_bar">
                <div className="_3" onClick={play}>
                    play
                </div>
                <div className="_2" onClick={pause}>
                    pause
                </div>
                <div className="Ellipse_1" onClick={setStartOver}>
                    setStartOver
                </div>
                <div className="contoller1" onClick={setAlmostEnd}>
                    setAlmostEnd
                </div>
                <div className="contoller1" onClick={toggleLoop}>
                    {loop ? "set no loop" : "set loop"}
                </div>
                <div className="bar1">
                    <Cursor precentage={progress} />
                    {Object.entries(sounds).map(
                        ([id, sound], index: number) => {
                            return (
                                <Controller
                                    color={getRandomColor()}
                                    id={id}
                                    key={index}
                                    name={sound.name}
                                    sound={sound.sound}
                                    audioRef={sound.ref}
                                    isMuted={sound.isMuted}
                                    loop={loop}
                                    toggleMute={toggleMute}
                                />
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
