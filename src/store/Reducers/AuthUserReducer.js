import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const AuthUserApi = createAsyncThunk("AuthUserApi", async () => {
    const res = await axios.post(`${import.meta.env.VITE_URL}/checkAuthValidUser`,{},{
        withCredentials : true
    });
    return res.data
    
});

const checkAuthValidUser = createSlice({
    name: "checkAuthValidUser",
    initialState: {
        isLoading: true,
        data: {
            success : false
        },
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(AuthUserApi.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(AuthUserApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        
        })
        builder.addCase(AuthUserApi.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true;
        })
    }
});

export default checkAuthValidUser.reducer; 