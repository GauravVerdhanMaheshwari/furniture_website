const mongoose = require("mongoose");

/**
 * 👤 User Schema
 * Defines the structure for storing user data in MongoDB.
 */
const userSchema = new mongoose.Schema(
  {
    // 🧑 Full name of the user
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [1, "Name must be at least 1 character"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    // 📧 Unique email address (used for login)
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true, // normalizes the email to lowercase
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
    },

    // 🔒 User's password (hashed before storage)
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    // 🏠 Address for deliveries or billing
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      minlength: [1, "Address cannot be empty"],
      maxlength: [500, "Address cannot exceed 500 characters"],
    },

    // 📞 10-digit phone number
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

/**
 * 📘 User Model
 * Used to interact with the 'users' collection in MongoDB.
 */
module.exports = mongoose.model("User", userSchema);
