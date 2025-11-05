import type { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "../../generated/prisma/client.js";

const prismaClient = new PrismaClient();

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in get tasks");

  // const userId = 1; // Hardcoded as requested

  const userId = Number(req.userId);
  console.log("inside get users", userId);
  try {
    const tasks = await prismaClient.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Failed to fetch tasks", error: err });
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.userId);

    const { title, description } = req.body;

    console.log("Incoming body:", req.body);

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const finalDescription = description?.trim() || null;
    const finalIsCompleted = false;

    const newTask = await prismaClient.task.create({
      data: {
        title: title.trim(),
        description: finalDescription,
        isCompleted: finalIsCompleted,
        user: {
          connect: { id: userId }, // assuming user.id is Int
        },
      },
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const completeTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = Number(req.params.taskId);
  const userId = Number(req.userId);

  if (!taskId) {
    console.log(taskId);
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const task = await prismaClient.task.findUnique({
      where: { id: taskId },
      select: { id: true, userId: true, isCompleted: true },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prismaClient.task.update({
      where: { id: taskId },
      data: { isCompleted: true },
    });

    return res.status(200).json({
      message: "Task marked as completed",
      task: updatedTask,
    });
  } catch (error) {
    console.error("completeTask error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = Number(req.params.taskId);
  const userId = Number(req.userId);


  if (!taskId || isNaN(taskId)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const { title, description ,isCompleted } = req.body;

  // if (title === undefined && description === undefined && isCompleted) {
  //   return res.status(400).json({
  //     message: "Nothing to update. Provide title or description.",
  //   });
  // }

  try {
    const taskExists = await prismaClient.task.findUnique({
      where: { id: taskId },
    });

   
    if (!taskExists) {
      return res.status(404).json({ message: "Task not found" });
    }

    if(taskExists.userId !==userId){
      return res.status(403).json({ message: "Unauthorized: Not your task" });
    }


    const updateData: { title?: string; description?: string | null ; isCompleted?:boolean} = {};

    if (title !== undefined) {
      const trimmed = title.trim();
      if (trimmed === "") {
        return res.status(400).json({ message: "Title cannot be empty" });
      }
      updateData.title = trimmed;
    }

    if (description !== undefined) {
      const trimmed = description.trim();
      updateData.description = trimmed === "" ? null : trimmed;
    }

    if (isCompleted !== undefined) {
      if (typeof isCompleted !== "boolean") {
        return res.status(400).json({ message: "isCompleted must be a boolean" });
      }
      updateData.isCompleted = isCompleted;
    }

    const updatedTask = await prismaClient.task.update({
      where: { id: taskId },
      data: updateData,
    });

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("updateTask error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = Number(req.params.taskId);
  const userId= Number(req.userId)

  if (!taskId || isNaN(taskId)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const task = await prismaClient.task.findUnique({
      where: { id: taskId },
      select: { id: true, userId: true },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if(task.userId !==userId){
      return res.status(403).json({ message: "Unauthorized: Not your task" });
    }


    await prismaClient.task.delete({
      where: { id: taskId },
    });

    return res.status(200).json({
      message: "Task deleted successfully",
      deletedTaskId: taskId,
    });
  } catch (error) {
    console.error("deleteTask error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
