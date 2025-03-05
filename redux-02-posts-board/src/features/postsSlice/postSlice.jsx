import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Redux Toolkit is cool",
    content: "I've heard only good things about Redux Toolkit",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload); //immer.js - work with immutable state
    },
  },
});

export const allPosts = (state) => state.posts;
export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
