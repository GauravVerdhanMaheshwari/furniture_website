import React from "react";
import { Footer, Header, AdminFooter, AdminHeader } from "./components";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const changeHeaderFooter = location.pathname.startsWith("/admin");

  return (
    <div>
      {changeHeaderFooter ? <AdminHeader /> : <Header />}
      <Outlet />
      {changeHeaderFooter ? <AdminFooter /> : <Footer />}
    </div>
  );
}

export default App;
