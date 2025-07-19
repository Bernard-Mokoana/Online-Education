import express from "express";
import {
  createSubmission,
  getSubmissionByLesson,
  getSubmissionById,
  updateSubmissionGrade,
  deleteSubmission,
} from "../controller/submissionController.js";

const router = express.Router();

router.post("/", createSubmission);
router.get("/lesson/:lessonId", getSubmissionByLesson);
router.get("/:id", getSubmissionById);
router.patch("/:id/grade", updateSubmissionGrade);
router.delete("/:id", deleteSubmission);

export default router;
