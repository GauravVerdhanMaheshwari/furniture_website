import React from "react";

/**
 * Contacts Component
 * Displays company contact information and a contact form for inquiries.
 */
function Contacts() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-[85vh] bg-[#FFE8D6] px-6 md:px-16 py-10 mt-20 gap-10 sm:mt-15">
      {/* 📌 Contact Details Section */}
      <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-[#B7B7A4] transition hover:shadow-xl">
        <h1 className="text-3xl font-bold text-[#3F4238] mb-6 text-center md:text-left">
          📞 Contact Details
        </h1>

        <div className="space-y-6 text-[#3F4238]">
          {/* 🏬 Address */}
          <div>
            <h2 className="text-lg font-semibold">🏬 Address</h2>
            <p className="text-[#6B705C] mt-1 leading-relaxed">
              209/1, Bajarngnagar, Thakorvas,
              <br />
              Mahadevnagar Tekro, Vastral Road,
              <br />
              Vastral, Tal. Dashkoi
            </p>
          </div>

          {/* 📞 Phone */}
          <div>
            <h2 className="text-lg font-semibold">📞 Phone</h2>
            <p className="text-[#6B705C] mt-1">+91 96621 99988</p>
          </div>

          {/* 📧 Email */}
          <div>
            <h2 className="text-lg font-semibold">📧 Email</h2>
            <p className="text-[#6B705C] mt-1">jaidev_prashad@yahoo.com</p>
          </div>
        </div>
      </div>

      {/* 📝 Contact Form Section */}
      {/* <div className="w-full md:w-1/2 bg-white border border-[#B7B7A4] shadow-lg rounded-2xl p-8 md:p-10 transition hover:shadow-xl"> */}
      {/* <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: Handle form submission here (send email or store data)
            alert("Message sent! (Functionality not yet implemented)");
          }}
        > */}
      {/* <h2 className="text-2xl font-bold text-[#3F4238] text-center md:text-left">
            📝 Get in Touch
          </h2> */}

      {/* Name Field */}
      {/* <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full p-3 border border-[#B7B7A4] rounded-md bg-[#FFF8F0] text-[#3F4238] focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
          /> */}

      {/* Email Field */}
      {/* <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full p-3 border border-[#B7B7A4] rounded-md bg-[#FFF8F0] text-[#3F4238] focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
          /> */}

      {/* Phone Field */}
      {/* <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border border-[#B7B7A4] rounded-md bg-[#FFF8F0] text-[#3F4238] focus:outline-none focus:ring-2 focus:ring-[#B98B73]"
          /> */}

      {/* Submit Button */}
      {/* <button
            type="submit"
            className="w-full bg-[#B98B73] text-white py-3 rounded-md font-semibold hover:bg-[#CB997E] transition duration-300"
          >
            Send Message
          </button> */}
      {/* </form> */}
      {/* </div> */}
    </div>
  );
}

export default Contacts;
