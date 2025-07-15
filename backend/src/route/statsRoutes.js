import express from "express";
import {
  getPopularCourses,
  getTutorEarnings,
  getStudentProgress,
} from "../controller/statsController.js";
import { verifyJwt, tutorOnly } from "../middleware/authMiddleware.js";

const route = express.Router();

route.get("/popular-courses", getPopularCourses);
route.get("/tutor-earnings", verifyJwt, tutorOnly, getTutorEarnings);
route.get("/student-progress", verifyJwt, getStudentProgress);

export default route;
