import { setUser, setUserCurrentTrack, setUserPlaylists,
setUserRecentTracks } from "../actions/user.action";
import {fetchUserData,
    fetchUserRecentTracks,
    fetchUserCurrentTrack,
    fetchUserPlaylists,
    } from '../api/user.api';

export const setUserService = (token) => {
    return async dispatch => {
        const userData = await fetchUserData(token);
        const userRecentTracks = await fetchUserRecentTracks(token);
        const userCurrentTrack = await fetchUserCurrentTrack(token);
        const userPlaylists = await fetchUserPlaylists(token);

        dispatch(setUser({
            ...userData,
            recentTracks: userRecentTracks,
            currentTrack: userCurrentTrack,
            playlists: userPlaylists,
        }));
    }
}

export const setUserCurrentTrackService = (data) => {
    return dispatch => {
        dispatch(setUserCurrentTrack(data));
    }
}

export const setUserPlaylistsService = (token) => {
    return async dispatch => {
        const userPlaylists = await fetchUserPlaylists(token);
        dispatch(setUserPlaylists(userPlaylists));
    }
}

export const setUserRecentTracksService = (token) => {
    return async dispatch => {
        const userRecentTracks = await fetchUserRecentTracks(token);
        dispatch(setUserRecentTracks(userRecentTracks));
    }
}