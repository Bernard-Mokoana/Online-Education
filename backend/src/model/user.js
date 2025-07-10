import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be 8 characters long"],
    },
    role: {
      type: String,
      enum: ["Student", "Admin", "Tutor"],
      required: true,
    },
    isVerified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const user = new mongoose.model("User", userSchema);
