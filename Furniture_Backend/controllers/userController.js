const mongoose = require("mongoose");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const sendInquiryToOwner = require("../utils/sendInquiryToOwner");

const BASE_URL = process.env.URL || "http://localhost:5000";

// Helper to hash password
async function hashPassword(password) {
  if (!password || password.length < 8 || password.length > 20) {
    throw new Error("Password must be between 8 and 20 characters long");
  }
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// GET /api/users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// POST /api/users
exports.addUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await user.save();
    await sendVerificationEmail(user);

    res
      .status(201)
      .json({ message: "Signup successful. Check your email to verify." });
  } catch (err) {
    console.error("Signup failed:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// GET /api/users/verify-email
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

// POST /api/users/resend-verification
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

// POST /api/users/inquiry
exports.sendInquiryToOwner = async (req, res) => {
  const { productId, inquiryMessage, userEmail } = req.body;

  if (!productId || !inquiryMessage || !userEmail) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await sendInquiryToOwner(productId, inquiryMessage, userEmail);
    res.status(200).json({ message: "Inquiry sent successfully" });
  } catch (error) {
    console.error("Error sending inquiry:", error);
    res.status(500).json({ message: "Failed to send inquiry" });
  }
};

// POST /api/users/login
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

// GET /api/users/:id
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// GET /api/users/me
exports.getCurrentUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id
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

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

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
