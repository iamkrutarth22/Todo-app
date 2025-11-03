import { createTask,getTasks ,completeTask,updateTask } from "../controllers/taskController.js";
import express from "express"; 

const router = express.Router();

router.get('/tasks',getTasks)
router.post('/addtask', createTask)
router.patch('/complete/:taskId',completeTask)
router.patch("/update/:taskId", updateTask);


export default router

