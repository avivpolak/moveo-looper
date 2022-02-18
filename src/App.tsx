import { useEffect, useState } from "react";
import "./App.css";
import Channel from "./components/Channel";
import Cursor from "./components/Cursor";
import {
    getCurrentDuration,
    getCurrentTime,
    getSoundsState,
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

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = getCurrentTime(0, sounds);
            const duration = getCurrentDuration(0, sounds);
            if (currentTime && duration) {
                setProgress(20.3+(currentTime / duration) * 79.7);
            }
        },1);
        return () => clearInterval(interval);
    }, [sounds]);
    useEffect(() => {
        setSounds(getSoundsState(song));
    }, [song]);

    return (
        <div className="App">
            <div className="play_bar">
                <ControlPanel
                    setFunctions={{ setProgress, setSong, setLoop }}
                    states={{ soundPaths, sounds, loop }}
                />
                <div className="bar1">
                    <Cursor precentage={progress} />
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
