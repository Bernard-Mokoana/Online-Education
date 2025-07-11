import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema({
  assessmentId: {
    type: Schema.Types.ObjectId,
    ref: "assessment",
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  answers: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
    required: true,
  },
  gradeBy: {
    type: String,
    required: true,
  },
});

export const submission = mongoose.model("submission", submissionSchema);
