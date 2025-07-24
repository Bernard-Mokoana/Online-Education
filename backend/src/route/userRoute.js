import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../controller/userController.js";
import express from "express";
import {
  verifyJwt,
  adminOnly,
  studentOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.use(verifyJwt);

router.post("/login", login);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.get("/", adminOnly, getAllUsers);

export default router;
