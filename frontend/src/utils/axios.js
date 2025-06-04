
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://alumni-backend-1-gr9f.onrender.com",
  withCredentials: true,
})

export default axiosInstance;
