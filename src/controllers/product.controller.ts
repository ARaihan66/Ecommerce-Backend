import { Request, Response } from "express";
import Product from "../models/product.model";
import { Multer } from "multer";
import cloudinary from "../utils/cloudinary";
import { uploadProductPermission } from "../helper/permission";
import console from "node:console";

interface IProductImage {
  fileName: string;
  path: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Create product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      brandName,
      category,
      description,
      price,
      sellingPrice,
    } = req.body;

    const id: string = req.userId;

    if (!uploadProductPermission(id)) {
      return res.status(400).json({
        success: false,
        message: "You are not allow to upload image.",
      });
    }

    if (!productName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Product name is required.",
      });
    }
    if (!brandName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Brand name is required.",
      });
    }
    if (!category?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }
    if (!price?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Price is required.",
      });
    }
    if (!sellingPrice?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Selling Price is required.",
      });
    }

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required.",
      });
    }

    let productImageData: IProductImage[] = [];

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const uploadImage = req.files?.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return {
          fileName: file.filename,
          path: result.secure_url,
        };
      });

      productImageData = await Promise.all(uploadImage);
    }

    const product = await Product.create({
      productName,
      brandName,
      category,
      description,
      price: Number(price),
      sellingPrice: Number(sellingPrice),
      productImage: productImageData,
    });

    return res.status(200).json({
      success: true,
      message: "Product created successfully.",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
