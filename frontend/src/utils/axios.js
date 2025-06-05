
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://alumni-1-nkxl.onrender.com/api/v1",
  withCredentials: true,
})

export default axiosInstance;
