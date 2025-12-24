import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routers/UserRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRouter from "./routers/ProductRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource not found.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
