const purchase = require("../Models/purchase");

// Get all purchases
exports.getAllPurchases = async (req, res, next) => {
  try {
    const purchases = await purchase.find();
    console.log("Fetched purchases:", purchases);
    res.json(purchases);
  } catch (error) {
    next(error);
  }
};

// Get a purchase by ID
exports.getPurchaseById = async (req, res, next) => {
  try {
    const purchaseData = await purchase.findById(req.params.id);
    if (!purchaseData) {
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
