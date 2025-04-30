import axiosInstance from "@/utils/axios";

export const getAllPosts = async () => {
  const { data } = await axiosInstance.get('/posts/get');
  return data.allPosts;
}

export const getSinglePost = async (postId) => {
  const { data } = await axiosInstance.get(`/posts/get/${postId}`);
  return data.post;
}