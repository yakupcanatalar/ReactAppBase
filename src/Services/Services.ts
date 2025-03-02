import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";
const AUTH_URL = `${API_URL}auth`;
const TASK_URL = `${API_URL}task`;
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

// Create a new task
export const createTask = async (taskData: { name: string; note: string; stageIds: number[] }) => {
  try {
    const response = await axiosInstance.post(TASK_URL, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await axiosInstance.get(TASK_URL);
    const tasks = response.data.map((task: any) => {
      let nodes;
      try {
        nodes = JSON.parse(task.note);
      } catch (e) {
        nodes = task.note; // or handle the error as needed
      }
      return {
        ...task,
        nodes,
      };
    });
    return tasks;
  } catch (error) {
    throw error;
  }
};

// Get a task by ID
export const getTaskById = async (taskId: number) => {
  try {
    const response = await axiosInstance.get(`${TASK_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a task by ID
export const deleteTaskById = async (taskId: number) => {
  try {
    const response = await axiosInstance.delete(`${TASK_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a task by ID
export const updateTaskById = async (taskId: number, taskData: { name: string; note: string; stageIds: number[] }) => {
  try {
    const response = await axiosInstance.put(`${TASK_URL}/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


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