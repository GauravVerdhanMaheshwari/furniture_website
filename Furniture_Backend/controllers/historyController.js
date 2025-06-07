const History = require("../Models/history");

exports.getAllHistory = async (req, res, next) => {
  try {
    const history = await History.find()
      .populate("userID")
      .populate("productID");
    res.json(history);
  } catch (error) {
    next(error);
  }
};

exports.getHistoryById = async (req, res, next) => {
  try {
    const history = await History.find({ userID: req.params.id })
      .populate("userID")
      .populate("productID");

    // Instead of returning 404 for empty result, return 200 with empty array
    if (!history || history.length === 0) {
      return res.status(200).json([]); // 👈 changed from 404
    }

    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};

exports.addHistory = async (req, res, next) => {
  try {
    const { userID, productID, quantity, totalPrice } = req.body;

    if (!userID || !productID || !quantity || !totalPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHistory = new History({ userID, productID, quantity, totalPrice });
    await newHistory.save();

    res
      .status(201)
      .json({ message: "History added successfully", data: newHistory });
  } catch (error) {
    next(error);
  }
};
