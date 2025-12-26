import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username?: string;
  email: string;
  password: string;
  profilePic?: String;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: String,
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("user", userSchema);

export default User;
