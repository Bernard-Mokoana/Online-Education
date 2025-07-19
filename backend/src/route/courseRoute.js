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

router
  .route("/")
  .post(tutorOnly, verifyJwt, createCourse)
  .get(verifyJwt, getCourse);

router
  .route("/:id")
  .get(verifyJwt, getCourseById)
  .put(tutorOnly, verifyJwt, updateCourse)
  .delete(tutorOnly, verifyJwt, deleteCourse);

export default router;
