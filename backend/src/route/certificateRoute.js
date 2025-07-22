import express from "express";
import {
  generateCertificate,
  getCertificate,
  deleteCertificate,
} from "../controller/certificateController.js";
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate/:userId/:courseId", generateCertificate);
router.get("/:userId", getCertificate);
router.delete("/:id", deleteCertificate);

export default router;
