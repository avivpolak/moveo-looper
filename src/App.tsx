import React, { createRef, useEffect, useRef, useState } from "react";
import "./App.css";
import Controller from "./components/Controller";
import DRUMS from "./media/sounds/DRUMS.mp3";
import BVOC from "./media/sounds/BVOC.mp3";
import HEHEVOC from "./media/sounds/HEHEVOC.mp3";
import HIGHVOC from "./media/sounds/HIGHVOC.mp3";
import JIBRISH from "./media/sounds/JIBRISH.mp3";
import LEAD1 from "./media/sounds/LEAD1.mp3";
import UUHOVOC from "./media/sounds/LEAD1.mp3";
import _tambourine_shake_higher from "./media/sounds/_tambourine_shake_higher.mp3";
import bass from "./media/thisCity/bass.mp3";
import beatbox from "./media/thisCity/beat-box.mp3";
import guitar from "./media/thisCity/guitar.mp3";
import organ from "./media/thisCity/organ.mp3";
import vocal from "./media/thisCity/vocal.mp3";


import Cursor from "./components/Cursor";
const soundsPaths = [
  bass,
  beatbox,
  guitar,
  organ,
  vocal,
];

interface Sounds {
    [key: number]: {
        ref: React.MutableRefObject<HTMLAudioElement | null>;
        sound: string;
        name: string;
        isMuted: boolean;
        color: string;
    };
}

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function App() {
    const getSoundsState = (soundsPaths: string[]) => {
        const sounds: Sounds = {};
        let counter = 0;
        for (let sound of soundsPaths) {
            const name = sound.split("/").pop()!.split(".")[0];
            sounds[counter] = {
                ref: createRef<any>(),
                sound,
                name,
                isMuted: false,
                color: getRandomColor(),
            };
            counter++;
        }
        return sounds;
    };
    const [progress, setProgress] = useState(0);
    const [sounds, setSounds] = useState<Sounds>(getSoundsState(soundsPaths));

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
                                    color={sound.color}
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
