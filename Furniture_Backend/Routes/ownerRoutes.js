const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");

// Product Management
router.get("/products", ownerController.getAllProducts);
router.post("/product/add", ownerController.addProduct);
router.get("/products/new", ownerController.getNewProducts);
router.get("/products/hot", ownerController.getHotProducts);
router.get("/product/:id", ownerController.getProductById);
router.put("/product/:id", ownerController.updateProduct);
router.delete("/product/:id", ownerController.deleteProduct);
router.patch("/product/reject/:id", ownerController.rejectProduct);

// Owner Management
router.get("/profile", ownerController.getOwnerProfile);
router.put("/profile", ownerController.updateOwnerProfile);

// Package Management
router.get("/packages", ownerController.getAllPackages);
router.post("/package/add", ownerController.addPackages);
router.get("/package/:id", ownerController.getPackageById);
router.put("/package/edit/:id", ownerController.updatePackage);
router.delete("/package/:id", ownerController.deletePackage);

module.exports = router;
