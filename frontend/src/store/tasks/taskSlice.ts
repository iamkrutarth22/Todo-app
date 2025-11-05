import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITask } from "../../models/Task";

const initialState: ITask[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (_state, action: PayloadAction<ITask[]>) => action.payload,

     addTask: (_state, action: PayloadAction<ITask>) => {
      return [action.payload,..._state];
    },

    updateTask(state, action: PayloadAction<ITask>) {
      const index = state.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

const taskReducer = tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
export default taskReducer;
