import express from "express";

const app = express();

app.use(express.json());

import courseRoute from "./route/courseRoute.js";
import userRoute from "./route/courseRoute.js";

app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/user", userRoute);

export default app;
