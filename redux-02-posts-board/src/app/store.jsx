import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice/postSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
