const user = require("../Models/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await user.find();
    console.log("Fetched users:", users);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get a user by ID
exports.getUserById = async (req, res, next) => {
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
    const newUser = new user(req.body);
    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    next(error);
  }
};

// Update a user
exports.updateUser = async (req, res, next) => {
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
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
