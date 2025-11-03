import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
dotenv.config();

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("hello");
    if (!authHeader) {
      res.send(401).json({
        message: "Authorization hearder missing",
      });
    }
    const token = authHeader!.split(' ')[1];
    console.log("decoded token=>>>>",token);
    const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
    console.log(decodedToken)

    if (!decodedToken) {
      res.status(401).json({
        message: "unauthenticated",
      });
    }
    req.userId = (decodedToken as JwtPayload).userId 
    next();
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
