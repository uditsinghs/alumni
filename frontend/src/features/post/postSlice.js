import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts:[]
}

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
   getPost:(state,action)=>{
    state.posts = action.payload;
   }
  }
})

export const {getPost} = postSlice.actions;
export default postSlice.reducer;