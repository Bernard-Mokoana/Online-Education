import express from "express";
import {
  enrollInCourse,
  getUserEnrollments,
  markLessonComplete,
  deleteEnrollment,
} from "../controller/enrollmentController.js";

const router = express.Router();

router.post("/enroll", enrollInCourse);
router.get("/user/:userId", getUserEnrollments);
router.patch("/complete", markLessonComplete);
router.delete("/:id", deleteEnrollment);

export default router;
