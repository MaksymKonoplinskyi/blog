import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { postReducer } from "./slices/post";

const store = configureStore({
    reducer: {
        post: postReducer,
        posts: postsReducer,
        auth: authReducer, 
    },
})

export default store;