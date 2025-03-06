import { createSlice, nanoid } from "@reduxjs/toolkit";

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
    addPost: {
      reducer(state, action) {
        state.push(action.payload); //immer.js - work with immutable state
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
          },
        };
      },
    },
  },
});

export const allPosts = (state) => state.posts;
export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
