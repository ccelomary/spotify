import { setToken, removeToken } from "../actions/token.action"



export const setTokenService = (token) => dispatch => {
    dispatch(setToken(token));
}


export const removeTokenService = () => dispatch => {
    dispatch(removeToken());
}
