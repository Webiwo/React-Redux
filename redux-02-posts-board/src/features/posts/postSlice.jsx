import { createSlice, nanoid } from "@reduxjs/toolkit";
import { subMinutes } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Redux Toolkit is cool",
    content: "I've heard only good things about Redux Toolkit",
    date: subMinutes(new Date(), 30).toISOString(),
    reactions: {
      like: 0,
      love: 0,
      crazy: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.push(action.payload); //uses immer.js - immutable state
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              like: 0,
              love: 0,
              crazy: 0,
            },
          },
        };
      },
    },
    addReaction(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++; //uses immer.js - immutable state
      }
    },
  },
});

export const allPosts = (state) => state.posts;
export const { addPost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
