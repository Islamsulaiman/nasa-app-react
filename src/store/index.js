import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/login";

const store = configureStore({
    reducer:{
        auth: authReducer,
    }
})

export default store;