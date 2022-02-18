import { useEffect, useState } from "react";
import "./App.css";
import Channel from "./components/Channel";
import Cursor from "./components/Cursor";
import {
    getCurrentDuration,
    getCurrentTime,
    getSoundsState,
    pause,
    setStartOver,
    toggleMute,
} from "./utils/looper";
import { Sounds } from "./types/looper";
import soundPaths from "./songs/soundPaths";
import ControlPanel from "./components/ControlPanel";

function App() {
    const [song, setSong] = useState(soundPaths["default"]);
    const [progress, setProgress] = useState(0);
    const [sounds, setSounds] = useState<Sounds>(getSoundsState(song));
    const [loop, setLoop] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = getCurrentTime(0, sounds);
            const duration = getCurrentDuration(0, sounds);
            if (currentTime && duration) {
                setProgress(10.3 + (currentTime / duration) * 89.7);
                if (progress >= 100) {
                    if (!loop) {
                        pause(sounds, setIsPlaying);
                    }
                    setStartOver(setProgress, sounds);
                }
            }
        }, 1);
        return () => clearInterval(interval);
    }, [sounds]);
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = getCurrentTime(0, sounds);
            Object.entries(sounds).forEach(([id, sound]) => {
                setSounds({
                    ...sounds,
                    [id]: { ...sound, currentTime },
                });
            }, 1);
        });
        return () => clearInterval(interval);
    }, [sounds]);
    useEffect(() => {
        setSounds(getSoundsState(song));
    }, [song]);

    return (
        <div className="App">
            <div>
                <ControlPanel
                    setFunctions={{
                        setProgress,
                        setSong,
                        setLoop,
                        setIsPlaying,
                    }}
                    states={{ soundPaths, sounds, loop, isPlaying }}
                />
                <div className="looper">
                    <Cursor
                        precentage={progress}
                        numberOfChannels={Object.keys(sounds).length}
                    />
                    {Object.entries(sounds).map(
                        ([id, sound], index: number) => {
                            return (
                                <Channel
                                    key={index}
                                    id={id}
                                    color={sound.color}
                                    name={sound.name}
                                    sound={sound.sound}
                                    audioRef={sound.ref}
                                    isMuted={sound.isMuted}
                                    loop={loop}
                                    toggleMute={() => {
                                        toggleMute(
                                            Number(id),
                                            sounds,
                                            setSounds
                                        );
                                    }}
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
