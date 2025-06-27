// config/db.js

const mongoose = require("mongoose");

/**
 * @desc Establishes a connection to MongoDB using Mongoose
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    console.log("⏳ Attempting to connect to MongoDB...");

    await mongoose.connect(process.env.DATABASE_URL, {});

    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);

    // Exit process with failure to avoid app running without DB
    process.exit(1);
  }
};

module.exports = connectDB;
