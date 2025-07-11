import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema({
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
  Order: Number,
});

export const lessons = mongoose.model("lessons", lessonSchema);
