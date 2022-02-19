import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Channel({
    audioRef,
    sound,
    name,
    loop,
    isMuted,
    toggleMute,
    id,
    color,
}: any) {
    return (
        <div className="channel">
            <div
                className="control"
                onClick={() => {
                    toggleMute(id);
                }}
            >
                {isMuted ? (
                    <FontAwesomeIcon icon={faVolumeXmark} />
                ) : (
                    <FontAwesomeIcon icon={faVolumeHigh} />
                )}
            </div>
            <div
                className="bar"
                style={{ backgroundColor: color, opacity: 0.5 }}
            >
                {name}
                <audio ref={audioRef} muted={isMuted} loop={loop} src={sound}>
                    <source type="audio/mpeg" />
                </audio>
            </div>
        </div>
    );
}
