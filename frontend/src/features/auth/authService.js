import axiosInstance from "@/utils/axios";

export const loginUser = async (userData) => {
  const { data } = await axiosInstance.post("/users/login", userData);
  return data;
}

export const getLoggedinUser = async () => {
  const { data } = await axiosInstance.get("/users/me");
  return data.user;
}

export const logoutUser = async () => {
  const { data } = await axiosInstance.get("/users/logout");
  return data;
}
export const registerUser = async (userData) => {
  const { data } = await axiosInstance.post("/users/register", userData);
  return data;
}
export const editProfile = async (userData) => {
  const { data } = await axiosInstance.put("/users/edit", userData);
  return data;
}

export const getAlumnies = async () => {
  const { data } = await axiosInstance.get("/users/allalumnies");
  return data;
}
export const getStats = async () => {
  const { data } = await axiosInstance.get("/users/stats");
  return data;
}
export const getUnverifiedUsers = async () => {
  const { data } = await axiosInstance.get("/users/unverified");
  return data.unVerifiedAlumnies;
}
export const verifyAlumni = async (userId) => {
  const { data } = await axiosInstance.put(`/users/verify/${userId}`);
  return data;
}

export const getSingleUser = async (userId) => {
  const { data } = await axiosInstance.get(`/users/getuser/${userId}`);
  return data.user;
}
export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("/users/getall");
  return data.allusers;
}
export const deleteUser = async (userId) => {
  const { data } = await axiosInstance.delete(`/users/deleteuser/${userId}`);
  return data;
}
export const changeRole = async (userId, role) => {
  const { data } = await axiosInstance.put(`/users/change/${userId}`, {
    role: role,
  });
  return data;
};