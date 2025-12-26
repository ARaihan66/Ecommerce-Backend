import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  brandName: string;
  category: string;
  productImage: { fileName: string; path: string }[];
  description?: string;
  price: number;
  sellingPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    productImage: [
      {
        fileName: { type: String, required: true },
        path: { type: String, required: true },
      },
    ],
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("products", productSchema);

export default Product;
