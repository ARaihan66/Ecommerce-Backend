import express from "express";
import {
  getAllUsers,
  SignInUser,
  signOutUser,
  SignUpUser,
  updateUserRole,
  userDetails,
} from "../controllers/UserController.js";
import upload from "../middleware/upload.js";
import authUser from "../middleware/AuthUser.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profilePic"), SignUpUser);
userRouter.post("/signin", SignInUser);
userRouter.get("/details", authUser, userDetails);
userRouter.get("/sign-out", authUser, signOutUser);
userRouter.get("/get-all", authUser, getAllUsers);
userRouter.post("/role-update", authUser, updateUserRole);

export default userRouter;
