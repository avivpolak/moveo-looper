import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Channel({
    audioRef,
    soundPath,
    name,
    loop,
    isMuted,
    toggleMute,
    id,
    color,
}: {
    audioRef: React.RefObject<HTMLAudioElement>;
    soundPath: string;
    name: string;
    loop: boolean;
    isMuted: boolean;
    toggleMute: Function;
    id: string;
    color: string;
}) {
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
                <audio
                    ref={audioRef}
                    muted={isMuted}
                    loop={loop}
                    src={soundPath}
                >
                    <source type="audio/mpeg" />
                </audio>
            </div>
        </div>
    );
}
