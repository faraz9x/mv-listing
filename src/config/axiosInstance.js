import axios from "axios";
import apiConfig from "./apiConfig";


const axiosInstance = axios.create({
    baseURL: apiConfig.Base_URL,
    withCredentials: false
});

export default axiosInstance;