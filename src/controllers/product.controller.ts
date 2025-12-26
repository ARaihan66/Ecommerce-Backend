import { Request, Response } from "express";
import Product from "../models/product.model.js";
import { Multer } from "multer";

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

    console.log(req.files);

    const product = await Product.create({
      productName,
      brandName,
      category,
      description,
      price: Number(price),
      sellingPrice: Number(sellingPrice),
      productImage: files.map((file) => {
        return {
          fileName: file.filename,
          path: file.path,
        };
      }),
    });

    res.status(200).json({
      success: true,
      message: "Product created successfully.",
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
