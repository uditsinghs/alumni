
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://alumni-backend-1-gr9f.onrender.com/api/v1",
  withCredentials: true,
})

export default axiosInstance;
