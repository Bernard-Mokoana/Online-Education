import express from "express";
import {
  createTransactions,
  getAllTransactions,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controller/transactionController.js";

const router = express.Router();

router.post("/", createTransactions);
router.get("/", getAllTransactions);
router.get("/user/:userId", getUserTransactions);
router.put("/:id/status", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
