import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import {
  Home,
  Products,
  AboutUs,
  Contacts,
  Cart,
  CheckOut,
  Profile,
  Login,
  Register,
  AdminLogin,
  AdminHome,
  AdminProducts,
  AdminOrders,
  AdminProfile,
  AdminAddProduct,
  AdminEditProduct,
  Page404,
} from "./components/index.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "../app/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contacts />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/add-product" element={<AdminAddProduct />} />
      <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
