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

    // console.log(hashedPassword);
    // console.log(req.file);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePic: req.file ? req.file.filename : null,
    });

    res.json({
      status: true,
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
