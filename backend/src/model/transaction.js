import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  amount: {
    type: Number,
  },
  method: {
    type: String,
    enum: ["eft", "card", "cash", "wallet"],
    default: "wallet",
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  reference: String,
  date: {
    type: Date,
    default: Date.now,
  },
});
