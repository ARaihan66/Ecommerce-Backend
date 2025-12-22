import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status.json({
        error: true,
        message: "Please Login First",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ error: true, message: "Server error." });
  }
};

export default authUser;
