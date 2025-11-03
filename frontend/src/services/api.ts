
import type { Task } from "../models/Task";
import api from "./axiosInstance";


export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get<Task[]>("/api/tasks");
    return response.data;
  } catch (error:any) {
    if (error.response) {
      throw new Error(`Failed to fetch tasks: ${error.response.status} ${error.response.data.message || ""}`);
    } else if (error.request) {
      throw new Error("No response from server. Check your connection.");
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
};  