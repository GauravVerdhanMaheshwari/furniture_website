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
      description: "A comfortable sofa for your living room.",
      imageUrl: "https://example.com/sofa.jpg",
    },
    {
      id: 2,
      name: "Dining Table",
      price: 4999,
      description: "A stylish dining table for family gatherings.",
      imageUrl: "https://example.com/dining-table.jpg",
    },
    {
      id: 3,
      name: "Bed",
      price: 3999,
      description: "A cozy bed for a good night's sleep with full rest.",
      imageUrl: "https://example.com/bed.jpg",
    },
    {
      id: 4,
      name: "Chair",
      price: 1999,
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
      description: "A comfortable sofa for your living room.",
      imageUrl: "https://example.com/sofa.jpg",
    },
    {
      id: 2,
      name: "Dining Table",
      price: 4999,
      description: "A stylish dining table for family gatherings.",
      imageUrl: "https://example.com/dining-table.jpg",
    },
    {
      id: 3,
      name: "Bed",
      price: 3999,
      description: "A cozy bed for a good night's sleep with full rest.",
      imageUrl: "https://example.com/bed.jpg",
    },
    {
      id: 4,
      name: "Chair",
      price: 1999,
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
      description: "A comfortable sofa for your living room.",
      imageUrl: "https://example.com/sofa.jpg",
    },
    {
      id: 2,
      name: "Dining Table",
      price: 4999,
      description: "A stylish dining table for family gatherings.",
      imageUrl: "https://example.com/dining-table.jpg",
    },
    {
      id: 3,
      name: "Bed",
      price: 3999,
      description: "A cozy bed for a good night's sleep with full rest.",
      imageUrl: "https://example.com/bed.jpg",
    },
    {
      id: 4,
      name: "Chair",
      price: 1999,
      description: "A comfortable chair for your office.",
      imageUrl: "https://example.com/chair.jpg",
    },
  ]);
});

app.get("/api/products", (req, res) => {
  res.json({
    items: [
      { id: 1, name: "Sofa" },
      { id: 2, name: "Chair" },
      { id: 3, name: "Table" },
      { id: 4, name: "Bed" },
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
      type: "Sofa",
      company: "",
      price: 2999,
      description: "A comfortable sofa for your living room.",
      imageUrl: "https://example.com/sofa.jpg",
    },
    {
      id: 2,
      type: "Chair",
      company: "IKEA",
      price: 1999,
      description: "A comfortable chair for your office.",
      imageUrl: "https://example.com/chair.jpg",
    },
    {
      id: 3,
      type: "Table",
      company: "",
      price: 4999,
      description: "A stylish dining table for family gatherings.",
      imageUrl: "https://example.com/dining-table.jpg",
    },
    {
      id: 4,
      type: "Bed",
      company: "",
      price: 3999,
      description: "A cozy bed for a good night's sleep with full rest.",
      imageUrl: "https://example.com/bed.jpg",
    },
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
