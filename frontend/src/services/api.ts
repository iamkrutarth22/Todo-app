// import api from "./axiosInstance";

// export interface SignupData {
//   name: string;
//   email: string;
//   password: string;
// }
// export interface LoginData {
//   email: string;
//   password: string;
// }

// export interface UpdateTaskData {
//   title?: string;
//   description?: string | null;
//   isCompleted?: boolean;
// }



// export const signup = async (data: SignupData) => {
//   try {
//     const response = await api.post("/signup", data);
//     return response.data; // typically your backend returns user info or a message
//   } catch (error: any) {
//     console.error("Signup API Error:", error.response?.data || error.message);
//     throw error; // rethrow so caller (component) can handle it
//   }
// };


// export const login = async (data:LoginData ) => {
//   try {
//     const response = await api.post("/login", data);
//     return response.data; // typically your backend returns user info or a message
//   } catch (error: any) {
//     console.error("Signup API Error:", error.response?.data || error.message);
//     throw error; // rethrow so caller (component) can handle it
//   }
// };

// export const getTasks = async () => {
//   try {
//     const response = await api.get("/tasks");
//     return response.data; // typically your backend returns user info or a message
//   } catch (error: any) {
//     console.error("Login API Error:", error.response?.data || error.message);
//     throw error; // rethrow so caller (component) can handle it
//   }
// };

// export const patchTask = async (taskId: number, data: UpdateTaskData) => {
//   try {
//     const response = await api.patch(`/update/${taskId}`, data);
//     return response.data; // { message, task }
//   } catch (error: any) {
//     console.error("patchTask Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export const deleteTask =async (taskId:number)=>{
//   try{
//     const response =await api.delete(`/delete/${taskId}`)
//     return response.data;
//   }catch (error:any){
//     console.error("delete task error",error.response?.data)
//     throw error
//   }
// }

// export const addNewTask = async (data:UpdateTaskData)=>{
//   try{
//     const response = await api.post('/addtask',data);
//     return response.data;
//   }catch(error:any){
//     console.error("AddTask error",error.response?.data)
//     throw error
//   }
// }


import axios from "axios";
import api from "./axiosInstance";

export interface SignupData {
  name: string;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string | null;
  isCompleted?: boolean;
}

// Helper function for extracting error messages
function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export const signup = async (data: SignupData) => {
  try {
    const response = await api.post("/signup", data);
    return response.data;
  } catch (error: unknown) {
    console.error("Signup API Error:", getErrorMessage(error));
    throw error;
  }
};

export const login = async (data: LoginData) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error: unknown) {
    console.error("Login API Error:", getErrorMessage(error));
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error: unknown) {
    console.error("Get Tasks Error:", getErrorMessage(error));
    throw error;
  }
};

export const patchTask = async (taskId: number, data: UpdateTaskData) => {
  try {
    const response = await api.patch(`/update/${taskId}`, data);
    return response.data;
  } catch (error: unknown) {
    console.error("Patch Task Error:", getErrorMessage(error));
    throw error;
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await api.delete(`/delete/${taskId}`);
    return response.data;
  } catch (error: unknown) {
    console.error("Delete Task Error:", getErrorMessage(error));
    throw error;
  }
};

export const addNewTask = async (data: UpdateTaskData) => {
  try {
    const response = await api.post("/addtask", data);
    return response.data;
  } catch (error: unknown) {
    console.error("Add Task Error:", getErrorMessage(error));
    throw error;
  }
};
