import { combineReducers } from "redux";
import tokenReducer from "../reducers/token.reducer";
import userReducer from "../reducers/user.reducer";
import configReducer from "../reducers/config.reducer";
import PlayerReducer from "../reducers/player.reducer";

const rootReducer = combineReducers({
    token: tokenReducer,
    user: userReducer,
    config: configReducer,
    player: PlayerReducer,
})
export default rootReducer;