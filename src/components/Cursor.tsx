import { useEffect } from "react";
import { setSoundsProgress } from "../utils/looper";

export default function Cursor({
    progress,
    duration,
    setIsPlaying,
    setProgress,
    play,
    sounds,
    pause,
}: any) {
    
    return (
        <input
            className="cursor"
            type="range"
            value={progress}
            min="0"
            step={0.001}
            max={duration}
            onMouseDown={() => {
                pause(sounds, setIsPlaying);
            }}
            onChange={(e) => {
                setSoundsProgress(
                    sounds,
                    Number(e.currentTarget.value),
                    setProgress
                );
            }}
            onMouseUp={() => {
                play(sounds, setIsPlaying);
            }}
            style={{
                width: "88.3%",
                position: "absolute",
                left: "10.5%",
                zIndex: 1,
                WebkitAppearance: "none", 
            }}
        />
    );
}
