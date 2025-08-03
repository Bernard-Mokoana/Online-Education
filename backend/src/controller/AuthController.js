import { user } from "../model/user.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await user.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    existingUser.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    existingUser.resetPasswordEXpire = Date.now() + 10 * 60 * 1000;
    await existingUser.save();

    const resetUrl = `${process.env.CORS_ORIGIN}/reset-password/${resetToken}`;
    const html = `<h2>Reset Your password</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>This link expires in 10 minutes.</p>
    `;

    await sendEmail(existingUser.email, html);

    return res
      .status(200)
      .json({ message: "Password reset link sent to email " });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const tokenHash = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const existingUser = await user.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordEXpire: { $gt: Date.now() },
    });

    if (!existingUser)
      return res.status(400).json({ message: "Token invalid or expired" });

    existingUser.password = req.body.password;
    existingUser.resetPasswordToken = undefined;
    existingUser.resetPasswordEXpire = undefined;
    await existingUser.save();

    return res
      .status(200)
      .json({ message: "Password reset successful. Please log in." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error resetting the password", error: error.message });
  }
};
