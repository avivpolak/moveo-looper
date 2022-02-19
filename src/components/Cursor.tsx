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
            type="range"
            value={progress}
            min="0"
            max={duration}
            onMouseDown={() => {
                pause(sounds, setIsPlaying);
            }}
            onChange={(e) => {
                console.log(Number(e.currentTarget.value))
                setSoundsProgress(
                    sounds,
                    Number(e.currentTarget.value),
                    setProgress
                );
            }}
            onMouseUp={() => {
                play(sounds, setIsPlaying);
            }}
        />
    );
}
