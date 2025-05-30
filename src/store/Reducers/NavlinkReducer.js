import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSidebarlinks = createAsyncThunk("fetchSidebarlinks", async (id) => {
   
    const res = await fetch(`${import.meta.env.VITE_URL}/notes/Navlinks`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        }),
        credentials: 'include'
    });
    return res?.json();
});

const fetchLinksReducer = createSlice({
    name: "todo",
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSidebarlinks.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchSidebarlinks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchSidebarlinks.rejected, (state, action) => {
            state.isError = true;
        })
    }
});

export default fetchLinksReducer.reducer; 