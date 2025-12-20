import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
