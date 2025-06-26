const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Register new user
router.post("/", userController.addUser);

// Login user
router.post("/login", userController.loginUser);

// Verify email
router.get("/verify-email", userController.verifyEmail);

// Resend email verification
router.post("/resend-verification", userController.resendVerification);

// Sending inquiry to owner
router.post("/inquiry", userController.sendInquiryToOwner);

// Get all users
router.get("/", userController.getAllUsers);

// Get single user
router.get("/:id", userController.getUserById);

// Update user
router.put("/:id", userController.updateUser);

// Delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
