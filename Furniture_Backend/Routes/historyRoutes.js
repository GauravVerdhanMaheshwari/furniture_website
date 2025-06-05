const express = require("express");
const router = express.Router();
const HistoryController = require("../controllers/historyController");

router.get("/", HistoryController.getAllHistory);
router.get("/user/:id", HistoryController.getHistoryById);
router.post("/", HistoryController.addHistory);

module.exports = router;
