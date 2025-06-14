import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "../app/store.js";
import Loading from "./components/Loading/Loading.jsx";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Products = lazy(() => import("./pages/Products/Products.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs.jsx"));
const Contacts = lazy(() => import("./pages/Contacts/Contacts.jsx"));
const Cart = lazy(() => import("./pages/Cart/Cart.jsx"));
const CheckOut = lazy(() => import("./pages/CheckOut/CheckOut.jsx"));
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Register = lazy(() => import("./pages/Register/Register.jsx"));

const AdminLogin = lazy(() => import("./pages/AdminLogin/AdminLogin.jsx"));
const AdminHome = lazy(() => import("./pages/AdminHome/AdminHome.jsx"));
const AdminProducts = lazy(() =>
  import("./pages/AdminProducts/AdminProducts.jsx")
);
const AdminOrder = lazy(() => import("./pages/AdminOrder/AdminOrder.jsx"));
const AdminProfile = lazy(() =>
  import("./pages/AdminProfile/AdminProfile.jsx")
);
const AdminAddProduct = lazy(() =>
  import("./pages/AdminAddProduct/AdminAddProduct.jsx")
);
const AdminEditProduct = lazy(() =>
  import("./pages/AdminEditProduct/AdminEditProduct.jsx")
);
const Page404 = lazy(() => import("./pages/404/Page404.jsx"));

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
      <Route path="/admin/orders" element={<AdminOrder />} />
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
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
);
