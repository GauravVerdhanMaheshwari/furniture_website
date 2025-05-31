const Cart = require("../Models/cart");

// Get cart for user
exports.getCartForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({ userId, items: [] }); // Returning empty cart if not found
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Remove item from cart
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
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

// Clear entire cart
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
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
