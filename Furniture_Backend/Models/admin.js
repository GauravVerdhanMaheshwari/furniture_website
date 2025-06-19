const mongoose = require("mongoose");

/**
 * 🧾 Admin Schema Definition
 * This schema defines the structure for admin documents in MongoDB.
 */
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
  },
  {
    timestamps: true, // ⏱️ Automatically adds createdAt and updatedAt fields
  }
);

/**
 * 📦 Model Initialization
 * Creates a Mongoose model for interacting with the admins collection.
 */
const Admin = mongoose.model("Admin", adminSchema);

// 🚀 Export the model for use in controllers and routes
module.exports = Admin;
