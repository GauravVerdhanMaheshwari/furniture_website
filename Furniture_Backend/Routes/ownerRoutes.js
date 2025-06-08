const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");

router.get("/purchases", ownerController.getAllPurchases);
router.put("/purchases/accept/:id", ownerController.acceptPurchase);
router.put("/purchases/reject/:id", ownerController.rejectPurchase);
router.put("/purchases/deliver/:id", ownerController.deliverPurchase);
router.put("/purchases/cancel/:id", ownerController.cancelPurchase);

router.get("/product", ownerController.getAllProducts);
router.get("/product/:id", ownerController.getProductById);
router.post("/product/add", ownerController.addProduct);
router.put("/product/:id", ownerController.updateProduct);
router.delete("/product/:id", ownerController.deleteProduct);

router.get("/profile", ownerController.getOwnerProfile);
router.post("/profile", ownerController.loginOwner);
router.put("/profile", ownerController.updateOwnerProfile);

module.exports = router;
