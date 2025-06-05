const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./Models/product");
const Order = require("./Models/order");
const User = require("./Models/user");
const Cart = require("./Models/cart");
const Purchase = require("./Models/purchase");
const History = require("./Models/history");

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

const seedCart = [
  {
    userId: "60c72b2f9b1d4c001c8e4f24",
    items: [
      { productId: "60c72b2f9b1d4c001c8e4f25", quantity: 1 },
      { productId: "60c72b2f9b1d4c001c8e4f26", quantity: 2 },
    ],
  },
  {
    userId: "60c72b2f9b1d4c001c8e4f27",
    items: [{ productId: "60c72b2f9b1d4c001c8e4f28", quantity: 3 }],
  },
];

// async function seedDB() {
//   try {
//     await Product.deleteMany(); // Clears existing data
//     await Product.insertMany(seedProducts); // Inserts new data
//     console.log("✅ Products seeded successfully");
//     await User.deleteMany(); // Clears existing data
//     await User.insertMany(seedUsers); // Inserts new data
//     console.log("✅ Users seeded successfully");
//     await Order.deleteMany(); // Clears existing data
//     await Order.insertMany(seedOrders); // Inserts new data
//     console.log("✅ Orders seeded successfully");
//     await Cart.deleteMany(); // Clears existing data
//     await Cart.insertMany(seedCart); // Inserts new data
//     console.log("✅ Cart seeded successfully");
//     process.exit();
//   } catch (error) {
//     console.error("❌ Seeding failed:", error);
//     process.exit(1);
//   }
// }

async function seedDB() {
  try {
    // Clear all collections
    // await Product.deleteMany();
    // await User.deleteMany();
    // await Order.deleteMany();
    // await Cart.deleteMany();
    // await History.deleteMany();
    // await History.deleteMany();
    // console.log("✅ Collections cleared");
    // const createdProducts = await Product.insertMany(seedProducts);
    // const createdUsers = await User.insertMany(seedUsers);

    // Use real IDs from inserted documents
    // const seedOrders = [
    //   {
    //     userId: createdUsers[0]._id,
    //     products: [
    //       { productId: createdProducts[0]._id, quantity: 2 },
    //       { productId: createdProducts[1]._id, quantity: 1 },
    //     ],
    //     totalAmount: 1299.97,
    //     status: "Pending",
    //   },
    //   {
    //     userId: createdUsers[1]._id,
    //     products: [{ productId: createdProducts[2]._id, quantity: 1 }],
    //     totalAmount: 299.99,
    //     status: "Shipped",
    //   },
    // ];

    // const seedCart = [
    //   {
    //     userId: createdUsers[0]._id,
    //     items: [
    //       { productId: createdProducts[0]._id, quantity: 1 },
    //       { productId: createdProducts[1]._id, quantity: 2 },
    //     ],
    //   },
    //   {
    //     userId: createdUsers[1]._id,
    //     items: [{ productId: createdProducts[2]._id, quantity: 3 }],
    //   },
    // ];

    // const seedHistory = [
    //   {
    //     userID: "683ebe05df51425cf136e968",
    //     productID: "683ebe05df51425cf136e964",
    //     quantity: 1,
    //     totalPrice: 499.99,
    //     Date: new Date(),
    //     timestamp: new Date(),
    //   },
    //   {
    //     userID: "683ebe05df51425cf136e968",
    //     productID: "683ebe05df51425cf136e965",
    //     quantity: 1,
    //     totalPrice: 799.98,
    //     Date: new Date(),
    //     timestamp: new Date(),
    //   },
    // ];

    // const seedPurchase = [
    //   {
    //     userId: "683ebe05df51425cf136e968",
    //     items: [
    //       { productId: "683ebe05df51425cf136e964", quantity: 1 },
    //       { productId: "683ebe05df51425cf136e965", quantity: 1 },
    //     ],
    //     totalPrice: 1299,
    //     status: "Pending",
    //   },
    // ];

    // Insert orders and carts
    // await Order.insertMany(seedOrders);
    // await Cart.insertMany(seedCart);
    // await Purchase.insertMany(seedPurchase);
    // await History.insertMany(seedHistory);

    // console.log("✅ All data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDB();
