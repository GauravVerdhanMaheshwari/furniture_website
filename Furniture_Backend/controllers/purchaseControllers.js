const mongoose = require("mongoose");
const Purchase = require("../Models/purchase");
const HistoryBought = require("../Models/history");

// GET /api/purchases - Get all purchases
exports.getAllPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases);
  } catch (error) {
    next(error);
  }
};

// GET /api/purchases/:id - Get purchases by user ID
exports.getPurchaseById = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const purchases = await Purchase.find({ userId: id }).populate("userId");

    if (!purchases.length) {
      return res
        .status(404)
        .json({ message: "No purchases found for this user" });
    }

    res.status(200).json(purchases);
  } catch (error) {
    next(error);
  }
};

// POST /api/purchases - Add a new purchase
exports.addPurchase = async (req, res, next) => {
  try {
    const { userId, items, date, totalAmount } = req.body;

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid purchase data" });
    }

    const newPurchase = new Purchase({ userId, items, date, totalAmount });
    await newPurchase.save();

    res
      .status(201)
      .json({
        message: "Purchase created successfully",
        purchase: newPurchase,
      });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/purchases/:id - Delete a purchase and archive to history
exports.deletePurchase = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid purchase ID format" });
  }

  try {
    const deletedPurchase = await Purchase.findByIdAndDelete(id).populate(
      "items.productId"
    );

    if (!deletedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    const historyEntries = deletedPurchase.items.map((item) => ({
      userID: deletedPurchase.userId,
      productID: item.productId._id,
      quantity: item.quantity,
      totalPrice: item.quantity * item.productId.price,
    }));

    await HistoryBought.insertMany(historyEntries);

    res.status(200).json({
      message: "Purchase deleted and logged to history successfully",
    });
  } catch (error) {
    console.error("Error deleting purchase:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
