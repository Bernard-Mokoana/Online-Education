import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../controller/userController.js";
import express from "express";
import { verifyJwt, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router
  .route("/profile")
  .get(verifyJwt, getUserProfile)
  .put(verifyJwt, updateUserProfile);
router.get("/", verifyJwt, adminOnly, getAllUsers);

export default router;
