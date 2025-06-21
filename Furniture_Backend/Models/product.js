const mongoose = require("mongoose");

/**
 * 🔢 Validator to restrict image uploads to a maximum of 4.
 * @param {Array} val - Array of image URLs.
 * @returns {boolean} - True if image count is ≤ 4.
 */
function arrayLimit(val) {
  return val.length <= 4;
}

/**
 * 🛋️ Product Schema
 * Describes the structure of a product document in the database.
 */
const productSchema = new mongoose.Schema(
  {
    // 📛 Product Name
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: 1,
      maxlength: 100,
    },

    // 📝 Product Description
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: 1,
      maxlength: 500,
    },

    // 🏷️ Product Type (e.g., Sofa, Chair, Table)
    type: {
      type: String,
      required: [true, "Product type is required"],
      enum: [
        "Sofa",
        "Chair",
        "Table",
        "Bed",
        "wardrobe",
        "Shoes Rack",
        "Others",
      ],
      trim: true,
    },

    // Product Size (dimensions in inches)
    size: {
      height: {
        type: Number,
        required: [true, "Height is required"],
        min: [0, "Height cannot be negative"],
      },
      width: {
        type: Number,
        required: [true, "Width is required"],
        min: [0, "Width cannot be negative"],
      },
      depth: {
        type: Number,
        required: [true, "Depth is required"],
        min: [0, "Depth cannot be negative"],
      },
    },

    // 💵 Product Price
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    // 🖼️ Product Images (up to 4)
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: [arrayLimit, "You can upload up to 4 images."],
    },

    // 📦 Stock Count
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
    },

    // 🟢 Stock Availability Flag
    inStock: {
      type: Boolean,
      default: true,
    },

    // 🆕 Markers (for promotional tagging or filtering)
    New: {
      type: Boolean,
      default: false,
    },
    Hot: {
      type: Boolean,
      default: false,
    },
    Package: {
      type: Boolean,
      default: false,
    },

    // 📦 Name of Package (if applicable)
    PackageName: {
      type: String,
      trim: true,
    },

    // 🏢 Brand or Manufacturer Name
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
    },

    // 📅 Date Added to Catalog
    AddedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

/**
 * 🧾 Product Model
 * Allows interaction with the 'products' collection in MongoDB.
 */
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
