import { configureStore } from '@reduxjs/toolkit'
import {navSlice} from "./Slices/navSlice";

export const store =  configureStore({
    reducer: {
        nav: navSlice.reducer
    },
})
