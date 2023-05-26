import { configureStore } from '@reduxjs/toolkit'
import {navSlice} from "./Slices/navSlice";
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist";
import {combineReducers} from "@reduxjs/toolkit"


const persistConfiguration = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    nav: navSlice.reducer,
})

const persistedReducer = persistReducer(persistConfiguration,reducer)

export const store =  configureStore({
    reducer: persistedReducer
})
