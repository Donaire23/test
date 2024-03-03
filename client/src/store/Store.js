import { configureStore } from "@reduxjs/toolkit";
import register from '../actions/reg';
import login from '../actions/login';

const store = configureStore({
    reducer: {
        Register: register,
        Login: login
    }
})

export default store