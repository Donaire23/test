import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { HttpStatusCode } from 'axios';
import Cookies from "js-cookie";

export const getUser = createAsyncThunk("user", async (userId) => {
    try {
      const response = await Axios.get(`https://backend-seven-sage.vercel.app/user?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  })


export const user = createSlice({
    name: "test",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUser.fulfilled, (state, action) => {
            state.responseData = action.payload;
            state.errors = null;
        })
    }
})

export default user.reducer
