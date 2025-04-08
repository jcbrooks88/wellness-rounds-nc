import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request } from "express";

dotenv.config();

const secret = process.env.JWT_SECRET;
const expiration = "2h";

// Extend Express Request type to include `user`
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

// 🔒 Middleware to verify token and extract user data
export function authMiddleware({ req }: { req: Request }) {
  console.log("🔍 Request Headers:", req.headers); // Optional debug

  let token = req.headers.authorization;

  if (!token) {
    console.log("⚠️ No Authorization header found");
    return { user: null };
  }

  token = token.split(" ").pop()?.trim() ?? "";
  console.log("✅ Processed Token:", token); // Optional debug

  try {
    if (!secret) {
      throw new Error("❌ JWT_SECRET is missing in environment variables.");
    }

    const decoded = jwt.verify(token, secret);

    console.log("🔓 Decoded Token:", decoded); // Optional debug

    // Only accept token structure: { data: { ...user } }
    if (typeof decoded !== "string" && "data" in decoded) {
      return { user: decoded.data };
    }
  } catch (error) {
    console.log("❌ JWT Verification Error:", error);
  }

  return { user: null };
}

// 🔑 Token signer with embedded user data
export function signToken({ username, email, _id }: UserPayload) {
  console.log("📝 Signing Token...");
  console.log("📦 Payload:", { username, email, _id });

  if (!secret) {
    throw new Error("❌ JWT_SECRET is not defined.");
  }

  return jwt.sign(
    { data: { username, email, _id } }, // Embed user data under `data`
    secret,
    { expiresIn: expiration }
  );
}
