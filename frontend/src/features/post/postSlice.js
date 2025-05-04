import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  myPosts: [],
}

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPost: (state, action) => {
      state.posts = Array.isArray(action.payload) ? action.payload : [action.payload];
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },
    deletePostSlice: (state, action) => {
      state.myPosts = state.myPosts.filter((post) => post._id !== action.payload)
    },
    updatePostAfterComment: (state, action) => {
      const updatedPost = action.payload;
      if (Array.isArray(state.posts)) {
        state.posts = state.posts.map((p) =>
          p._id === updatedPost._id ? updatedPost : p
        );
      }
    },
  }
})

export const { getPost, setMyPosts, deletePostSlice, updatePostAfterComment } = postSlice.actions;
export default postSlice.reducer;