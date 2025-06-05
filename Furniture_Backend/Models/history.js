const mongoose = require("mongoose");

const historyBoughtSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const HistoryBought = mongoose.model("HistoryBought", historyBoughtSchema);

module.exports = HistoryBought;
