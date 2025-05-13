import React from "react";

function Contacts() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center min-h-[85vh] mt-3 px-4">
      <div className="flex flex-col gap-4 md:mr-5 border-b-2 md:border-b-0 md:border-r-2 border-gray-300 p-4 md:p-10 w-full md:flex-1 mt-20">
        <h1 className="text-xl md:text-2xl font-bold text-center mb-1">
          Contact Us
        </h1>
        <form action="" className="flex flex-col gap-4 w-full max-w-md mx-auto">
          <label htmlFor="name" className="text-lg md:text-xl font-bold">
            Name 📝
          </label>
          <input
            type="text"
            placeholder="Name"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none"
          />
          <label htmlFor="email" className="text-lg md:text-xl font-bold">
            Email 📧
          </label>
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none"
          />
          <label htmlFor="phone" className="text-lg md:text-xl font-bold">
            Phone Number 📞
          </label>
          <input
            type="number"
            placeholder="Phone Number"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none"
          />
          <button
            type="submit"
            className="bg-red-500 text-white p-2 rounded-md w-full hover:bg-red-600 transition-all duration-300"
          >
            Send
          </button>
        </form>
      </div>
      <div className="flex flex-col w-full md:flex-1 p-4 md:p-10">
        <div className="p-2 md:p-4">
          <h1 className="text-xl md:text-2xl font-bold">Address 🏬 : </h1>
          <p className="text-sm md:text-base text-wrap">
            209/1, Bajarngnagar, Thakorvas, mahadevnagar Tekro, Vastral Road,
            Vastral, Tal. Dashkoi.
          </p>
        </div>
        <div className="p-2 md:p-4">
          <h1 className="text-xl md:text-2xl font-bold">
            Contact Number 📞 :{" "}
          </h1>
          <p className="text-sm md:text-base text-wrap">+91 9662199988</p>
        </div>
        <div className="p-2 md:p-4">
          <h1 className="text-xl md:text-2xl font-bold">Email 📧 : </h1>
          <p className="text-sm md:text-base text-wrap">
            jaidev_prashad@yahoo.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
