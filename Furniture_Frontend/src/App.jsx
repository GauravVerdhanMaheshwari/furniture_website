import React, { useEffect } from "react";
import { Footer, Header, AdminFooter, AdminHeader } from "./components";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [rehydrated, setRehydrated] = React.useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.userID) {
          dispatch(setUser(parsedUser));
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
    // ✅ Mark as rehydrated after effect runs
    setRehydrated(true);
  }, [dispatch]);

  const changeHeaderFooter = location.pathname.startsWith("/admin");

  if (!rehydrated) {
    return <div className="text-center p-10 text-xl">Loading app...</div>;
  }

  return (
    <div>
      {changeHeaderFooter ? <AdminHeader /> : <Header />}
      <Outlet />
      {changeHeaderFooter ? <AdminFooter /> : <Footer />}
    </div>
  );
}

export default App;
