import bcrypt from "bcrypt";
import User from "../config/models/UserModel.js";

// User sign up
export const SignUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password) {
      return res.json({
        status: false,
        message: "Email and Password are required",
      });
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({
      status: true,
      message: "User created successfully.",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
