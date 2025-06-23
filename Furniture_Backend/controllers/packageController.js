const mongoose = require("mongoose");
const Package = require("../Models/package");

// Get all packages
// controllers/packageController.js or similar

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().populate("items.productId", "name");
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch packages" });
  }
};

// Get package by ID
exports.getPackageById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid package ID" });
  }
  try {
    const package = await Package.findById(id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(package);
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ message: "Failed to fetch package" });
  }
};
// Create a new package
exports.createPackage = async (req, res) => {
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
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).json({ message: "Failed to create package" });
  }
};

// Update a package by ID
exports.updatePackage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid package ID" });
  }
  const { packageName, items, price } = req.body;
  if (!packageName || !items || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { packageName, items, price },
      { new: true }
    );
    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ message: "Failed to update package" });
  }
};

// Delete a package by ID
exports.deletePackage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid package ID" });
  }
  try {
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ message: "Failed to delete package" });
  }
};
