const express = require("express");
const cors = require("cors");
// const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/new", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Sofa",
      price: 2999,
      inStock: true,
      stock: 10,
      description: "A comfortable sofa for your living room.",
      imageUrl: "https://example.com/sofa.jpg",
    },
    {
      id: 2,
      name: "Dining Table",
      price: 4999,
      inStock: true,
      stock: 4,
      description: "A stylish dining table for family gatherings.",
      imageUrl: "https://example.com/dining-table.jpg",
    },
    {
      id: 3,
      name: "Bed",
      price: 3999,
      inStock: true,
      stock: 3,
      description: "A cozy bed for a good night's sleep with full rest.",
      imageUrl: "https://example.com/bed.jpg",
    },
    {
      id: 4,
      name: "Chair",
      price: 1999,
      inStock: true,
      stock: 5,
      description: "A comfortable chair for your office.",
      imageUrl: "https://example.com/chair.jpg",
    },
  ]);
});

app.get("/api/hot", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Sofa",
      price: 2999,
      inStock: true,
      stock: 10,
      description: "A comfortable sofa for your living room.",
      imageUrl: "https://example.com/sofa.jpg",
    },
    {
      id: 2,
      name: "Dining Table",
      price: 4999,
      inStock: true,
      stock: 4,
      description: "A stylish dining table for family gatherings.",
      imageUrl: "https://example.com/dining-table.jpg",
    },
    {
      id: 3,
      name: "Bed",
      price: 3999,
      inStock: true,
      stock: 3,
      description: "A cozy bed for a good night's sleep with full rest.",
      imageUrl: "https://example.com/bed.jpg",
    },
    {
      id: 4,
      name: "Chair",
      price: 1999,
      inStock: true,
      stock: 5,
      description: "A comfortable chair for your office.",
      imageUrl: "https://example.com/chair.jpg",
    },
  ]);
});

app.get("/api/packages", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Sofa",
      price: 2999,
      inStock: true,
      stock: 10,
      description: "A comfortable sofa for your living room.",
      imageUrl: "https://example.com/sofa.jpg",
    },
    {
      id: 2,
      name: "Dining Table",
      price: 4999,
      inStock: true,
      stock: 4,
      description: "A stylish dining table for family gatherings.",
      imageUrl: "https://example.com/dining-table.jpg",
    },
    {
      id: 3,
      name: "Bed",
      price: 3999,
      inStock: true,
      stock: 3,
      description: "A cozy bed for a good night's sleep with full rest.",
      imageUrl: "https://example.com/bed.jpg",
    },
    {
      id: 4,
      name: "Chair",
      price: 1999,
      inStock: true,
      stock: 5,
      description: "A comfortable chair for your office.",
      imageUrl: "https://example.com/chair.jpg",
    },
  ]);
});

app.get("/api/products", (req, res) => {
  res.json({
    items: [
      { id: 1, name: "Sofa", inStock: true },
      { id: 2, name: "Chair", inStock: true },
      { id: 3, name: "Table", inStock: true },
      { id: 4, name: "Bed", inStock: true },
    ],
  });
});

app.get("/api/company", (req, res) => {
  res.json({
    items: [
      { id: 1, name: "IKEA" },
      { id: 2, name: "Urban Ladder" },
      { id: 3, name: "Home Centre" },
      { id: 4, name: "Pepperfry" },
    ],
  });
});

app.get("/api/furniture", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Sofa",
      company: "",
      price: 2999,
      inStock: true,
      stock: 10,
      description: "A comfortable sofa for your living room.",
      imageUrl: "https://example.com/sofa.jpg",
    },
    {
      id: 2,
      name: "Chair",
      company: "IKEA",
      price: 1999,
      inStock: true,
      stock: 5,
      description: "A comfortable chair for your office.",
      imageUrl: "https://example.com/chair.jpg",
    },
    {
      id: 3,
      name: "Table",
      company: "",
      price: 4999,
      inStock: false,
      stock: 4,
      description: "A stylish dining table for family gatherings.",
      imageUrl: "https://example.com/dining-table.jpg",
    },
    {
      id: 4,
      name: "Bed",
      company: "",
      price: 3999,
      inStock: true,
      stock: 3,
      description: "A cozy bed for a good night's sleep with full rest.",
      imageUrl: "https://example.com/bed.jpg",
    },
    {
      id: 5,
      name: "Wardrobe",
      company: "Urban Ladder",
      price: 5999,
      inStock: true,
      stock: 5,
      description: "A spacious wardrobe for your clothes.",
      imageUrl: "https://example.com/wardrobe.jpg",
    },
    {
      id: 6,
      name: "Bookshelf",
      company: "",
      price: 2499,
      inStock: true,
      stock: 2,
      description: "A stylish bookshelf for your books.",
      imageUrl: "https://example.com/bookshelf.jpg",
    },
  ]);
});

