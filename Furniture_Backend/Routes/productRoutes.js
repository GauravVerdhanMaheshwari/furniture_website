const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
// router.post("/", productController.addProduct);
router.get("/new", productController.getNewProducts);
router.get("/hot", productController.getHotProducts);
router.get("/package", productController.getPackageProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
