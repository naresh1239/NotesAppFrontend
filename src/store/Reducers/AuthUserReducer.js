import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


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
            Cookies.set('isValidUserTime', true, {
                path: '/',
                sameSite: 'Strict',
                secure: true, 
              });
        })
        builder.addCase(AuthUserApi.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true;
            Cookies.remove('isValidUserTime');
        })
    }
});

export default checkAuthValidUser.reducer; 