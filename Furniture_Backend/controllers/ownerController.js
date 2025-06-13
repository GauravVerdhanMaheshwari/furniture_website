const mongoose = require("mongoose");
const Product = require("../Models/product");
const Purchase = require("../Models/purchase");
const HistoryBought = require("../Models/history");

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
      return res
        .status(200)
        .json({ message: "No products found", products: [] });
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
      return res
        .status(200)
        .json({ message: "No products found", products: [] });
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
      return res
        .status(200)
        .json({ message: "No products found", products: [] });
    }

    res.json(packageProducts);
  } catch (error) {
    next(error);
  }
};

// Get product by ID
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
    res.json({ message: "Product updated successfully", product });
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
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Reject a product
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
    res.json({ message: "Product rejected successfully", product });
  } catch (error) {
    next(error);
  }
};

// Accept a purchase
exports.acceptPurchase = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid purchase ID format" });
  }
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    purchase.status = "Accepted";
    await purchase.save();
    res.json({ message: "Purchase accepted successfully" });
  } catch (error) {
    next(error);
  }
};

// Reject a purchase
exports.rejectPurchase = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid purchase ID format" });
  }
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    if (purchase.status !== "Pending") {
      return res.status(400).json({
        message: `Cannot reject an order with status: ${purchase.status}`,
      });
    }
    purchase.status = "Rejected";
    await purchase.save();
    res.json({
      message: "Purchase rejected successfully",
      purchaseId: purchase._id,
      status: purchase.status,
    });
  } catch (error) {
    next(error);
  }
};

// Deliver a purchase
exports.deliverPurchase = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid purchase ID format" });
  }
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    for (const item of purchase.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock = Math.max(product.stock - item.quantity, 0);
        await product.save();

        const historyEntry = new HistoryBought({
          userID: purchase.userId,
          productID: item.productId,
          quantity: item.quantity,
          totalPrice: item.quantity * product.price,
        });

        await historyEntry.save();
      }
    }

    purchase.status = "Delivered";
    await purchase.save();

    res.json({
      message: "Purchase delivered, stock updated, and history logged.",
    });
  } catch (error) {
    next(error);
  }
};

// Cancel a purchase
exports.cancelPurchase = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid purchase ID format" });
  }
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    purchase.status = "Cancelled";
    await purchase.save();
    res.json({ message: "Purchase cancelled successfully" });
  } catch (error) {
    next(error);
  }
};
