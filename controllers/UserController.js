import bcrypt from "bcrypt";
import User from "../models/UserModel.js";

// User sign up
export const SignUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!email || !password) {
      return res.json({
        status: false,
        message: "Email and Password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePic: req.file ? req.file.filename : null,
    });

    res.json({
      success: true,
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};

// User sign in
export const SignInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.json({
        message: "Password is required.",
      });
    }

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.json({
        success: true,
        message: "User not exist.",
      });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.json({
        message: "Password doesn't match.",
      });
    }

    res.json({
      success: true,
      message: "Log in successful.",
      user: existUser,
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};
