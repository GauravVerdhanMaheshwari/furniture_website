const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
    trim: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

/**
 * Package Model
 * This model represents a package containing multiple products.
 * It includes fields for the package name, items (with product references and quantities), and price.
 */
const Package = mongoose.model("Package", packageSchema);

// Export the Package model for use in other parts of the application
module.exports = Package;
