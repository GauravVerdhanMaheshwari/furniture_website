const mongoose = require("mongoose");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

const BASE_URL = process.env.URL || "http://localhost:5000";

// GET /api/users - Fetch all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// POST /api/users - Register a new user with hashed password and email verification
exports.addUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    console.log("Registering user:", { name, email, password, address, phone });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new User({ name, email, password, address, phone });
    await user.save();

    await sendVerificationEmail(user); // this might be throwing the error

    res
      .status(201)
      .json({ msg: "Signup successful. Check your email to verify." });
  } catch (err) {
    console.error("Signup failed:", err);
    res.status(500).json({ msg: "Signup failed", error: err.message });
  }
};

// GET /api/users/verify-email?token=abc123 - Verify email token
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token" });
    }
    res
      .status(400)
      .json({ message: "Something went wrong", error: err.message });
  }
};

// POST /api/users/resend-verification - Resend verification email
exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });

    await sendVerificationEmail(user);

    res.status(200).json({ message: "Verification email sent again." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

// POST /api/users/login - Login with hashed password check
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        notVerified: true,
        email: user.email,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id - Fetch a user by ID
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// GET /api/users/me - Fetch current user by token
exports.getCurrentUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id - Update a user
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/:id - Delete user and cascade delete related data
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cascade delete related data
    await Promise.all([
      axios.delete(`${BASE_URL}/api/cart/delete/${id}`),
      axios.delete(`${BASE_URL}/api/orders/delete/${id}`),
    ]).catch((err) => console.error("Cascade delete error:", err));

    res
      .status(200)
      .json({ message: "User and related data deleted successfully" });
  } catch (error) {
    next(error);
  }
};