app.post("/api/register", (req, res) => {
  console.log("Received register data:", req.body);
  res.status(200).json({
    message: "Registration successful",
  });
});

app.post("/api/login", (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received login data:", req.body);
  const num = Math.floor(Math.random() * 10);
  if (num % 2 === 0) {
    return res.status(400).json({
      message: "Login failed",
    });
  } else {
    res.status(200).json({
      message: "Login successful",
      username,
      email,
    });
  }
});

app.get("/api/furniture/priceMinMax", (req, res) => {
  const minPrice = 1000;
  const maxPrice = 10000;

  res.json({
    minPrice,
    maxPrice,
  });
});

app.post("/api/cart", (req, res) => {
  const { id, name, quantity } = req.body;
  console.log("Received cart item:", req.body);
  res.status(200).json({
    message:
      "Item added to cart successfully " + id + " " + name + " " + quantity,
  });
});

app.post("/api/owner", (req, res) => {
  const { name, email, password } = req.body;

  const storedOwner = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
  };

  const isSame =
    name === storedOwner.name &&
    email === storedOwner.email &&
    password === storedOwner.password;

  if (isSame) {
    return res.status(200).json({ message: "Data matches the stored owner." });
  } else {
    return res.status(401).json({ message: "Data does not match." });
  }
});

const furnitureData = [
  {
    id: 1,
    name: "Sofa",
    price: 2999,
    inStock: true,
    stock: 10,
    description: "A comfortable sofa for your living room.",
    imageUrl: "https://example.com/sofa.jpg",
    new: true,
    hot: true,
    package: true,
    addedDate: "2023-10-01",
    company: "made in company",
    packageName: "Sadi",
  },
  {
    id: 2,
    name: "Chair",
    price: 1999,
    inStock: true,
    stock: 5,
    description: "A comfortable chair for your office.",
    imageUrl: "https://example.com/chair.jpg",
    new: false,
    hot: true,
    package: false,
    addedDate: "2023-10-02",
    company: "made in company",
    packageName: null,
  },
  {
    id: 3,
    name: "Table",
    price: 4999,
    inStock: false,
    stock: 4,
    description: "A stylish dining table for family gatherings.",
    imageUrl: "https://example.com/dining-table.jpg",
    new: false,
    hot: false,
    package: true,
    addedDate: "2023-10-03",
    company: "made in company",
    packageName: "Sadi",
  },
  {
    id: 4,
    name: "Bed",
    price: 3999,
    inStock: true,
    stock: 3,
    description: "A cozy bed for a good night's sleep with full rest.",
    imageUrl: "https://example.com/bed.jpg",
    new: false,
    hot: false,
    package: true,
    addedDate: "2023-10-04",
    company: "made in company",
    packageName: "Sadi",
  },
];

app.get("/api/owner/furniture", (req, res) => {
  res.json(furnitureData);
});

app.post("/api/owner/furniture", (req, res) => {
  const {
    name,
    price,
    inStock,
    stock,
    description,
    imageUrl,
    newProduct,
    hot,
    packageProduct,
    addedDate,
    company,
    packageName,
  } = req.body;

  console.log("Received product data:", req.body);
  console.log(
    name,
    price,
    inStock,
    stock,
    description,
    imageUrl,
    newProduct,
    hot,
    packageProduct,
    addedDate,
    company,
    packageName
  );

  res.status(200).json({
    message: "Product added successfully",
  });
});

