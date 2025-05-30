const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./Models/product");
const User = require("./Models/user");

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

const seedUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    address: "123 Main St, Springfield",
    phone: 1234567890,
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    address: "456 Elm St, Springfield",
    phone: 9876543210,
  },
];

const seedOrders = [
  
]

async function seedDB() {
  try {
    await Product.deleteMany(); // Clears existing data
    await User.insertMany(seedUsers); // Inserts new data
    console.log("✅ Users seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDB();
