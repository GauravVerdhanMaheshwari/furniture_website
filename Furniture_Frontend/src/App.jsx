import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import {
  Header,
  Footer,
  AdminHeader,
  AdminFooter,
} from "./components/indexComponents";
import { setUser } from "../features/userSlice";

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
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFE8D6] text-[#3F4238] text-xl font-medium">
        Loading app...
      </div>
    );
  }

  // 👇 Slide + fade animation settings
  const pageAnimation = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.4, ease: "easeInOut" },
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
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {isAdminRoute ? <AdminFooter /> : <Footer />}
    </>
  );
}

export default App;
