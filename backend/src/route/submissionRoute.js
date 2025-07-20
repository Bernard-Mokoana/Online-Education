import express from "express";
import {
  createSubmission,
  getSubmissionByLesson,
  getSubmissionById,
  updateSubmissionGrade,
  deleteSubmission,
} from "../controller/submissionController.js";
import { verifyJwt, studentOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createSubmission);
router.get("/lesson/:lessonId", getSubmissionByLesson);
router.patch("/:id/grade", updateSubmissionGrade);

router.route("/:id").get(getSubmissionById).delete(deleteSubmission);

export default router;
