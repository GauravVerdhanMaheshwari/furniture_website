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

    if (!history || history.length === 0) {
      return res
        .status(404)
        .json({ message: "No history found for this user" });
    }

    res.json(history);
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
