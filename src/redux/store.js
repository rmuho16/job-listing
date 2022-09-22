import {configureStore} from "@reduxjs/toolkit";
import jobs from './jobsSlice'

export const store = configureStore({
    reducer: jobs
})