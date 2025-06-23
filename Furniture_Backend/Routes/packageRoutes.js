const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");

// Package Management Routes
router.get("/", packageController.getAllPackages); // Get all packages
router.get("/:id", packageController.getPackageById); // Get package by ID
router.post("/", packageController.createPackage); // Create a new package
router.put("/:id", packageController.updatePackage); // Update a package by ID
router.delete("/:id", packageController.deletePackage); // Delete a package by ID
