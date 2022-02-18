import {
    chooseSong,
    pause,
    play,
    setAlmostEnd,
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
    const { setProgress, setSong, setLoop } = setFunctions;
    const { soundPaths, sounds, loop } = states;

    return (
        <div>
            <select
                onChange={({ target }) => {
                    chooseSong(target.value, soundPaths, setSong);
                }}
            >
                <option>default</option>
                <option>thisCity</option>
            </select>
            <div
                className="_3"
                onClick={() => {
                    play(sounds);
                }}
            >
                play
            </div>
            <div
                className="_2"
                onClick={() => {
                    pause(sounds);
                }}
            >
                pause
            </div>
            <div
                className="Ellipse_1"
                onClick={() => {
                    setStartOver(setProgress, sounds);
                }}
            >
                setStartOver
            </div>
            <div
                className="contoller1"
                onClick={() => {
                    setAlmostEnd(sounds);
                }}
            >
                setAlmostEnd
            </div>
            <div
                className="contoller1"
                onClick={() => {
                    toggleLoop(setLoop, loop);
                }}
            >
                {loop ? "set no loop" : "set loop"}
            </div>
        </div>
    );
}
