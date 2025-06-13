const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();
connectDB();

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/products", require("./Routes/productRoutes"));
app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/purchases", require("./Routes/purchaseRoutes"));
app.use("/api/cart", require("./Routes/cartRoutes"));
app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/history", require("./Routes/historyRoutes"));
app.use("/api/owner", require("./Routes/ownerRoutes"));

// ✅ Use this for safe 404 handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
