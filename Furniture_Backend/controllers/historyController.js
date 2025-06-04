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

exports.addHistory = async (req, res, next) => {
  try {
    const newHistory = new History(req.body);
    await newHistory.save();
    res.status(201).json({ message: "History added successfully" });
  } catch (error) {
    next(error);
  }
};
