import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routers/UserRouter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
