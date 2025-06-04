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
      state.posts = action.payload
    },

    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },

    deletePostSlice: (state, action) => {
      state.myPosts = state.myPosts.filter((post) => post._id !== action.payload)
    },


    addComment: (state, action) => {
      state.posts.posts = state.posts.posts.map((post) => {
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
      state.posts.posts = state.posts.posts.map((post) => {
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
  
   
      state.posts.posts = state.posts.posts.map((post) => {
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


  }
})

export const { getPost, setMyPosts, deletePostSlice, addComment, deleteComment, likeAndDislike } = postSlice.actions;
export default postSlice.reducer;