# 👋 Hello!

### This repository contains a Furniture Website built using React.js, Node.js, Express.js, and MongoDB.

This site **might be live** at:

🔗 [https://furniture-website-frontend-z6ro.onrender.com](https://furniture-website-frontend-z6ro.onrender.com)

---

## 🛠️ Project Setup Instructions

### 1. Frontend Setup

```bash
cd ./Furniture_Frontend
npm install
```

> ⚠️ Ensure Node.js is installed on your system.

### 2. Backend Setup

```bash
cd ./Furniture_Backend
npm install
```

> ⚠️ Node.js required here as well.

---

## 📁 Project Structure Overview

### Furniture_Frontend

- **App/** – Contains `store.js` for Redux store (user/admin management)
- **features/** – Redux slices (`userSlice`, `adminSlice`)
- **public/** – Images (mostly `.webp`)
- **src/**
  - **components/** – UI components like Header, Footer, FurnitureCard
  - **pages/** – Pages like Login, Profile, Cart
  - **App.jsx** – Loads Redux data, sets up routes
  - **Main.jsx** – Mounts app, sets up provider and routing
  - **index.css** – Global Tailwind CSS

### Furniture_Backend

- **config/** – MongoDB connection setup
- **controllers/** – Logic for user, product, cart APIs
- **middleware/** – Error handling middleware
- **models/** – Mongoose schemas for collections
- **routes/** – API endpoint definitions
- **utils/** – Functions like sending email
- **seed.js** – Demo/mock data
- **server.js** – Entry point, connects routes, middleware

> 💡 `.env` needed in backend:
>
> ```env
> DATABASE_URL=mongodb://localhost:27017/databasename
> ```

---

## 📚 What I Learned From This Project

- 🧭 **Self-learning:** Entirely self-taught via YouTube, Google, and AI tools
- 🧱 **Full-stack development:** Built a fully functional site with auth, cart, products, and admin dashboard
- ⚙️ **Complex deployments:** Handling deployment of frontend, backend, and MongoDB via Render
- 📧 **Mail integration:** Sending inquiry emails from the site
- 🔧 **Debugging:** Learned to resolve real-world issues across the stack
- 📄 **Documentation:** Gained experience writing useful technical documentation

---

## 🙏 Special Thanks

Big thanks to the open-source community for tools, support, and tutorials!
