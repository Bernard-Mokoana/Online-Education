import express from "express";
import {
  createAssessment,
  getAssessment,
  getAssessmentByLesson,
  updateAssessment,
  deleteAssessment,
} from "../controller/assessmentController.js";
import {
  verifyJwt,
  tutorOnly,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyJwt, tutorOnly, createAssessment);
router
  .route("/:id")
  .get(getAssessment)
  .put(updateAssessment)
  .delete(deleteAssessment);
router.route("/:lessonId").get(getAssessmentByLesson);

export default router;
