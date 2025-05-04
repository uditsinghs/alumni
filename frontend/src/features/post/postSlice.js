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
      state.posts = action.payload;
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },
    deletePostSlice: (state, action) => {
      state.myPosts = state.myPosts.filter((post) => post._id !== action.payload)
    }
  }
})

export const { getPost, setMyPosts ,deletePostSlice} = postSlice.actions;
export default postSlice.reducer;