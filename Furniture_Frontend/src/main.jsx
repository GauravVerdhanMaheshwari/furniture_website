import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "../app/store.js";

import App from "./App.jsx";
import Loading from "./components/Loading/Loading.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";

/**
 * 💤 Lazy loader with optional artificial delay (for UX or spinner testing)
 * @param {Function} importFunc - The dynamic import of the component
 * @param {number} delay - Optional delay in milliseconds (default: 8500ms)
 */
const lazyWithDelay = (importFunc, delay = 3000) =>
  lazy(() =>
    Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([module]) => module)
  );

// 🧩 Client pages (lazy-loaded for performance)
const Home = lazyWithDelay(() => import("./pages/Home/Home.jsx"));
const Products = lazyWithDelay(() => import("./pages/Products/Products.jsx"));
const AboutUs = lazyWithDelay(() => import("./pages/AboutUs/AboutUs.jsx"));
const Contacts = lazyWithDelay(() => import("./pages/Contacts/Contacts.jsx"));
const Cart = lazyWithDelay(() => import("./pages/Cart/Cart.jsx"));
const CheckOut = lazyWithDelay(() => import("./pages/CheckOut/CheckOut.jsx"));
const Profile = lazyWithDelay(() => import("./pages/Profile/Profile.jsx"));
const Login = lazyWithDelay(() => import("./pages/Login/Login.jsx"));
const Register = lazyWithDelay(() => import("./pages/Register/Register.jsx"));

// 🔐 Admin pages (isolated by path prefix)
const AdminLogin = lazyWithDelay(() =>
  import("./pages/AdminLogin/AdminLogin.jsx")
);
const AdminHome = lazyWithDelay(() =>
  import("./pages/AdminHome/AdminHome.jsx")
);
const AdminProducts = lazyWithDelay(() =>
  import("./pages/AdminProducts/AdminProducts.jsx")
);
const AdminOrder = lazyWithDelay(() =>
  import("./pages/AdminOrder/AdminOrder.jsx")
);
const AdminProfile = lazyWithDelay(() =>
  import("./pages/AdminProfile/AdminProfile.jsx")
);
const AdminAddProduct = lazyWithDelay(() =>
  import("./pages/AdminAddProduct/AdminAddProduct.jsx")
);
const AdminEditProduct = lazyWithDelay(() =>
  import("./pages/AdminEditProduct/AdminEditProduct.jsx")
);

// ❌ 404 fallback page
const Page404 = lazyWithDelay(() => import("./pages/404/Page404.jsx"));

/**
 * 🧭 React Router setup using route definitions and nested <Route> structure
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      {/* Client-side routes */}
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="products"
        element={
          <Suspense fallback={<Loading />}>
            <Products />
          </Suspense>
        }
      />
      <Route
        path="about"
        element={
          <Suspense fallback={<Loading />}>
            <AboutUs />
          </Suspense>
        }
      />
      <Route
        path="contact"
        element={
          <Suspense fallback={<Loading />}>
            <Contacts />
          </Suspense>
        }
      />
      <Route
        path="cart"
        element={
          <Suspense fallback={<Loading />}>
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="checkout"
        element={
          <Suspense fallback={<Loading />}>
            <CheckOut />
          </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        }
      />

      {/* Admin routes */}
      <Route
        path="admin"
        element={
          <Suspense fallback={<Loading />}>
            <AdminLogin />
          </Suspense>
        }
      />
      <Route
        path="admin/login"
        element={
          <Suspense fallback={<Loading />}>
            <AdminLogin />
          </Suspense>
        }
      />
      <Route
        path="admin/home"
        element={
          <Suspense fallback={<Loading />}>
            <AdminHome />
          </Suspense>
        }
      />
      <Route
        path="admin/products"
        element={
          <Suspense fallback={<Loading />}>
            <AdminProducts />
          </Suspense>
        }
      />
      <Route
        path="admin/orders"
        element={
          <Suspense fallback={<Loading />}>
            <AdminOrder />
          </Suspense>
        }
      />
      <Route
        path="admin/profile"
        element={
          <Suspense fallback={<Loading />}>
            <AdminProfile />
          </Suspense>
        }
      />
      <Route
        path="admin/add-product"
        element={
          <Suspense fallback={<Loading />}>
            <AdminAddProduct />
          </Suspense>
        }
      />
      <Route
        path="admin/edit-product/:id"
        element={
          <Suspense fallback={<Loading />}>
            <AdminEditProduct />
          </Suspense>
        }
      />

      {/* Fallback route (404) */}
      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <Page404 />
          </Suspense>
        }
      />
    </Route>
  )
);

/**
 * 🚀 React app entry point: mount root component with Redux & Router
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
