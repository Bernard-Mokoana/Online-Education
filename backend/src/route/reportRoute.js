import express from "express";
import {
  averageGradePerCourse,
  submissionsPerLesson,
  topPerformingStudents,
} from "../controller/reportController.js";

const router = express.Router();

router.get("/average-grade-per-course", averageGradePerCourse);
router.get("/submissions-per-lesson", submissionsPerLesson);
router.get("/top-performing-students", topPerformingStudents);

export default router;
