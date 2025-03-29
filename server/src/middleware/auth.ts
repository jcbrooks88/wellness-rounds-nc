import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET || "supersecretkey";
const expiration = "2h";

import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function authMiddleware({ req }: { req: Request }) {
  let token = req.headers.authorization;
  if (token) {
    token = (token?.split(" ").pop() ?? "").trim();
    try {
      const decoded = jwt.verify(token, secret);
      if (typeof decoded !== "string" && "data" in decoded) {
        const { data } = decoded;
        req.user = data;
      }
    } catch {
      console.log("Invalid token");
    }
  }
  return req;
}

interface UserPayload {
  username: string;
  email: string;
  _id: string;
}

export function signToken({ username, email, _id }: UserPayload) {
  return jwt.sign({ data: { username, email, _id } }, secret, { expiresIn: expiration });
}
