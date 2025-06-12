# 👋 Hello!

### This repository contains a Furniture Website built using React, Node.js, Express, and MongoDB.

This site might be live on this url :
Key word `might be`

####

https://furniture-website-frontend-z6ro.onrender.com/

####

---

## 🛠️ Project Setup Instructions

### 1. Frontend Setup

Navigate to the frontend directory:

```bash
cd ./Furniture_Frontend
```

Install dependencies:

```bash
npm install
```

> ⚠️ **Note**: Ensure that Node.js is installed on your system.

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd ./Furniture_Backend
```

Install dependencies:

```bash
npm install
```

> ⚠️ **Note**: Node.js is required here as well.

---

## 📁 Project Structure Overview

### Furniture_Frontend

#### `App/`

Contains `store.js`, which handles the Redux store for both user and admin data. It keeps track of IDs and login status. Although the boolean flags are not strictly necessary, they add an extra layer of verification.

#### `features/`

This folder contains Redux slices (`userSlice`, `adminSlice`) used to manage user/admin-related states and actions.

#### `public/`

Stores images used throughout the frontend — primarily in `.webp` format.

#### `src/`

The main source folder for the frontend.

##### `components/`

Houses all components such as Footer, Header, FurnitureCard, etc. It’s essentially the heart of the frontend.
Also it includes indexComponents.js which includes all the components.

#### `pages/`

Houses all pages such as Login, Profile, Cart, etc. It’s essentially the heart of the frontend.
Also it includes indexComponents.js which includes all the pages.

##### `App.jsx`

Handles restoring user/admin state from localStorage into Redux on page load. Also includes the React Router setup.

##### `Main.jsx`

Mounts the app to `index.html` and wraps it with the Redux provider and route configuration.

##### `index.css`

Injects Tailwind CSS styles globally.

---

### Furniture_Backend

#### `config/`

Database configuration for MongoDB.

> 💡 You need to create a `.env` file with the following:
>
> ```env
> DATABASE_URL=mongodb://localhost:27017/databasename
> ```

#### `controllers/`

Contains all API logic such as creating, reading, and deleting data (e.g., users, products).

#### `middleware/`

Handles errors via `next()` and sends appropriate responses.

#### `models/`

Mongoose schemas for various collections such as Users, Products, Cart, etc.

#### `routes/`

Defines API endpoints and maps them to corresponding controller functions.

#### `seed.js`

Contains mock/demo data to populate the database.

#### `server.js`

The main entry point of the backend. Sets up middleware, routes, port configuration, and file upload size handling.

---

## 📚 What I Learned From This Project

- 🗺️ **Planning is crucial**: I learned that a solid plan (including schema design, routes, and UI flow) saves a ton of time. Initially, I jumped into development without a clear roadmap, which slowed things down.

- 🧱 **Building from scratch**: It was amazing to build something from the ground up. There were frustrating bugs, but fixing them felt extremely rewarding.

- 🧠 **Overcoming complexity**: Redux Toolkit seemed overwhelming at first, but as I built things, it got easier. The same applies to React Router, Express, etc.

- 📄 **Writing documentation**: I’ve learned how to create a more structured and helpful README (hopefully 😄).

- 👨‍💻 **I don’t know everything — and that’s okay**: This project made me realize how much more there is to learn about debugging, planning, and scalable architecture. But I’ve also grown more confident in tackling those areas.

---

## 🙏 Special Thanks

# Big thanks to the open-source community for your support and contributions!

> > > > > > > parent of 24c2c92 (feat: add comprehensive README file with project setup instructions and structure overview)
