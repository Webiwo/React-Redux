import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", //idle, loading, succeed, failed
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POST_URL, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POST_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POST_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload); //uses immer.js - immutable state
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
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++; //uses immer.js - immutable state
      }
    },
  },
  //https://medium.com/@mindsurfingclub/redux-toolkit-extra-reducer-explained-createasyncthunk-1480c54e8b58
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedPosts = action.payload.map((post) => {
          post.date = new Date().toISOString();
          post.reactions = {
            like: 0,
            love: 0,
            crazy: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          like: 0,
          love: 0,
          crazy: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const allPosts = (state) => state.posts.posts;
export const postsStatus = (state) => state.posts.status;
export const postsError = (state) => state.posts.error;
export const postById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const { addPost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
