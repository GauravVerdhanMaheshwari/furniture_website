const mongoose = require("mongoose");
const user = require("../Models/user");

const URL = process.env.URL || "http://localhost:5000";

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await user.find();
    console.log("Fetched users:", users);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get the current user by email
exports.getUserByEmail = async (req, res, next) => {
  try {
    const userData = await user.findOne({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

// Get a user by ID
exports.getUserById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const userData = await user.findById(req.params.id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

// Add a new user
exports.addUser = async (req, res, next) => {
  try {
    const { name, email, password, address, phone } = req.body;

    if (!name || !email || !password || !address || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new user(req.body);
    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    next(error);
  }
};

// Login a user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const userData = await user.findOne({ email });
    if (!userData || userData.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user: userData });
  } catch (error) {
    next(error);
  }
};

// Update a user
exports.updateUser = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cascade delete cart
    fetch(`${URL}/api/cart/delete/${req.params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.error("Error deleting cart:", error));

    // Cascade delete orders
    fetch(`${URL}/api/orders/delete/${req.params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.error("Error deleting orders:", error));

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
