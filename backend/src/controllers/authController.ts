import type { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (trimmedEmail === "" || trimmedPassword === "") {
    return res.status(400).json({
      message: "Email and password cannot be empty",
    });
  }

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate access token (1 hour)
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        userid: userWithoutPassword.id,
        usernamename: userWithoutPassword.name,
        email: userWithoutPassword.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};