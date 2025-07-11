import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema({
  assessmentId: {
    type: Schema.Types.ObjectId,
    ref: "assessment",
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  answers: {
    type: [String],
  },
  score: {
    type: Number,
  },
  gradeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

submissionSchema({ assessment: 1, student: 1 }, { unique: true });

export const submission = mongoose.model("submission", submissionSchema);
