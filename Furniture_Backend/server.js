const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./Routes/productRoutes");
// const authRoutes = require("./Routes/authRoutes");
const cartRoutes = require("./Routes/cartRoutes");
// const orderRoutes = require("./Routes/orderRoutes");\  
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
