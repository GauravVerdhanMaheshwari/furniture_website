const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Route Imports
const productRoutes = require("./Routes/productRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const userRoutes = require("./Routes/userRoutes");
const purchaseRoutes = require("./Routes/purchaseRoutes");
const historyRoutes = require("./Routes/historyRoutes");
const ownerRoutes = require("./Routes/ownerRoutes");

const errorHandler = require("./middleware/errorHandler");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS setup for deployed frontend
app.use(
  cors({
    origin: "https://furniture-website-frontend-z6ro.onrender.com", // your frontend Render URL
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/owner", ownerRoutes);

// Global error handling
app.use(errorHandler);

// Port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
