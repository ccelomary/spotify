import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../combineReducers";



export const store = configureStore({
    reducer: rootReducer
})