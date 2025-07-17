import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      default: 0,
    },
    tutor: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isPublished: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const course = mongoose.model("course", courseSchema);
