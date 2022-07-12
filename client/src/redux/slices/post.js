import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'



export const fetchGetFullPost = createAsyncThunk('post/fetchGetFullPost', async (id) => {
    const { data } = await axios.get(`/posts/${id}`)
    return data;
})

const initialState = {
    postData: null,
    status: 'loading',

}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {

        // Получение одной статьи
        [fetchGetFullPost.pending]: (state) => {
            state.status = 'loading';
            state.postData = null;
        },
        [fetchGetFullPost.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.postData = action.payload;
        },
        [fetchGetFullPost.rejected]: (state) => {
            state.status = 'error';
            state.postData = null;
        },

    }
})

export const postReducer = postSlice.reducer;