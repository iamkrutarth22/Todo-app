import type { Response, Request } from "express";
import bcrypt from "bcrypt";
import { PrismaClient,Prisma } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {

    console.log("req body",req.body)
  const { name, email, password } = req.body;

    console.log("ksksk1")
  if (!name || !email || !password) {
    console.log("ksksk2")
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      message: `User ${userWithoutPassword.name} created successfully`,
      user: userWithoutPassword,
    });
  } catch (err: any) {
    
    console.error(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const fields = err.meta?.target as string[];
      if (fields?.includes("email")) {
        return res.status(409).json({ message: "Email already registered" });
      }
    }

    console.error(err);
    return res.status(500).json({
      message: "Something went wrong while creating the user",
      error: err.message,
    });
  }
};