import { setActive, setSearch, setSelctedCategory } from '../actions/config.action';



export const setActiveService = (active) => {
    return dispatch => {
        dispatch(setActive(active));
    }
}


export const setSearchService = (search) => {
    return dispatch => {
        dispatch(setSearch(search));
    }
}

export const setSelectedCategoryService = (category) => dispatch => {
    dispatch(setSelctedCategory(category));
}