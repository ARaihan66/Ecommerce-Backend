import express from "express";
import { SignInUser, SignUpUser } from "../controllers/UserController.js";
import upload from "../middleware/upload.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profilePic"), SignUpUser);
userRouter.post("/signin", SignInUser);

export default userRouter;
