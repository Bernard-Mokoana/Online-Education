import express from "express";
import {
  getLessonsByCourse,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../controller/lessonController.js";
import { verifyJwt, tutorOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/course/:courseId")
  .get(getLessonsByCourse)
  .post(verifyJwt, tutorOnly, createLesson);

router
  .route("/:id")
  .get(getLessonById)
  .put(verifyJwt, tutorOnly, updateLesson)
  .delete(verifyJwt, tutorOnly, deleteLesson);

export default router;
