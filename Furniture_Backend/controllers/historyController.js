// controllers/historyController.js

const History = require("../Models/history");

// ----------------------------- HISTORY MANAGEMENT -----------------------------

/**
 * @desc    Fetch all purchase history
 * @route   GET /api/history
 */
exports.getAllHistory = async (req, res, next) => {
  try {
    const history = await History.find()
      .populate("userID")
      .populate("productID");

    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get history for a specific user by user ID
 * @route   GET /api/history/:id
 */
exports.getHistoryById = async (req, res, next) => {
  try {
    const history = await History.find({ userID: req.params.id })
      .populate("userID")
      .populate("productID");

    // Return 200 with an empty array instead of 404 if no records are found
    if (!history || history.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a history entry (typically after purchase delivery)
 * @route   POST /api/history
 */
exports.addHistory = async (req, res, next) => {
  try {
    const { userID, productID, quantity, totalPrice } = req.body;

    // Validate required fields
    if (!userID || !productID || !quantity || !totalPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHistory = new History({ userID, productID, quantity, totalPrice });
    await newHistory.save();

    res.status(201).json({
      message: "History added successfully",
      data: newHistory,
    });
  } catch (error) {
    next(error);
  }
};
