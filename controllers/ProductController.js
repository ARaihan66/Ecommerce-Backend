import Product from "../models/ProductModel.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      brandName,
      category,
      description,
      price,
      sellingPrice,
    } = req.body;

    if (!productName) {
      return res.status(400).json({
        success: false,
        message: "Product name is required.",
      });
    }
    if (!brandName) {
      return res.status(400).json({
        success: false,
        message: "Brand name is required.",
      });
    }
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }
    if (!price) {
      return res.status(400).json({
        success: false,
        message: "Price is required.",
      });
    }
    if (!sellingPrice) {
      return res.status(400).json({
        success: false,
        message: "Selling Price is required.",
      });
    }

    if (!req.files || req.files.length === 0) {
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
      productImage: req.files.map((file) => {
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
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
