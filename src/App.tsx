import { useEffect, useState } from "react";
import "./App.css";
import Channel from "./components/Channel";
import Cursor from "./components/Cursor";
import {
    getCurrentDuration,
    getCurrentTime,
    getSoundsState,
    pause,
    play,
    setSoundsProgress,
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
                setProgress(currentTime);
                
                if (progress >= duration) {
                    if (!loop) {
                        pause(sounds, setIsPlaying);
                        setSoundsProgress(sounds,0,setProgress);
                    }
                    
                    setSoundsProgress(sounds,0,setProgress);
                    // setStartOver(setProgress, sounds);
                }
            }
        }, 1);
        return () => clearInterval(interval);
    }, [isPlaying]);
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = getCurrentTime(0, sounds);
            if (currentTime) {
                Object.entries(sounds).forEach(([id, sound]) => {
                    setSounds({
                        ...sounds,
                        [id]: { ...sound, currentTime },
                    });
                }, 1);
            }
        });
        return () => clearInterval(interval);
    }, [sounds]);
    useEffect(() => {
        setSounds(getSoundsState(song));
    }, [song]);
    // useEffect(() => {
    //     setSoundsProgress(sounds,progress)
    //     // console.log("progress", progress);
    // }, [progress]);

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
                        duration={getCurrentDuration(0, sounds)}
                        progress={progress}
                        numberOfChannels={Object.keys(sounds).length}
                        setProgress={setProgress}
                        play={play}
                        setIsPlaying={setIsPlaying}
                        sounds={sounds}
                        pause={pause}
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
