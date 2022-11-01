

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const setUserCurrentTrack = (track) => {
    return {
        type: 'SET_USER_CURRENT_TRACK',
        payload: track
    }
}

export const setUserPlayer = (player) => {
    return {
        type: 'SET_USER_PLAYER',
        payload: player
    }
}

export const setUserPlaylists = (playlists) => {
    return {
        type: 'SET_USER_PLAYLISTS',
        payload: playlists
    }
}

export const setUserRecentTracks = (tracks) => {
    return {
        type: 'SET_USER_RECENT_TRACKS',
        payload: tracks
    }
}
