import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'



export const fetchGetFullPost = createAsyncThunk('post/fetchGetFullPost', async (id) => {
    const { data } = await axios.get(`/posts/${id}`)
    return data;
})

const initialState = {
    curentPostData: null,
    status: 'loading',

}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        // postout: (state) => {
        //     state.curentPostData = null
        // },
    },
    extraReducers: {

        // Получение одной статьи
        [fetchGetFullPost.pending]: (state) => {
            state.status = 'loading';
            state.curentPostData = null;
        },
        [fetchGetFullPost.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.curentPostData = action.payload;
        },
        [fetchGetFullPost.rejected]: (state) => {
            state.status = 'error';
            state.curentPostData = null;
        },

    }
})

// export const { postout } = postSlice.actions

export const postReducer = postSlice.reducer;