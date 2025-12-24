import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
});

const Product = mongoose.model("products", productSchema);

export default Product;
