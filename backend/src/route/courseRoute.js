import {
  createCourse,
  getCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";
import express from "express";
import {
  verifyJwt,
  tutorOnly,
  studentOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyJwt);

router
  .route("/")
  .post(tutorOnly, createCourse)
  .get(studentOnly, tutorOnly, getCourse);

router
  .route("/:id")
  .get(studentOnly, getCourseById)
  .put(tutorOnly, updateCourse)
  .delete(tutorOnly, deleteCourse);

export default router;
