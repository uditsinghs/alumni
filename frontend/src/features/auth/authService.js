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
  const { data } = await axiosInstance.post("/users/register",userData);
  return data;
}