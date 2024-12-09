import express from "express";
import { createUser } from "../controllers/user.Controller.js";

const userRouter = express.Router();

userRouter.post("/signup", createUser);

export default userRouter;
