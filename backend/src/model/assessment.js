import mongoose, { mongo, Schema } from "mongoose";

const assessmentSchema = new Schema(
  {
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: "lesson",
    },
    questions: {
      type: String,
      default: 0,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

export const assessment = mongoose.model("assessment", assessmentSchema);
