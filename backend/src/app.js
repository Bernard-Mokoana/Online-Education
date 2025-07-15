import express from "express";

const app = express();

app.use(express.json());

import courseRoute from "./route/courseRoute.js";
import userRoute from "./route/userRoute.js";
import statsRoute from "./route/statsRoutes.js";

app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/stats", statsRoute);

export default app;
