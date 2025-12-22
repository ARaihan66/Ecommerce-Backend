import express from "express";
import { SignInUser, SignUpUser } from "../controllers/UserController.js";
import upload from "../middleware/upload.js";
import authUser from "../middleware/AuthUser.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profilePic"), SignUpUser);
userRouter.post("/signin", SignInUser);
userRouter.get("/data", authUser, (req, res) => {
  res.json({
    userId: req.userId,
    message: "Hey there!!! I am executing after user authentication.....",
  });
});

export default userRouter;
