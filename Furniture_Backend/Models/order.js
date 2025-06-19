const mongoose = require("mongoose");

/**
 * 📦 Order Schema
 * Represents a customer's full order including products, total amount, and order metadata.
 */
const orderSchema = new mongoose.Schema(
  {
    // 👤 Reference to the user who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    // 🛍 List of products in the order along with quantity for each
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product reference is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],

    // 💰 Total amount paid for the order
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },

    // 🗓 Date when the order was placed
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // ⏱ Adds createdAt and updatedAt fields automatically
  }
);

/**
 * 🧾 Order Model
 * This model allows CRUD operations for orders in the MongoDB database.
 */
const Order = mongoose.model("Order", orderSchema);

// 🚀 Export the model to use in services, routes, or controllers
module.exports = Order;
