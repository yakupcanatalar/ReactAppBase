import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/";
const STAGE_URL = `${API_URL}task-stage`;

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

// Create a new task stage
export const createTaskStage = async (taskStageData: { name: string; note: string }) => {
  try {
    const response = await axiosInstance.post(`${STAGE_URL}`, taskStageData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a task stage by ID
export const updateTaskStageById = async (taskStageId: number, taskStageData: { name: string; note: string }) => {
  try {
    const response = await axiosInstance.put(`${STAGE_URL}/${taskStageId}`, taskStageData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all task stages
export const getTaskStages = async () => {
  try {
    const response = await axiosInstance.get(`${STAGE_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a task stage by ID
export const getTaskStageById = async (taskStageId: number) => {
  try {
    const response = await axiosInstance.get(`${STAGE_URL}/${taskStageId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a task stage by ID
export const deleteTaskStageById = async (taskStageId: number) => {
  try {
    const response = await axiosInstance.delete(`${STAGE_URL}/${taskStageId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};