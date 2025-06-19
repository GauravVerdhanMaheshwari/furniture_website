// controllers/cartController.js

const Cart = require("../Models/cart");

// ----------------------------- CART CONTROLLER -----------------------------

/**
 * @desc    Get cart for a specific user
 * @route   GET /api/cart/:userId
 */
exports.getCartForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({ userId, items: [] }); // Return empty cart if not found
    }

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
};

/**
 * @desc    Add items to a user's cart
 * @route   POST /api/cart/add
 */
exports.addToCart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid or empty items array" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Merge incoming items into existing cart
    for (const item of items) {
      if (!item.productId || item.quantity <= 0) continue;

      const incomingId =
        typeof item.productId === "object"
          ? item.productId._id || item.productId.toString()
          : item.productId.toString();

      const existingItem = cart.items.find(
        (cartItem) => cartItem.productId.toString() === incomingId
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.items.push({ productId: incomingId, quantity: item.quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ message: "Error adding item to cart", error: error.message });
  }
};

/**
 * @desc    Update entire cart by cart ID
 * @route   PUT /api/cart/update
 */
exports.updateCartForUser = async (req, res) => {
  const { cartId, items } = req.body;

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Replace existing items with new list
    cart.items = [];
    for (const item of items) {
      if (!item.productId || item.quantity <= 0) continue;

      const incomingId =
        typeof item.productId === "object"
          ? item.productId._id || item.productId.toString()
          : item.productId.toString();

      cart.items.push({ productId: incomingId, quantity: item.quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
};

/**
 * @desc    Remove a single item from a user's cart
 * @route   DELETE /api/cart/remove
 */
exports.removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item:", error);
    res
      .status(500)
      .json({ message: "Error removing item from cart", error: error.message });
  }
};

/**
 * @desc    Clear all items in a user's cart
 * @route   DELETE /api/cart/clear
 */
exports.clearCartForUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res
      .status(500)
      .json({ message: "Error clearing cart", error: error.message });
  }
};
