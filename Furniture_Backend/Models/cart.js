const mongoose = require("mongoose");

/**
 * 🛒 Cart Schema Definition
 * This schema represents a user's shopping cart, containing an array of products and quantities.
 */
const cartSchema = new mongoose.Schema(
  {
    // Reference to the user who owns the cart
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    // Array of cart items
    items: [
      {
        // Product reference in each cart item
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product ID is required"],
        },

        // Quantity of the product added to cart
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
  },
  {
    timestamps: true, // ⏱️ Automatically adds createdAt and updatedAt
  }
);

/**
 * 📦 Model Initialization
 * Creates the Cart model for the 'carts' collection in MongoDB.
 */
const Cart = mongoose.model("Cart", cartSchema);

// 🚀 Export the model to use in controllers/services
module.exports = Cart;
