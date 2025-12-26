import express from "express";
import { createProduct } from "../controllers/ProductController.js";
import authUser from "../middleware/AuthUser.js";
import upload from "../middleware/upload.js";

const productRouter = express.Router();

productRouter.post(
  "/create",
  authUser,
  upload.array("productImage"),
  createProduct
);

export default productRouter;
