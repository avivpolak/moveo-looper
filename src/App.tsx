import { useEffect, useState } from "react";
import "./App.css";
import Channel from "./components/Channel";
import Cursor from "./components/Cursor";
import {
    getCurrentDuration,
    getCurrentTime,
    getSoundsState,
    isOffset,
    pause,
    play,
    setSoundsProgress,
    syncOffsets,
    toggleMute,
} from "./utils/looper";
import { Sounds } from "./types/looper";
import soundPaths from "./songs/soundPaths";
import ControlPanel from "./components/ControlPanel";
import Backdrop from "./components/Backdrop";

function App() {
    const [song, setSong] = useState(soundPaths["default"]);
    const [progress, setProgress] = useState(0);
    const [sounds, setSounds] = useState<Sounds>(getSoundsState(song));
    const [loop, setLoop] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    //Sync all the channals if neccery
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = getCurrentTime(0, sounds);
            if (currentTime && isOffset(sounds,0.5)) {
                syncOffsets(sounds,0.5);            }
        }, 5000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    //handle loop
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = getCurrentTime(0, sounds);
            const duration = getCurrentDuration(0, sounds);
            if ((currentTime === 0 && duration) || (currentTime && duration)) {
                setProgress(currentTime);
                if (currentTime >= duration) {
                    if (!loop) {
                        pause(sounds, setIsPlaying);
                    }
                }
            }
        }, 1);
        return () => clearInterval(interval);
    }, [isPlaying]);

    //update the channels progress
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

    //handle song change
    useEffect(() => {
        setSounds(getSoundsState(song));
    }, [song]);

    //making the cursor fit any number of channels
    useEffect(() => {
        const numberOfChannels = Object.keys(sounds).length;
        document.documentElement.style.setProperty(
            "--cursor-height",
            `${numberOfChannels * 30 + (numberOfChannels - 1) * 20 - 0.4}px`
        );
    }, [sounds]);

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
            <Backdrop
                trackIndex={0}
                activeColor={"#5f9fff"}
                isPlaying={isPlaying}
            />
        </div>
    );
}

export default App;
