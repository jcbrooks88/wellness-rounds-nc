import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request } from "express";

dotenv.config();

const secret = process.env.JWT_SECRET;
const expiration = "2h";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface UserPayload {
  username: string;
  email: string;
  _id: string;
}

export function authMiddleware({ req }: { req: Request }) {
  console.log("🔍 Request Headers:", req.headers); // Debugging

  let token = req.headers.authorization;
  console.log("🛑 Raw Token:", token); // Debugging

  if (!token) {
    console.log("⚠️ No Authorization header found");
    return { user: null };
  }

  token = token.split(" ").pop()?.trim() ?? "";
  console.log("✅ Processed Token:", token); // Debugging

  try {
    if (!secret) {
      throw new Error("❌ JWT_SECRET is missing in environment variables.");
    }
    const decoded = jwt.verify(token, secret);
    console.log("🔓 Decoded Token:", decoded); // Debugging

    if (typeof decoded !== "string" && "data" in decoded) {
      return { user: decoded.data };
    }
  } catch (error) {
    console.log("❌ JWT Verification Error:", error);
  }

  return { user: null };
}

export function signToken({ username, email, _id }: UserPayload) {
  console.log("📝 Signing Token...");
  console.log("🔑 Secret Key:", secret);
  console.log("📦 Payload:", { username, email, _id });

  if (!secret) {
    throw new Error("❌ JWT_SECRET is not defined.");
  }

  return jwt.sign({ data: { username, email, _id } }, secret, { expiresIn: expiration });
}
