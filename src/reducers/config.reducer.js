

const configReducer = (state = {
    active: 'home',
    search: '',
    selectedCategory: 'playlists'
}, action) => {
    switch(action.type)
    {
        case 'SET_ACTIVE':
            return {
                ...state,
                active: action.payload
            }
        case 'SET_SEARCH':
            return {
                ...state,
                search: action.payload
            }
        case 'SET_SELECTED_CATEGORY':
            return {
                ...state,
                selectedCategory: action.payload
            }
        default:
            return state
    }
}

export default configReducer;
