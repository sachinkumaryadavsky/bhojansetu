import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const signToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET);
