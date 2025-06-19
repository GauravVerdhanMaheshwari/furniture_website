const mongoose = require("mongoose");

/**
 * 📜 HistoryBought Schema
 * This schema tracks individual product purchases by users,
 * useful for analytics, recommendations, and user history display.
 */
const historyBoughtSchema = new mongoose.Schema(
  {
    // 🔗 Reference to the user who made the purchase
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    // 📦 Reference to the product that was purchased
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },

    // 🔢 Quantity of the product purchased
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      default: 1,
      min: [1, "Quantity must be at least 1"],
    },

    // 💰 Total price paid for the product(s)
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price cannot be negative"],
    },
  },
  {
    timestamps: true, // ⏱ Automatically adds createdAt and updatedAt fields
  }
);

/**
 * 📦 HistoryBought Model
 * Compiles the schema into a model for use with MongoDB.
 */
const HistoryBought = mongoose.model("HistoryBought", historyBoughtSchema);

// 🚀 Export the model to be used in routes, services, or controllers
module.exports = HistoryBought;
