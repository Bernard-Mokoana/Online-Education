import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import courseRoute from "./route/courseRoute.js";
import userRoute from "./route/userRoute.js";
import statsRoute from "./route/statsRoutes.js";
import lessonRoute from "./route/lessonRoute.js";
import enrollmentRoute from "./route/enrollmentRoute.js";
import submissionRoute from "./route/submissionRoute.js";
import transactionRoute from "./route/transactionRoute.js";
import assessmentRoute from "./route/assessmentRoute.js";
import reportRoute from "./route/reportRoute.js";
import certificateRoute from "./route/certificateRoute.js";
import progressRoute from "./route/progressRoute.js";

app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/stats", statsRoute);
app.use("/api/v1/lessons", lessonRoute);
app.use("/api/v1/enrollments", enrollmentRoute);
app.use("/api/v1/submission", submissionRoute);
app.use("/api/v1/transaction", transactionRoute);
app.use("/api/v1/assessments", assessmentRoute);
app.use("/api/v1/reports", reportRoute);
app.use("/api/v1/certificates", certificateRoute);
app.use("/api/v1/progress", progressRoute);

export default app;
