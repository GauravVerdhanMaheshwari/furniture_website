const mongoose = require("mongoose");
const purchase = require("../Models/purchase");
const HistoryBought = require("../Models/history");

// Get all purchases
exports.getAllPurchases = async (req, res, next) => {
  try {
    const purchases = await purchase.find();
    res.json(purchases);
  } catch (error) {
    next(error);
  }
};

// Get purchases by user ID
exports.getPurchaseById = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const purchaseData = await purchase.find({ userId: id }).populate("userId");

    if (!purchaseData || purchaseData.length === 0) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json(purchaseData);
  } catch (error) {
    next(error);
  }
};

// Add a new purchase
exports.addPurchase = async (req, res, next) => {
  try {
    const newPurchase = new purchase(req.body);
    await newPurchase.save();
    res.status(201).json({ message: "Purchase added successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete purchase and log to history
exports.deletePurchase = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid purchase ID format" });
  }

  try {
    const deletedPurchase = await purchase
      .findByIdAndDelete(id)
      .populate("items.productId");

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

    res.json({
      message: "Purchase deleted and moved to history successfully",
    });
  } catch (error) {
    console.error("Error in deletePurchase:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
