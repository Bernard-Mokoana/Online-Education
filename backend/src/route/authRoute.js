import express from "express";
import { forgotPassword, resetPassword } from "../controller/AuthController.js";

const route = express.Router();

route.post("/forgot-password", forgotPassword);
route.post("/reset-password", resetPassword);

export default route;
