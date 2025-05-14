import React from "react";

function AboutUs() {
  return (
    <div className="bg-gradient-to-br from-white py-10 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto mt-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600">
          About Us
        </h1>
        <p className="text-base sm:text-lg mt-2 text-gray-600 font-medium">
          Welcome to Geetanjali Furniture – Crafting Comfort, Creating Style.
        </p>
      </div>

      <div className="space-y-10">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 group hover:shadow-lg transition duration-300 ease-in-out">
          <p className="text-base sm:text-lg text-gray-700 text-justify">
            Located at Shop No. 1 & 2, Shree Manav Siva Vikas Mandal, Near
            I.T.I., New RTO Road, Vastral - 382418, Geetanjali Furniture has
            proudly served the community for over 15 years with unwavering
            dedication to quality, affordability, and customer satisfaction.
          </p>
        </div>

        {/* Legacy */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 group hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-500 text-center mb-4">
            A Legacy of Trust and Quality
          </h2>
          <p className="text-base sm:text-lg text-gray-700 text-justify">
            At Geetanjali Furniture, we believe that your home is a reflection
            of your personality — and we help you express it through stylish,
            durable, and comfortable furniture. Since our humble beginnings, we
            have grown into a trusted name in the local furniture market, known
            for delivering elegance and excellence to every household.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 group hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-500 text-center mb-6">
            Why Choose Us?
          </h2>
          <ul className="text-gray-700 text-base sm:text-lg space-y-4 list-disc pl-5">
            <li>
              <strong>Extensive Collection:</strong> From contemporary sofas to
              traditional wooden dining sets, ergonomic office furniture to
              modular wardrobes.
            </li>
            <li>
              <strong>Customization Options:</strong> Tailored furniture
              designed for your unique taste, size, and finish.
            </li>
            <li>
              <strong>One-Stop Destination:</strong> Home décor, mattresses,
              curtains, and modular kitchens – all under one roof.
            </li>
            <li>
              <strong>Budget-Friendly Pricing:</strong> Affordable yet premium.
              Great value with festival offers.
            </li>
            <li>
              <strong>Fast & Reliable Delivery:</strong> Safe doorstep delivery
              with care.
            </li>
            <li>
              <strong>After-Sales Support:</strong> Expert installation and
              support.
            </li>
            <li>
              <strong>Eco-Friendly Craftsmanship:</strong> Sustainable materials
              for a greener future.
            </li>
          </ul>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 group hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-500 text-center mb-4">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-gray-700 text-justify">
            To provide high-quality, stylish, and affordable furniture that
            enhances your home. We strive for innovation, craftsmanship, and
            sustainability.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 group hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-500 text-center mb-4">
            Our Vision
          </h2>
          <p className="text-base sm:text-lg text-gray-700 text-justify">
            Whether it's your first home or a fresh update, we help bring your
            vision to life. Explore comfort. Explore style. Explore Geetanjali.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 text-center group hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-500 mb-2">
            📍 Geetanjali Furniture
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            Shop No. 1 & 2, Shree Manav Siva Vikas Mandal, Near I.T.I., New RTO
            Road, Vastral – 382418
          </p>
          <h3 className="text-lg sm:text-xl font-medium text-orange-600 mt-4">
            📞 Call us today for inquiries and offers!
          </h3>
          <p>
            <a
              href="tel:+919662199989"
              className="text-blue-500 hover:underline duration-150 transition-all"
            >
              +91 9662199989
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
