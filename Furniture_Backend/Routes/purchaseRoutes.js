const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseControllers");

router.get("/", purchaseController.getAllPurchases);
router.get("/:id", purchaseController.getPurchaseById);
router.post("/", purchaseController.addPurchase);
// router.put("/:id", purchaseController.updatePurchase);
router.delete("/:id", purchaseController.deletePurchase);

module.exports = router;
