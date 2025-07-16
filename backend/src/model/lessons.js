import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    content: {
      type: String,
    },
    Order: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export const lessons = mongoose.model("lessons", lessonSchema);
