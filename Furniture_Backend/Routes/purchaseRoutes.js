const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseControllers");

router.get("/", purchaseController.getAllPurchases);
router.post("/", purchaseController.addPurchase);
router.get("/:id", purchaseController.getPurchaseById);
router.delete("/:id", purchaseController.deletePurchase);

module.exports = router;
