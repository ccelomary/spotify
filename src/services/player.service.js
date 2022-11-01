import { setTrack} from "../actions/player.action";

export const setTrackService = (track) =>  dispatch => {
    dispatch(setTrack(track));
}
