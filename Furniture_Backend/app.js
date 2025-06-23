// server.js or app.js

// -------------------------------
// Module Imports & Configuration
// -------------------------------
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// -------------------------------
// Initialize Express App
// -------------------------------
const app = express();

// -------------------------------
// Global Middleware
// -------------------------------
app.use(cors(corsOptions)); // Apply CORS settings
app.use(express.json({ limit: "10mb" })); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse URL-encoded form data

// -------------------------------
// API Routes
// -------------------------------
app.use("/api/products", require("./Routes/productRoutes"));
app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/owner", require("./Routes/ownerRoutes"));
app.use("/api/packages", require("./Routes/packageRoutes"));

// -------------------------------
// 404 - Not Found Handler
// -------------------------------
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// -------------------------------
// Global Error Handling Middleware
// -------------------------------
app.use(errorHandler);

// -------------------------------
// Export the App (for server or testing)
// -------------------------------
module.exports = app;
