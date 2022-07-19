import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { postReducer } from "./slices/post";
import { tagsReducer } from "./slices/allTags";

const store = configureStore({
    reducer: {
        post: postReducer,
        posts: postsReducer,
        auth: authReducer, 
        tags: tagsReducer,
    },
})

export default store;