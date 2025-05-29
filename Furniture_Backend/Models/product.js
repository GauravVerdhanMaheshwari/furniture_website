const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // category: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
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
    PackageName: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    AddedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
