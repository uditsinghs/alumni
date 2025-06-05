import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPosts } from "./postService";
const initialState = {
  posts: [],
  myPosts: [],
  loading: false,
  error: null,
}

// Thunk to fetch posts
export const fetchPosts = createAsyncThunk("post/fetchPosts", async (_, thunkAPI) => {
  try {
    const data = await getAllPosts();
    return data.posts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },

    deletePostSlice: (state, action) => {
      state.myPosts = state.myPosts.filter((post) => post._id !== action.payload)
    },


    addComment: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: [...post.comments, action.payload.addedComment],
          };
        }
        return post;
      });
    },
    deleteComment: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (cmt) => cmt._id !== action.payload.commentId
            ),
          };
        }
        return post;
      });
    },
    likeAndDislike: (state, action) => {
      const { postId, userId } = action.payload;


      state.posts = state.posts.map((post) => {
        console.log(post);
        if (post._id === postId) {
          const alreadyLiked = post.likes.includes(userId);
          return {
            ...post,
            likes: alreadyLiked
              ? post.likes.filter((uid) => uid !== userId)
              : [...post.likes, userId],
          };
        }
        return post;
      });
    }


  },
    extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export const { setMyPosts, deletePostSlice, addComment, deleteComment, likeAndDislike } = postSlice.actions;
export default postSlice.reducer;