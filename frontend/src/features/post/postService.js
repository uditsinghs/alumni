import axiosInstance from "@/utils/axios";

export const getAllPosts = async () => {
  const { data } = await axiosInstance.get('/posts/get');
  return data.allPosts;
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

export const deletePost = async (postId) => {
  const { data } = await axiosInstance.delete(`/posts/delete/${postId}`);
  return data;
}

