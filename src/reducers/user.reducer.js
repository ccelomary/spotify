



const userReducer = (state = null, action) => {
    switch(action.type)
    {
        case 'SET_USER':
            return action.payload
        case 'SET_USER_CURRENT_TRACK':
            
            return {
                ...state,
                currentTrack: action.payload
            }
        case 'SET_USER_PLAYLISTS':
            return {
                ...state,
                playlists: action.payload
            }
        case 'SET_USER_RECENT_TRACKS':
            return {
                ...state,
                recentTracks: action.payload
            }
        case 'REMOVE_USER':
            return null
        default:
            return state
    }
}


export default userReducer;