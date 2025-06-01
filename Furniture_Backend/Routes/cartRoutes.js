const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");

// Cart routes
router.post("/add", cartController.addToCart);
router.get("/:userId", cartController.getCartForUser);
router.put("/update", cartController.updateCartForUser);
router.delete("/remove", cartController.removeItemFromCart);
router.delete("/clear", cartController.clearCartForUser);

module.exports = router;
