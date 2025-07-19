import express from "express";
import {
  enrollInCourse,
  getUserEnrollments,
  markLessonComplete,
  deleteEnrollment,
} from "../controller/enrollmentController.js";
import {
  verifyJwt,
  studentOnly,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/enroll", verifyJwt, studentOnly, enrollInCourse);
router.get(
  "/user/:userId",
  adminOnly,
  studentOnly,
  verifyJwt,
  getUserEnrollments
);
router.patch("/complete", studentOnly, verifyJwt, markLessonComplete);
router.delete("/:id", verifyJwt, studentOnly, adminOnly, deleteEnrollment);

export default router;
