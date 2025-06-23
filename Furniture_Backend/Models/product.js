const mongoose = require("mongoose");

/** 🔢 Restrict image uploads to a maximum of 4 */
function arrayLimit(val) {
  return val.length <= 4;
}

/** 📦 Category enum list */
const CATEGORY_ENUM = Object.freeze([
  "Sofa",
  "Chair",
  "Table",
  "Bed",
  "wardrobe",
  "Shoes Rack",
  "Others",
]);

/** 🛋️ Product Schema */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
    type: {
      type: String,
      enum: CATEGORY_ENUM,
      required: [true, "Product type is required"],
      trim: true,
    },
    size: {
      height: {
        type: Number,
        required: [true, "Height is required"],
        min: 0,
      },
      width: {
        type: Number,
        required: [true, "Width is required"],
        min: 0,
      },
      depth: {
        type: Number,
        required: [true, "Depth is required"],
        min: 0,
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    images: {
      type: [String],
      required: true,
      validate: [arrayLimit, "You can upload up to 4 images."],
    },
    New: { type: Boolean, default: false },
    Hot: { type: Boolean, default: false },
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
    },
    AddedDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, CATEGORY_ENUM };
