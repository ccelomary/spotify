
export const setActive = (active) => {
    return {
        type: 'SET_ACTIVE',
        payload: active
    }
}

export const setSearch = (search) => {
    return {
        type: 'SET_SEARCH',
        payload: search
    }
}


export const setSelctedCategory = (category)=>{
    return {
        type: 'SET_SELECTED_CATEGORY',
        payload: category
    }
}