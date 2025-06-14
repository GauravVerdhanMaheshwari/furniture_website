const mongoose = require("mongoose");
const Product = require("../Models/product");

// Fetch all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// New products
exports.getNewProducts = async (req, res, next) => {
  try {
    const newProducts = await Product.find({ New: true })
      .sort({ AddedDate: -1 })
      .limit(3);

    if (newProducts.length === 0) {
      return res
        .status(200)
        .json({ message: "No products found", products: [] });
    }

    res.json(newProducts);
  } catch (error) {
    next(error);
  }
};

// Hot products
exports.getHotProducts = async (req, res, next) => {
  try {
    const hotProducts = await Product.find({ Hot: true })
      .sort({ AddedDate: -1 })
      .limit(3);

    if (hotProducts.length === 0) {
      return res
        .status(200)
        .json({ message: "No products found", products: [] });
    }

    res.json(hotProducts);
  } catch (error) {
    next(error);
  }
};

// Package products
exports.getPackageProducts = async (req, res, next) => {
  try {
    const packageProducts = await Product.find({ Package: true })
      .sort({ AddedDate: -1 })
      .limit(3);

    if (packageProducts.length === 0) {
      return res
        .status(200)
        .json({ message: "No products found", products: [] });
    }

    res.json(packageProducts);
  } catch (error) {
    next(error);
  }
};

// Get product by ID with validation
exports.getProductById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Update a product with ID validation
exports.updateProduct = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", data: updated });
  } catch (error) {
    next(error);
  }
};

// Delete a product with ID validation
exports.deleteProduct = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
