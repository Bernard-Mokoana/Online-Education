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

router.use(verifyJwt);

router
  .route("/course/:courseId")
  .get(getLessonsByCourse)
  .post(tutorOnly, createLesson);

router
  .route("/:id")
  .get(getLessonById)
  .put(tutorOnly, updateLesson)
  .delete(tutorOnly, deleteLesson);

export default router;
