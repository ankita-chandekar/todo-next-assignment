import jwt from "jsonwebtoken";
import { parse } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "secret key";

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
};

export const parseAuthCookie = (
  cookieHeader: string | undefined
): string | null => {
  if (!cookieHeader) return null;
  const cookies = parse(cookieHeader);
  return cookies.authToken || null;
};
