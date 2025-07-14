import { user } from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const accessToken = process.env.ACCESS_TOKEN_SECRET;

export const verifyJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "No token, not authorized" });

    const decoded = jwt.verify(token, accessToken);

    const User = user
      .findById(decoded.userId)
      .select("-password -refreshToken");

    if (!User) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = User;
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
