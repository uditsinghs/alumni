import axiosInstance from "@/utils/axios";


export const getAllPosts = async () => {
  const { data } = await axiosInstance.get(`/posts/get`);
  
  return data;
}
export const getAlumniPosts = async () => {
  const { data } = await axiosInstance.get('/posts/getalumnipost  ');
  return data.allPosts;
}

export const getSinglePost = async (postId) => {
  const { data } = await axiosInstance.get(`/posts/get/${postId}`);
  return data.post;
}
export const createPost = async (postData) => {
  const { data } = await axiosInstance.post("/posts/create", 
    postData
);
  return data;
}

export const updatePost = async (postId, postData) => {
  const { data } = await axiosInstance.put(`/posts/edit/${postId}`, postData);
  return data;
}
export const deleteCommentOnPost = async (postId, commentId) => {
  try {
    const res = await axiosInstance.delete(`/posts/deletecomment/${postId}/${commentId}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Error" };
  }
};
export const commentOnPost = async (postId, comment) => {
  const { data } = await axiosInstance.put(`/posts/comment/${postId}`, {comment});
  return data;
}

export const deletePost = async (postId) => {
  const { data } = await axiosInstance.delete(`/posts/delete/${postId}`);
  return data;
}

export const likeAndDislikePost = async (postId) => {
  const { data } = await axiosInstance.put(`/posts/like/${postId}`);
  return data;
}

