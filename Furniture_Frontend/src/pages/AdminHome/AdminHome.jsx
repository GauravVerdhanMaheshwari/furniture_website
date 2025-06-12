import React from "react";

function Home() {
  if (!localStorage.getItem("admin")) {
    window.location.href = "/admin/login";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFE8D6] px-4">
      <div className="bg-[#DDBEA9] rounded-xl shadow-md p-8 max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold text-[#3F4238]">
          Welcome to the Admin Dashboard
        </h2>
        <p className="mt-3 text-[#6B705C]">
          Here you can manage products, orders, and your profile.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="/admin/products"
            className="px-5 py-3 rounded-md text-white bg-[#CB997E] hover:bg-[#B98B73] transition-all duration-300"
          >
            Manage Products
          </a>
          <a
            href="/admin/orders"
            className="px-5 py-3 rounded-md text-white bg-[#B98B73] hover:bg-[#A5A58D] transition-all duration-300"
          >
            Manage Orders
          </a>
          <a
            href="/admin/profile"
            className="px-5 py-3 rounded-md text-white bg-[#6B705C] hover:bg-[#3F4238] transition-all duration-300"
          >
            Manage Me
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
