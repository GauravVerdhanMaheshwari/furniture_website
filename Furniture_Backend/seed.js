const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./Models/product");
const Order = require("./Models/order");
const User = require("./Models/user");

dotenv.config();
connectDB();

const seedProducts = [
  {
    name: "Modern Sofa",
    company: "IKEA",
    price: 499.99,
    description: "A stylish and comfortable modern sofa for your living room.",
    image: "https://via.placeholder.com/400x300.png?text=Modern+Sofa",
    inStock: true,
    New: true,
    Hot: false,
    Package: false,
    PackageName: "",
    company: "IKEA",
    stock: 12,
  },
  {
    name: "Wooden Dining Table",
    company: "Urban Ladder",
    price: 799.99,
    description: "A sleek wooden dining table for 6 people.",
    image: "https://via.placeholder.com/400x300.png?text=Dining+Table",
    inStock: true,
    New: false,
    Hot: true,
    Package: true,
    PackageName: "Dining Set",
    company: "Urban Ladder",
    stock: 5,
  },
  {
    name: "Ergonomic Office Chair",
    company: "Herman Miller",
    price: 299.99,
    description: "Ergonomic chair with lumbar support for long work hours.",
    image: "https://via.placeholder.com/400x300.png?text=Office+Chair",
    inStock: true,
    New: false,
    Hot: false,
    Package: false,
    PackageName: "",
    company: "Herman Miller",
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
  {
    userId: "60c72b2f9b1d4c001c8e4f1a",
    products: [
      { productId: "60c72b2f9b1d4c001c8e4f1b", quantity: 2 },
      { productId: "60c72b2f9b1d4c001c8e4f1c", quantity: 1 },
    ],
    totalAmount: 1299.97,
    status: "Pending",
  },
  {
    userId: "60c72b2f9b1d4c001c8e4f1d",
    products: [{ productId: "60c72b2f9b1d4c001c8e4f1e", quantity: 1 }],
    totalAmount: 299.99,
    status: "Shipped",
  },
  {
    userId: "60c72b2f9b1d4c001c8e4f1f",
    products: [{ productId: "60c72b2f9b1d4c001c8e4f20", quantity: 3 }],
    totalAmount: 1499.97,
    status: "Delivered",
  },
  {
    userId: "60c72b2f9b1d4c001c8e4f21",
    products: [
      { productId: "60c72b2f9b1d4c001c8e4f22", quantity: 1 },
      { productId: "60c72b2f9b1d4c001c8e4f23", quantity: 2 },
    ],
    totalAmount: 899.98,
    status: "Cancelled",
  },
];

async function seedDB() {
  try {
    await Product.deleteMany(); // Clears existing data
    await Product.insertMany(seedProducts); // Inserts new data
    console.log("✅ Products seeded successfully");
    await User.deleteMany(); // Clears existing data
    await User.insertMany(seedUsers); // Inserts new data
    console.log("✅ Users seeded successfully");
    await Order.deleteMany(); // Clears existing data
    await Order.insertMany(seedOrders); // Inserts new data
    console.log("✅ Orders seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDB();
