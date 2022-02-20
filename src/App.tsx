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

    //Sync all the channals
    useEffect(() => {
        const interval = setInterval(() => {
            syncOffsets(sounds, 0.05,setIsPlaying); //accuracy, the lower the more accurate
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    //handle loop
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = getCurrentTime(0, sounds);
            const duration = getCurrentDuration(0, sounds);
            setProgress(getCurrentTime(0, sounds));
            if (currentTime >= duration) {
                if (!loop) {
                    pause(sounds, setIsPlaying);
                    setProgress(0);
                }
            }
        }, 100);
        return () => clearInterval(interval);
    }, [isPlaying, loop]);

    //
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
    }, [song, isPlaying]);

    return (
        <div className="App">
            <div>
                <ControlPanel
                    setProgress={setProgress}
                    setSong={setSong}
                    setLoop={setLoop}
                    setIsPlaying={setIsPlaying}
                    soundPaths={soundPaths}
                    sounds={sounds}
                    loop={loop}
                    isPlaying={isPlaying}
                />
                <div className="looper">
                    <Cursor
                        duration={getCurrentDuration(0, sounds)}
                        progress={progress}
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
                                    soundPath={sound.sound}
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
            <Backdrop activeColor={"#5f9fff"} isPlaying={isPlaying} />
        </div>
    );
}

export default App;
