const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ownerController = require("../controllers/ownerController");

router.post("/login", userController.loginUser);
router.post("/register", userController.addUser);
router.post("/me", userController.getCurrentUser);
router.post("/admin/login", ownerController.loginOwner);

module.exports = router;
