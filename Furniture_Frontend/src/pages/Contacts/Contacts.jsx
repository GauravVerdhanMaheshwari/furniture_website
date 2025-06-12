import React from "react";

function Contacts() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-[85vh] bg-[#FFE8D6] px-6 md:px-16 py-10 mt-20">
      {/* Contact Info Section */}
      <div className="w-full md:flex-1 bg-white rounded-xl shadow-md p-6 md:p-10 border border-[#B7B7A4]">
        <h1 className="text-2xl md:text-3xl font-bold text-[#3F4238] mb-6 text-center md:text-left">
          Contact Details
        </h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-[#3F4238]">
              🏬 Address:
            </h2>
            <p className="text-[#6B705C] text-base mt-1">
              209/1, Bajarngnagar, Thakorvas, Mahadevnagar Tekro, Vastral Road,
              Vastral, Tal. Dashkoi.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#3F4238]">
              📞 Contact:
            </h2>
            <p className="text-[#6B705C] text-base mt-1">+91 9662199988</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#3F4238]">📧 Email:</h2>
            <p className="text-[#6B705C] text-base mt-1">
              jaidev_prashad@yahoo.com
            </p>
          </div>
        </div>
      </div>

      {/* Optional: Uncomment this to restore form */}
      {/* <div className="w-full md:flex-1 mt-10 md:mt-0 md:ml-10">
        <form className="bg-white border border-[#B7B7A4] shadow-md rounded-xl p-6 md:p-10 space-y-5">
          <h2 className="text-2xl font-bold text-[#3F4238] text-center md:text-left mb-4">
            Get in Touch
          </h2>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-md border border-[#B7B7A4] focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md border border-[#B7B7A4] focus:outline-none"
          />
          <input
            type="number"
            placeholder="Phone Number"
            className="w-full p-3 rounded-md border border-[#B7B7A4] focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#B98B73] text-white px-4 py-2 rounded-md hover:bg-[#DDBEA9] transition duration-300"
          >
            Send
          </button>
        </form>
      </div> */}
    </div>
  );
}

export default Contacts;
