import express from "express";
import { createProduct } from "../controllers/product.controller";
import authUser from "../middleware/AuthUser";
import upload from "../middleware/upload";

const productRouter = express.Router();

productRouter.post(
  "/create",
  authUser,
  upload.array("productImage"),
  createProduct
);

export default productRouter;
