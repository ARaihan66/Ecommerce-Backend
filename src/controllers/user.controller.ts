import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

// User sign up
export const SignUpUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "User already exist.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePic: req.file
        ? {
            fileName: req.file.filename,
            path: req.file.path,
          }
        : undefined,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

// User sign in
export const SignInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(409).json({
        success: false,
        message: "Email or password incorrect.",
      });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password doesn't match.",
      });
    }

    const token = jwt.sign(
      { id: existUser._id },
      process.env.JWT_TOKEN as string,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Log in successful.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

// Get user details
export const userDetails = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.userId;
    console.log(id);

    const existUser = await User.findById(id).select("-password");

    console.log(existUser);

    if (!existUser) {
      return res.status(409).json({
        success: false,
        message: "User not exist.",
      });
    }

    res.status(200).json({
      success: true,
      data: existUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

// User sign out
export const signOutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Retrieve all users",
      users: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

// Update user role
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { email, userRole } = req.body;

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(existUser._id, {
      role: userRole,
    });

    res.status(200).json({
      success: true,
      message: "User role updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
