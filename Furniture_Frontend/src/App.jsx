import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

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

  // ✅ Rehydration state to ensure Redux is updated before rendering app
  const [rehydrated, setRehydrated] = useState(false);

  /**
   * 🔁 Rehydrate user state from localStorage on initial load
   */
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

    // ✅ Mark rehydration complete
    setRehydrated(true);
  }, [dispatch]);

  // 🔁 Toggle between admin and user layouts based on route prefix
  const isAdminRoute = location.pathname.startsWith("/admin");

  // 🕐 Prevent early render before user state is set
  if (!rehydrated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFE8D6] text-[#3F4238] text-xl font-medium">
        Loading app...
      </div>
    );
  }

  return (
    <div>
      {/* Conditional Header */}
      {isAdminRoute ? <AdminHeader /> : <Header />}

      {/* Nested route content */}
      <Outlet />

      {/* Conditional Footer */}
      {isAdminRoute ? <AdminFooter /> : <Footer />}
    </div>
  );
}

export default App;
