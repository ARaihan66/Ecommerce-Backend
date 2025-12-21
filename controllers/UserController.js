import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

// User sign up
export const SignUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.json({
        success: true,
        message: "User already exist.",
      });
    }

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
        error: true,
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.json({
        error: true,
        message: "Password is required.",
      });
    }

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.json({
        error: true,
        message: "User not exist.",
      });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.json({
        error: true,
        message: "Password doesn't match.",
      });
    }

    const token = jwt.sign({ id: existUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == !"production",
      samesite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Log in successful.",
      user: existUser,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: true,
      message: "Server error",
    });
  }
};
