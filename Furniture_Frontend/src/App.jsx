import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { setUser } from "../features/userSlice";
import Loading from "./components/Loading/Loading.jsx";

import {
  Header,
  Footer,
  AdminHeader,
  AdminFooter,
} from "./components/indexComponents";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser?.userID) {
          dispatch(setUser(parsedUser));
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
    setRehydrated(true);
  }, [dispatch]);

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (!rehydrated) {
    return <Loading />;
  }

  const pageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <>
      {isAdminRoute ? <AdminHeader /> : <Header />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          {...pageAnimation}
          className="min-h-screen"
        >
          <React.Suspense fallback={<Loading />}>
            <Outlet />
          </React.Suspense>
        </motion.div>
      </AnimatePresence>

      {isAdminRoute ? <AdminFooter /> : <Footer />}
    </>
  );
}

export default App;
