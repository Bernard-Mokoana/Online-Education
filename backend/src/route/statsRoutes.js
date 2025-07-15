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

const router = express.Router();

router.get("/popular-courses", getPopularCourses);
router.get("/tutor-earnings", verifyJwt, tutorOnly, getTutorEarnings);
router.get("/student-progress", verifyJwt, getStudentProgress);
router.get("/monthly-revenue", verifyJwt, adminOnly, getMonthlyRevenue);
router.get("/category-stats", getCourseCategoryStats);
router.get("/top-tutors", getTopTutorsThisMonth);

export default router;
