import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routers/user.router";
import productRouter from "./routers/product.router";

dotenv.config();

const app = express();

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

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Resource not found.",
  });
});

export default app;
