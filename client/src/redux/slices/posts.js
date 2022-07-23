import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchPostsNew = createAsyncThunk('posts/fetchPostsNew', async () => {
    const { data } = await axios.get('/postsNew')
    return data;
})

export const fetchPostsPopular = createAsyncThunk('posts/fetchPostsPopular', async () => {
    const { data } = await axios.get('/postsPopular')
    return data;
})

export const fetchPostsWithTag = createAsyncThunk('posts/fetchPostsWithTag', async (tag) => {
    const { data } = await axios.get(`/posts/withTag/${tag}`)
    return data;
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    const { data } = await axios.delete(`/posts/${id}`)
    return data;
})

const initialState = {
    items: [],
    status: 'loading'
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {

        // Получение статей в порядке популярности
        [fetchPostsPopular.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchPostsPopular.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        },
        [fetchPostsPopular.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
        },

        // Получение новых статей
        [fetchPostsNew.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchPostsNew.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        },
        [fetchPostsNew.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
        },

        // Получение статей по тегу
        [fetchPostsWithTag.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchPostsWithTag.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        },
        [fetchPostsWithTag.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
        },

        // Удаление статьи
        [fetchRemovePost.fulfilled]: (state, action) => {
            state.items = state.items.filter(obj => obj._id !== action.meta.arg);
        },

        // [fetchRemovePost.rejected]: (state) => {
        //     state.posts.items = [];
        //     state.posts.status = 'error';
        // },
    }
})

export const postsReducer = postsSlice.reducer;