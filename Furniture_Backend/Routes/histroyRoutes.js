import express from "express";
const router = express.Router();
import HistoryController from "../controllers/historyController.js";

router.get("/", HistoryController.getAllHistory);
router.post("/", HistoryController.addHistory);

export default router;
