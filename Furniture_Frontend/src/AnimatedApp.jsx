import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Core components
import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Loading from "./components/Loading/Loading.jsx";

// Lazy loader helper
const lazyWithDelay = (importFunc, delay = 0) =>
  lazy(() =>
    Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([module]) => module)
  );

// Lazy-loaded pages
const Home = lazyWithDelay(() => import("./pages/Home/Home.jsx"));
const Products = lazyWithDelay(() => import("./pages/Products/Products.jsx"));
const PackagesUser = lazyWithDelay(() =>
  import("./pages/PackagesUser/PackagesUser.jsx")
);
const AboutUs = lazyWithDelay(() => import("./pages/AboutUs/AboutUs.jsx"));
const Contacts = lazyWithDelay(() => import("./pages/Contacts/Contacts.jsx"));
const Profile = lazyWithDelay(() => import("./pages/Profile/Profile.jsx"));
const Login = lazyWithDelay(() => import("./pages/Login/Login.jsx"));
const Register = lazyWithDelay(() => import("./pages/Register/Register.jsx"));

const AdminLogin = lazyWithDelay(() =>
  import("./pages/AdminLogin/AdminLogin.jsx")
);
const AdminHome = lazyWithDelay(() =>
  import("./pages/AdminHome/AdminHome.jsx")
);
const AdminProducts = lazyWithDelay(() =>
  import("./pages/AdminProducts/AdminProducts.jsx")
);
const AdminPackages = lazyWithDelay(() =>
  import("./pages/AdminPackages/AdminPackages.jsx")
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
const AdminPackagesAdd = lazyWithDelay(() =>
  import("./pages/AdminPackagesAdd/AdminPackagesAdd.jsx")
);
const AdminPackagesEdit = lazyWithDelay(() =>
  import("./pages/AdminPackagesEdit/AdminPackagesEdit.jsx")
);

const Page404 = lazyWithDelay(() => import("./pages/404/Page404.jsx"));

// Router setup
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
        path="packages"
        element={
          <Suspense fallback={<Loading />}>
            <PackagesUser />
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

      {/* Admin */}
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
        path="admin/profile"
        element={
          <Suspense fallback={<Loading />}>
            <AdminProfile />
          </Suspense>
        }
      />
      <Route
        path="admin/packages"
        element={
          <Suspense fallback={<Loading />}>
            <AdminPackages />
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
        path="admin/add-package"
        element={
          <Suspense fallback={<Loading />}>
            <AdminPackagesAdd />
          </Suspense>
        }
      />
      <Route
        path="admin/edit-package/:id"
        element={
          <Suspense fallback={<Loading />}>
            <AdminPackagesEdit />
          </Suspense>
        }
      />

      {/* 404 */}
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

// Page transition wrapper
function MotionWrapper({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function AnimatedApp() {
  return (
    <MotionWrapper>
      <RouterProvider router={router} />
    </MotionWrapper>
  );
}
