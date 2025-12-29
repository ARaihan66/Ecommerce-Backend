import express from "express";
import {
  createProduct,
  GetAllProduct,
} from "../controllers/product.controller";
import authUser from "../middleware/AuthUser";
import upload from "../middleware/upload";

const productRouter = express.Router();

productRouter.post(
  "/create",
  authUser,
  upload.array("productImage"),
  createProduct
);
productRouter.get("/get", GetAllProduct);

export default productRouter;
