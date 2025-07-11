import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
    progress: {
      type: Number,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
    certificateUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const enrollment = mongoose.model("enrollment", enrollmentSchema);
