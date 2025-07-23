import express from "express";
import { checkCourseCompletion } from "../controller/progressController.js";
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check/:userId/:courseId", verifyJwt, checkCourseCompletion);

export default router;
