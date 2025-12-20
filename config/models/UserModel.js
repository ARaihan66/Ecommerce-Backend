import mongoose from "mongoose";

const userSchema = new mongoose({
  username: String,
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  profilePic: String,
});

const User = mongoose.model("users", userSchema);
