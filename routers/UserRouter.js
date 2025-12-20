import express from "express";
import { SignUpUser } from "../controllers/UserController.js";
import upload from "../middleware/upload.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profilePic"), SignUpUser);

export default userRouter;
