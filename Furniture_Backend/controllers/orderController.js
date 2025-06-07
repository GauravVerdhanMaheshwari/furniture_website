const Order = require("../Models/order");
const Product = require("../Models/product");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Order updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