app.get("/api/owner/order", (req, res) => {
  res.json([
    {
      id: 1,
      customerName: "Alice",
      orderDate: "2023-10-01",
      items: [
        { productId: 1, productName: "Sofa", quantity: 1 },
        { productId: 2, productName: "Chair", quantity: 2 },
      ],
      totalAmount: 6997,
      accepted: false,
      delivered: false,
      rejected: false,
      contentNumber: "1234567890",
    },
    {
      id: 2,
      customerName: "Bob",
      orderDate: "2023-10-02",
      items: [
        { productId: 3, productName: "Table", quantity: 1 },
        { productId: 4, productName: "Bed", quantity: 1 },
      ],
      totalAmount: 8998,
      accepted: true,
      delivered: false,
      rejected: false,
      contentNumber: "1234567890",
    },
    {
      id: 3,
      customerName: "Charlie",
      orderDate: "2023-10-03",
      items: [
        { productId: 1, productName: "Sofa", quantity: 1 },
        { productId: 4, productName: "Bed", quantity: 1 },
      ],
      totalAmount: 6998,
      accepted: false,
      delivered: true,
      rejected: false,
      contentNumber: "1234567890",
    },
    {
      id: 4,
      customerName: "David",
      orderDate: "2023-10-04",
      items: [
        { productId: 2, productName: "Chair", quantity: 3 },
        { productId: 3, productName: "Table", quantity: 1 },
      ],
      totalAmount: 10997,
      accepted: false,
      delivered: false,
      rejected: true,
      contentNumber: "1234567890",
    },
  ]);
});

// app.get("/api/owner/user", (req, res) => {
//   res.json([
//     {
//       id: 1,
//       name: "Alice",
//       email: "alice@example.com",
//       contentNumber: "1234567890",
//       address: "123 Main St, City, Country",
//     },
//     {
//       id: 2,
//       name: "Bob",
//       email: "bob@example.com",
//       contentNumber: "0987654321",
//       address: "456 Elm St, City, Country",
//     },
//     {
//       id: 3,
//       name: "Charlie",
//       email: "charlie@example.com",
//       contentNumber: "1122334455",
//       address: "789 Oak St, City, Country",
//     },
//     {
//       id: 4,
//       name: "David",
//       email: "david@example.com",
//       contentNumber: "5566778899",
//       address: "321 Pine St, City, Country",
//     },
//   ]);
// });

app.post("/api/owner/order/:id/accept", (req, res) => {
  const { id } = req.params;
  console.log("Accepting order with ID:", id);

  // Here you would typically update the order status in your database
  // For this example, we'll just return a success message
  res.status(200).json({
    message: `Order ${id} accepted successfully`,
  });
});

app.post("/api/owner/order/:id/reject", (req, res) => {
  const { id } = req.params;
  console.log("Rejecting order with ID:", id);

  // Here you would typically update the order status in your database
  // For this example, we'll just return a success message
  res.status(200).json({
    message: `Order ${id} rejected successfully`,
  });
});

app.post("/api/owner/order/:id/cancel", (req, res) => {
  const { id } = req.params;
  console.log("Cancelling order with ID:", id);

  // Here you would typically update the order status in your database
  // For this example, we'll just return a success message
  res.status(200).json({
    message: `Order ${id} cancelled successfully`,
  });
});

app.post("/api/owner/order/:id/deliver", (req, res) => {
  const { id } = req.params;
  console.log("Delivering order with ID:", id);

  // Here you would typically update the order status in your database
  // For this example, we'll just return a success message
  res.status(200).json({
    message: `Order ${id} delivered successfully`,
  });
});

app.get("/api/owner/furniture/:id", (req, res) => {
  const { id } = req.params;
  console.log("Fetching product with ID:", id);

  // Find the product by ID
  const furnitureItem = furnitureData.find((item) => item.id === parseInt(id));

  if (furnitureItem) {
    res.status(200).json(furnitureItem);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.put("/api/owner/furniture/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    inStock,
    stock,
    description,
    imageUrl,
    newProduct,
    hot,
    packageProduct,
    addedDate,
    company,
    packageName,
  } = req.body;

  console.log("Updating product with ID:", id);
  console.log("Received product data:", req.body);

  // Here you would typically update the product in your database
  // For this example, we'll just return a success message
  res.status(200).json({
    message: `Product ${id} updated successfully`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
