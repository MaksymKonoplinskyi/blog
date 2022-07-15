import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchGetFullPost = createAsyncThunk('post/fetchGetFullPost', async (id) => {
    const { data } = await axios.get(`/posts/${id}`)
    return data;
})

export const fetchCriateNewPost = createAsyncThunk('post/fetchCriateNewPost', async (params) => {
    const { data } = await axios.post('/posts', params)
    return data;
})

export const fetchEditPost = createAsyncThunk('post/fetchEditPost', async (patchData) => {
    const {id, fields} = patchData;
    const { data } = await axios.patch(`/posts/${id}`, fields)
    // console.log(fields);
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
           // navigate(`/fullPost/${state.curentPostData._id}`)
        },
        [fetchGetFullPost.rejected]: (state) => {
            state.status = 'error';
            state.curentPostData = null;
        },

        [fetchCriateNewPost.pending]: (state) => {
            state.status = 'loading';
            state.curentPostData = null;
        },
        [fetchCriateNewPost.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.curentPostData = action.payload;
        },
        [fetchCriateNewPost.rejected]: (state) => {
            state.status = 'Ошибка при создании статьи';
            state.curentPostData = null;
        },

        [fetchEditPost.pending]: (state) => {
            state.status = 'loading';
            state.curentPostData = null;
        },
        [fetchEditPost.fulfilled]: (state, action) => {
            state.status = 'loaded';
           state.curentPostData = action.payload;
        },
        [fetchEditPost.rejected]: (state) => {
            state.status = 'Ошибка при редактировании статьи';
            state.curentPostData = null;
        },

    }
})

// export const { postout } = postSlice.actions

export const postReducer = postSlice.reducer;