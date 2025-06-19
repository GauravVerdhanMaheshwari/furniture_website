const mongoose = require("mongoose");

/**
 * 🧾 Purchase Schema
 * Represents a purchase made by a user, containing item details and status tracking.
 */
const purchaseSchema = new mongoose.Schema(
  {
    // 🔗 Reference to the User who made the purchase
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    // 📦 List of purchased items
    items: [
      {
        // 🔗 Reference to the Product
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product ID is required"],
        },

        // 🔢 Quantity of this product in the purchase
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },

        // 📅 Purchase date for this specific item
        purchaseDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // 💵 Total price for the entire purchase
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price must be non-negative"],
    },

    // 📦 Status of the order
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Cancelled", "Delivered", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

/**
 * 📘 Purchase Model
 * Used to interact with the 'purchases' collection in MongoDB.
 */
const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
