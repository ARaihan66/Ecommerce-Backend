import express from "express";
import {
  getAllUsers,
  SignInUser,
  signOutUser,
  SignUpUser,
  updateUserRole,
  userDetails,
} from "../controllers/user.controller";
import upload from "../middleware/upload";
import authUser from "../middleware/AuthUser";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profilePic"), SignUpUser);
userRouter.post("/signin", SignInUser);
userRouter.get("/details", authUser, userDetails);
userRouter.get("/sign-out", authUser, signOutUser);
userRouter.get("/get-all", authUser, getAllUsers);
userRouter.post("/role-update", authUser, updateUserRole);

export default userRouter;
