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
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.address ||
      !req.body.phone
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user already exists
    const existingUser = await user.findOne({ email: req.body.email });
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

    // Delete cart associated with the user

    {
      fetch(`http://localhost:3000/api/cart/delete/${req.params.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete cart for user");
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error deleting cart:", error);
        });
    }

    // Delete orders associated with the user

    {
      fetch(`http://localhost:3000/api/orders/delete/${req.params.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete orders for user");
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error deleting orders:", error);
        });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
