import express from "express";

const app = express();

app.use(express.json());

import courseRoute from "./route/courseRoute.js";
import userRoute from "./route/userRoute.js";
import statsRoute from "./route/statsRoutes.js";
import lessonRoute from "./route/lessonRoute.js";
import enrollmentRoute from "./route/enrollmentRoute.js";
import submissionRoute from "./route/submissionRoute.js";
import transactionRoute from "./route/transactionRoute.js";

app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/stats", statsRoute);
app.use("/api/v1/lessons", lessonRoute);
app.use("/api/v1/enrollments", enrollmentRoute);
app.use("/api/v1/submission", submissionRoute);
app.use("/api/v1/transaction", transactionRoute);

export default app;
