import express from "express";
import { userLogin, userRegister } from "../Controllers/authController.js";

export const loginRouter = express.Router();

loginRouter.post("/register", userRegister);
loginRouter.post("/login", userLogin);
