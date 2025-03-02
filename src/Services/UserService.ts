import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";
const AUTH_URL = `${API_URL}auth`;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Adjust this to where you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData: {
  password: string;
  confirmationPassword: string;
  firstname: string;
  lastname: string;
  email: string;
}) => {
  try {
    const response = await axiosInstance.post(`${AUTH_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.put(`${AUTH_URL}/authenticate`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post(`${AUTH_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post(`${AUTH_URL}/refresh`);
    return response.data;
  } catch (error) {
    throw error;
  }
};