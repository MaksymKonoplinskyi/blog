import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me')
    return data;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params)
    return data;
})

const initialState = {
    userData: null,
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.userData = null
        },
    },
    extraReducers: {
            [fetchAuth.pending]: (state) => {
                state.status = 'loading';
                state.userData = null;
            },
            [fetchAuth.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.userData = action.payload;
            },
            [fetchAuth.rejected]: (state) => {
                state.status = 'error';
                state.userData = null;
            },

            [fetchAuthMe.pending]: (state) => {
                state.status = 'loading';
                state.userData = null;
            },
            [fetchAuthMe.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.userData = action.payload;
            },
            [fetchAuthMe.rejected]: (state) => {
                state.status = 'error';
                state.userData = null;
            },

            [fetchRegister.pending]: (state) => {
                state.status = 'loading';
                state.userData = null;
            },
            [fetchRegister.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.userData = action.payload;
            },
            [fetchRegister.rejected]: (state) => {
                state.status = 'error';
                state.userData = null;
            },

        }
    })

export const selectIsAuth = state => Boolean(state.auth.userData)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions