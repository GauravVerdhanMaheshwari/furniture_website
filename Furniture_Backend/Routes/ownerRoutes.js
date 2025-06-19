const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");

// Product Management
router.get("/products", ownerController.getAllProducts);
router.post("/product/add", ownerController.addProduct);
router.get("/products/new", ownerController.getNewProducts);
router.get("/products/hot", ownerController.getHotProducts);
router.get("/products/package", ownerController.getPackageProducts);
router.get("/product/:id", ownerController.getProductById);
router.put("/product/:id", ownerController.updateProduct);
router.delete("/product/:id", ownerController.deleteProduct);
router.patch("/product/reject/:id", ownerController.rejectProduct);

// Purchase Management
router.get("/purchases", ownerController.getAllPurchases);
router.patch("/purchase/accept/:id", ownerController.acceptPurchase);
router.patch("/purchase/reject/:id", ownerController.rejectPurchase);
router.patch("/purchase/deliver/:id", ownerController.deliverPurchase);
router.patch("/purchase/cancel/:id", ownerController.cancelPurchase);

// Owner Management
router.get("/profile", ownerController.getOwnerProfile);
router.put("/profile", ownerController.updateOwnerProfile);

module.exports = router;
