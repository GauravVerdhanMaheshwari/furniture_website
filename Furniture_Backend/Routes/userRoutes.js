const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET all users
router.get("/", userController.getAllUsers);

// GET a single user by ID
router.get("/:id", userController.getUserById);

// PUT update a user
router.put("/:id", userController.updateUser);

// DELETE a user
router.delete("/:id", userController.deleteUser);

module.exports = router;
