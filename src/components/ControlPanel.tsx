import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faArrowRotateLeft,
    faArrowRight,
    faBackwardFast,
} from "@fortawesome/free-solid-svg-icons";
import {
    chooseSong,
    pause,
    play,
    setStartOver,
    toggleLoop,
} from "../utils/looper";
export default function ControlPanel({
    states,
    setFunctions,
}: {
    states: any;
    setFunctions: any;
}) {
    const { setProgress, setSong, setLoop, setIsPlaying } = setFunctions;
    const { soundPaths, sounds, loop, isPlaying } = states;

    return (
        <div>
            <select
                className="custom-select"
                onChange={({ target }) => {
                    chooseSong(
                        target.value,
                        soundPaths,
                        setSong,
                        setIsPlaying,
                        setProgress,
                        sounds
                    );
                }}
            >
                {Object.keys(soundPaths).map(
                    (soundPath: string, index: number) => {
                        return (
                            <option className="custom-option" key={index} value={soundPath} >
                                {soundPath}
                            </option>
                        );
                    }
                )}
            </select>
            {isPlaying ? (
                <div
                    className="play_bar button"
                    onClick={() => {
                        pause(sounds, setIsPlaying);
                    }}
                >
                    <FontAwesomeIcon icon={faPause} />
                </div>
            ) : (
                <div
                    className="play_bar button"
                    onClick={() => {
                        play(sounds, setIsPlaying);
                    }}
                >
                    <FontAwesomeIcon icon={faPlay} />
                </div>
            )}

            <div
                className="goToStart_bar button"
                onClick={() => {
                    setStartOver(setProgress, sounds);
                }}
            >
                <FontAwesomeIcon icon={faBackwardFast} />
            </div>

            <div
                className="restart_bar button"
                onClick={() => {
                    toggleLoop(setLoop, loop);
                }}
            >
                {loop ? (
                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                ) : (
                    <FontAwesomeIcon icon={faArrowRight} />
                )}
            </div>
        </div>
    );
}
