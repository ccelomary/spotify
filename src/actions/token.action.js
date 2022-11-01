export const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}

export const removeToken = () => {
    return {
        type: 'REMOVE_TOKEN'
    }
}