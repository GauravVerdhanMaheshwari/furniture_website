// controllers/orderController.js

const mongoose = require("mongoose");
const Order = require("../Models/order");
const Product = require("../Models/product");

// ----------------------------- ORDER MANAGEMENT -----------------------------

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 */
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a new order
 * @route   POST /api/orders
 */
exports.addOrder = async (req, res, next) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing order
 * @route   PUT /api/orders/:id
 */
exports.updateOrder = async (req, res, next) => {
  const orderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: "Invalid order ID format" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an order
 * @route   DELETE /api/orders/:id
 */
exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: "Invalid order ID format" });
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
