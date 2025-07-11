import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
    amount: {
      type: Number,
      default: 0,
    },
    method: {
      type: String,
    },
    status: {
      type: String,
    },
    date: {
      type: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);
