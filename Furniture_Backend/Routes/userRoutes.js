const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all users
router.get("/", userController.getAllUsers);

// Get the current user
router.get("/me", userController.getUserByEmail);

// Get a user by ID
router.get("/:id", userController.getUserById);

// Login a user
router.post("/login", userController.loginUser);

// Add a new user
router.post("/", userController.addUser);

// Update a user
router.put("/:id", userController.updateUser);

// Delete a user
router.delete("/:id", userController.deleteUser);

module.exports = router;
