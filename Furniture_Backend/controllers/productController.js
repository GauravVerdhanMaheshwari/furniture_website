const mongoose = require("mongoose");
const { Product, CATEGORY_ENUM } = require("../Models/product");

exports.getProductCategories = async (req, res) => {
  res.status(200).json(CATEGORY_ENUM);
};

// other existing handlers remain the same...

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 */
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch latest added products (New)
 * @route   GET /api/products/new
 */
exports.getNewProducts = async (req, res, next) => {
  try {
    const newProducts = await Product.find({ New: true })
      .sort({ AddedDate: -1 })
      .limit(3);

    if (newProducts.length === 0) {
      return res
        .status(200)
        .json({ message: "No new products found", products: [] });
    }

    res.status(200).json(newProducts);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch hot-selling products
 * @route   GET /api/products/hot
 */
exports.getHotProducts = async (req, res, next) => {
  try {
    const hotProducts = await Product.find({ Hot: true })
      .sort({ AddedDate: -1 })
      .limit(3);

    if (hotProducts.length === 0) {
      return res
        .status(200)
        .json({ message: "No hot products found", products: [] });
    }

    res.status(200).json(hotProducts);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch products that are part of a package deal
 * @route   GET /api/products/package
 */
exports.getPackageProducts = async (req, res, next) => {
  try {
    const packageProducts = await Product.find({ Package: true })
      .sort({ AddedDate: -1 })
      .limit(3);

    if (packageProducts.length === 0) {
      return res
        .status(200)
        .json({ message: "No package products found", products: [] });
    }

    res.status(200).json(packageProducts);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a product by its ID
 * @route   GET /api/products/:id
 */
exports.getProductById = async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a product by its ID
 * @route   PUT /api/products/:id
 */
exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure updates follow schema
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product by its ID
 * @route   DELETE /api/products/:id
 */
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
