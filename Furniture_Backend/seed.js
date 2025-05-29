const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./Models/product");

dotenv.config();
connectDB();

const seedProducts = [
  {
    name: "Modern Sofa",
    company: "IKEA",
    price: 499.99,
    description: "A stylish and comfortable modern sofa for your living room.",
    imageUrl: "https://via.placeholder.com/400x300.png?text=Modern+Sofa",
    inStock: true,
    stock: 12,
  },
  {
    name: "Wooden Dining Table",
    company: "Urban Ladder",
    price: 799.99,
    description: "A sleek wooden dining table for 6 people.",
    imageUrl: "https://via.placeholder.com/400x300.png?text=Dining+Table",
    inStock: true,
    stock: 5,
  },
  {
    name: "Ergonomic Office Chair",
    company: "Herman Miller",
    price: 299.99,
    description: "Ergonomic chair with lumbar support for long work hours.",
    imageUrl: "https://via.placeholder.com/400x300.png?text=Office+Chair",
    inStock: true,
    stock: 10,
  },
];

async function seedDB() {
  try {
    await Product.deleteMany(); // Clears existing data
    await Product.insertMany(seedProducts); // Inserts new data
    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDB();
