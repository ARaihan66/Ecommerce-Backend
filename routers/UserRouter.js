import express from "express";
import { SignUpUser } from "../controllers/UserController.js";
import upload from "../middleware/upload.js";

const userRouter = express.Router();

userRouter.post("/create", upload.single("profilePic"), SignUpUser);

export default userRouter;
