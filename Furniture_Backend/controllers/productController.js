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

exports.getNewProducts = async (req, res, next) => {
  try {
    const newProducts = await Product.find({ New: true })
      .sort({ AddedDate: -1 })
      .limit(3);
    if (newProducts.length === 0) {
      return res.status(404).json({ message: "No new products found" });
    }
    res.json(newProducts);
  } catch (error) {
    next(error);
  }
};

exports.getHotProducts = async (req, res, next) => {
  try {
    const hotProducts = await Product.find({ Hot: true })
      .sort({ AddedDate: -1 })
      .limit(3);
    if (hotProducts.length === 0) {
      return res.status(404).json({ message: "No hot products found" });
    }
    res.json(hotProducts);
  } catch (error) {
    next(error);
  }
};

exports.getPackageProducts = async (req, res, next) => {
  try {
    const packageProducts = await Product.find({ Package: true })
      .sort({ AddedDate: -1 })
      .limit(3);
    if (packageProducts.length === 0) {
      return res.status(404).json({ message: "No package products found" });
    }
    res.json(packageProducts);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
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

// Add a new product
exports.addProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    next(error);
  }
};

// Update a product
exports.updateProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
