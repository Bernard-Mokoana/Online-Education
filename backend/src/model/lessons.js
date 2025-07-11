import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  content: {
    type: Number,
    default: 0,
  },
});

export const lessons = mongoose.model("lessons", lessonSchema);
