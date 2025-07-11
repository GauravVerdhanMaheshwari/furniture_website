// controllers/adminController.js

const mongoose = require("mongoose");
const { Product } = require("../Models/product");
const Package = require("../Models/package");
const Admin = require("../Models/admin");

// ----------------------------- PRODUCT MANAGEMENT -----------------------------

// Fetch all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Failed to fetch products:", error.message); // Log error
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// Add a new product
exports.addProduct = async (req, res, next) => {
  const { name, description, price, New, Hot, Package, Length, Height, Depth } =
    req.body;
  const images = req.body.images || [];
  const company = req.body.company || "Made in Factory";
  const AddedDate = new Date().toISOString();
  const PackageName = Package ? req.body.PackageName : "";

  if (!name || !description || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      size: {
        Length: Length || 0,
        Height: Height || 0,
        Depth: Depth || 0,
      },
      images,
      company,
      New: New || false,
      Hot: Hot || false,
      AddedDate,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

// Fetch categorized products
exports.getNewProducts = async (req, res, next) => {
  try {
    const newProducts = await Product.find({ New: true })
      .sort({ AddedDate: -1 })
      .limit(3);
    res.status(200).json(newProducts);
  } catch (error) {
    next(error);
  }
};

exports.getHotProducts = async (req, res, next) => {
  try {
    const hotProducts = await Product.find({ Hot: true })
      .sort({ AddedDate: -1 })
      .limit(3);
    res.status(200).json(hotProducts);
  } catch (error) {
    next(error);
  }
};

// Get single product by ID
exports.getProductById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Update a product
exports.updateProduct = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    next(error);
  }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Reject product by setting a flag
exports.rejectProduct = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.rejected = true;
    await product.save();
    res.status(200).json({ message: "Product rejected successfully", product });
  } catch (error) {
    next(error);
  }
};

// ----------------------------- ADMIN MANAGEMENT -----------------------------

// Admin login
exports.loginOwner = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const owner = await Admin.findOne({ email, password });
    if (!owner) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Admin logged in successfully",
      owner,
      isAuthenticated: true,
    });
  } catch (error) {
    next(error);
  }
};

// Update owner profile
exports.updateOwnerProfile = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const owner = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ message: "Owner profile updated", owner });
  } catch (error) {
    next(error);
  }
};

// Get owner profile
exports.getOwnerProfile = async (req, res, next) => {
  try {
    const owners = await Admin.find();
    if (!owners.length) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json(owners);
  } catch (error) {
    next(error);
  }
};

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().populate("items.productId", "name");
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch packages" });
  }
};

// Get package by ID
exports.getPackageById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid package ID format" });
  }

  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(package);
  } catch (error) {
    next(error);
  }
};

// Create a new package
exports.addPackages = async (req, res, next) => {
  const { packageName, items, price } = req.body;

  if (!packageName || !items || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPackage = new Package({
      packageName,
      items,
      price,
    });

    await newPackage.save();
    res
      .status(201)
      .json({ message: "Package created successfully", newPackage });
  } catch (error) {
    console.error("❌ Failed to create package:", error.message); // Log error
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// Update a package by ID
exports.updatePackage = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid package ID format" });
  }

  const { packageName, items, price } = req.body;

  if (!packageName || !items || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { packageName, items, price },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res
      .status(200)
      .json({ message: "Package updated successfully", updatedPackage });
  } catch (error) {
    console.error("❌ Failed to update package:", error.message); // Log error
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
// Delete a package by ID
exports.deletePackage = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid package ID format" });
  }

  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("❌ Failed to delete package:", error.message); // Log error
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
