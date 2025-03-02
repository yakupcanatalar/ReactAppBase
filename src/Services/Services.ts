import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";
const AUTH_URL = `${API_URL}auth`;

export const registerUser = async (userData: {
  password: string;
  confirmationPassword: string;
  firstname: string;
  lastname: string;
  email: string;
}) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.put(`${AUTH_URL}/authenticate`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${AUTH_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(`${AUTH_URL}/refresh`);
    return response.data;
  } catch (error) {
    throw error;
  }
};