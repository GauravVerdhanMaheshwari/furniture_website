// const User = require("../Models/user");
const Purchase = require("../Models/purchase");
const Product = require("../Models/product");
const HistoryBought = require("../Models/history");
const Admin = require("../Models/admin");

exports.getAllPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.find().populate("userId");
    res.json(purchases);
  } catch (error) {
    next(error);
  }
};

exports.acceptPurchase = async (req, res, next) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    purchase.status = "Accepted";
    await purchase.save();
    res.json({ message: "Purchase accepted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.rejectPurchase = async (req, res, next) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    if (purchase.status !== "Pending") {
      return res.status(400).json({
        message: `Cannot reject an order with status: ${purchase.status}`,
      });
    }

    purchase.status = "Rejected"; // Update to "Rejected"
    await purchase.save();

    res.json({
      message: "Purchase rejected successfully",
      purchaseId: purchase._id,
      status: purchase.status,
    });
  } catch (error) {
    console.error("Error rejecting purchase:", error);
    res.status(500).json({ message: "Server error while rejecting purchase" });
  }
};

exports.deliverPurchase = async (req, res, next) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    for (const item of purchase.items) {
      const product = await Product.findById(item.productId); // ✅ correct

      if (product) {
        // Update stock
        product.stock = Math.max(product.stock - item.quantity, 0);
        await product.save();

        // Add to HistoryBought
        const historyEntry = new HistoryBought({
          userID: purchase.userId,
          productID: item.productId, // ✅ corrected here
          quantity: item.quantity,
          totalPrice: item.quantity * product.price,
        });

        await historyEntry.save();
        console.log("History Entry:", historyEntry);
      } else {
        console.warn("Product not found for productId:", item.productId);
      }
    }

    purchase.status = "Delivered";
    await purchase.save();

    res.json({
      message: "Purchase delivered, stock updated, and history logged.",
    });
  } catch (error) {
    console.error("Error in deliverPurchase:", error);
    next(error);
  }
};

exports.cancelPurchase = async (req, res, next) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    purchase.status = "Cancelled";
    await purchase.save();
    res.json({ message: "Purchase cancelled successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    console.log("Received body:", req.body); // Debugging

    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Product save error:", error);
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getOwnerProfile = async (req, res, next) => {
  try {
    const owner = await Admin.find();
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.json(owner);
  } catch (error) {
    next(error);
  }
};

exports.loginOwner = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });

    // Step 1: Find by email only
    // const admin = await Admin.findOne({ email });
    const admin = await Admin.find();
    console.log("Admin found:", admin);

    // Step 2: Validate owner and password
    if (!admin) {
      return res
        .status(401)
        .json({ message: "No admin found with this email." });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Step 3: Return successful response
    res.json({ message: "Login successful", admin });
  } catch (error) {
    console.error("Login error:", error.message || error);
    next(error);
  }
};

exports.updateOwnerProfile = async (req, res, next) => {
  try {
    const owner = await Admin.findById(req.body.id);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    owner.name = req.body.name || owner.name;
    owner.email = req.body.email || owner.email;
    owner.phone = req.body.phone || owner.phone;
    owner.password = req.body.password || owner.password;
    await owner.save();
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.json({ message: "Profile updated successfully", owner });
  } catch (error) {
    console.log("Updating owner profile with data:", req.body);
    console.log("Owner before save:", owner);
    next(error);
  }
};
