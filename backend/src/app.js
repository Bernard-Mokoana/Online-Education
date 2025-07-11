import express from "express";

const app = express();

import courseRoute from "./route/courseRoute.js";

app.use("/api/v1/courses", courseRoute);

export default app;
