const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");

// Add routes for cart operations
router.post("/add", cartController.addItemToCart);
router.get("/:userId", cartController.getCartForUser);
router.delete("/remove", cartController.removeItemFromCart);
router.delete("/clear", cartController.clearCartForUser);

module.exports = router;
