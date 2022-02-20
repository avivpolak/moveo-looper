import { Sounds } from "../types/looper";
import { setSoundsProgress } from "../utils/looper";

export default function Cursor({
    progress,
    duration,
    setIsPlaying,
    setProgress,
    play,
    sounds,
    pause,
}: {
    progress: number;
    duration: number;
    setIsPlaying:Function
    setProgress:Function,
    play:Function,
    sounds:Sounds
    pause:Function
}) {
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
                width: "89.1%",
                position: "absolute",
                left: "10.5%",
                zIndex: 1,
                WebkitAppearance: "none",
            }}
        />
    );
}
