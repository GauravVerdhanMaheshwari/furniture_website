import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
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

  // 👇 Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (!rehydrated) {
    return <Loading />;
  }

  return (
    <>
      {isAdminRoute ? <AdminHeader /> : <Header />}

      <React.Suspense fallback={<Loading />}>
        <Outlet />
      </React.Suspense>

      {isAdminRoute ? <AdminFooter /> : <Footer />}
    </>
  );
}

export default App;
