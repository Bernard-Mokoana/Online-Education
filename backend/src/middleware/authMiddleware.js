import { user } from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const verifyJwt = async (req, res, next) => {
  const authHeader = req.header.authorization;

  if (!authHeader || !authHeader.startWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized: No token" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    const User = user
      .findById(decoded.userId)
      .select("-password -refreshToken");

    if (!User) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token Invalid or expired" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "Admin") {
    return res.status(403).json({ message: "Admin only route" });
  }
  next();
};
