
const PlayerReducer = (state={track: null}, action) => {
    switch (action.type)
    {
        case 'SET_TRACK':
            return {
                ...state,
                track: action.payload
            }
        default:
            return state;
    }
}


export default PlayerReducer;
