import DRUMS from "../media/sounds/default/DRUMS.mp3";
import BVOC from "../media/sounds/default/BVOC.mp3";
import HEHEVOC from "../media/sounds/default/HEHEVOC.mp3";
import HIGHVOC from "../media/sounds/default/HIGHVOC.mp3";
import JIBRISH from "../media/sounds/default/JIBRISH.mp3";
import LEAD1 from "../media/sounds/default/LEAD1.mp3";
import UUHOVOC from "../media/sounds/default/UUHOVOC.mp3";
import _tambourine_shake_higher from "../media/sounds/default/_tambourine_shake_higher.mp3";
import bass from "../media/sounds/thisCity/bass.mp3";
import beatbox from "../media/sounds/thisCity/beat-box.mp3";
import guitar from "../media/sounds/thisCity/guitar.mp3";
import organ from "../media/sounds/thisCity/organ.mp3";
import vocal from "../media/sounds/thisCity/vocal.mp3";
import { SoundPaths } from "../types/looper";

const SoundsPaths:SoundPaths = {
    default: [DRUMS, BVOC, HEHEVOC, HIGHVOC, JIBRISH, LEAD1, UUHOVOC,_tambourine_shake_higher],
    thisCity: [bass, beatbox, guitar, organ, vocal],
};
export default SoundsPaths;
