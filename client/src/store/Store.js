import { configureStore } from "@reduxjs/toolkit";
import register from '../actions/reg';
import user from '../actions/credentials'
import login from '../actions/login';


const store = configureStore({
    reducer: {
        Register: register,
        Login: login,
        test: user
    }
})

export default store
