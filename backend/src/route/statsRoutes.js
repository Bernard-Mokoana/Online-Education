import express from "express";
import {
  getPopularCourses,
  getTutorEarnings,
  getStudentProgress,
  getMonthlyRevenue,
  getCourseCategoryStats,
  getTopTutorsThisMonth,
} from "../controller/statsController.js";
import {
  verifyJwt,
  tutorOnly,
  adminOnly,
} from "../middleware/authMiddleware.js";

const route = express.Router();

route.get("/popular-courses", getPopularCourses);
route.get("/tutor-earnings", verifyJwt, tutorOnly, getTutorEarnings);
route.get("/student-progress", verifyJwt, getStudentProgress);
route.get("/monthly-revenue", verifyJwt, adminOnly, getMonthlyRevenue);
route.get("/course-category-stats", getCourseCategoryStats);
route.get("/top-tutors-this-month", getTopTutorsThisMonth);

export default route;
