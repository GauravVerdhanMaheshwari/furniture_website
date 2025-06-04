const mongoose = require("mongoose");

const historyBoughtSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const HistoryBought = mongoose.model("HistoryBought", historyBoughtSchema);

module.exports = HistoryBought;
