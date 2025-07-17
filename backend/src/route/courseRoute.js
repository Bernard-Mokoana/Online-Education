import {
  createCourse,
  getCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";
import express from "express";
import { verifyJwt, tutorOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyJwt, tutorOnly, createCourse);
router.get("/", verifyJwt, getCourse);
router.get("/:id", verifyJwt, getCourseById);
router.put("/:id", verifyJwt, tutorOnly, updateCourse);
router.delete("/:id", verifyJwt, tutorOnly, deleteCourse);

export default router;
