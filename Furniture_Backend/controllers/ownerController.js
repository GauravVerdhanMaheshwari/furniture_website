// const User = require("../Models/user");
const Purchase = require("../Models/purchase");
const Product = require("../Models/product");
const HistoryBought = require("../Models/history");

exports.getAllPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.find().populate("userId");
    res.json(purchases);
  } catch (error) {
    next(error);
  }
};

exports.acceptPurchase = async (req, res, next) => {
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

exports.rejectPurchase = async (req, res, next) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    purchase.status = "Rejected";
    await purchase.save();
    res.json({ message: "Purchase rejected successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deliverPurchase = async (req, res, next) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    // Update product stock and log history
    for (const item of purchase.items) {
      const product = await Product.findById(item.product);

      if (product) {
        // Update stock
        product.stock = Math.max(product.stock - item.quantity, 0);
        await product.save();

        // Add to HistoryBought
        const historyEntry = new HistoryBought({
          userID: purchase.userId,
          productID: item.product,
          quantity: item.quantity,
          totalPrice: item.quantity * product.price,
        });
        await historyEntry.save();
        console.log("History Entry:", historyEntry);
      }
    }

    // Update purchase status
    purchase.status = "Delivered";
    await purchase.save();

    res.json({
      message: "Purchase delivered, stock updated, and history logged.",
    });
  } catch (error) {
    next(error);
  }
};

exports.cancelPurchase = async (req, res, next) => {
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

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
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

exports.addProduct = async (req, res, next) => {
  try {
    console.log("Received body:", req.body); // Debugging

    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Product save error:", error);
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
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
