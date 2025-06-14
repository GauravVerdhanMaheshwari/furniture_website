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
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";

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
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
