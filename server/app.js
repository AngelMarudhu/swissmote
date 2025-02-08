import express from "express";
import cors from "cors";
import { loginRouter } from "./Router/loginRouter.js";
import { eventRoute } from "./Router/eventRouter.js";
import authenticateUser from "./Middlewares/authMiddleware.js";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", loginRouter);
app.use("/api/event", authenticateUser, eventRoute);
