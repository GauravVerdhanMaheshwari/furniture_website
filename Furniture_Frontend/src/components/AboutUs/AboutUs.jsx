import React from "react";

function AboutUs() {
  return (
    <div className="bg-cream py-10 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto mt-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-tan-dark">
          About Us
        </h1>
        <p className="text-base sm:text-lg mt-2 text-olive-dark font-medium">
          Welcome to Geetanjali Furniture – Crafting Comfort, Creating Style.
        </p>
      </div>

      <div className="space-y-10">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition">
          <p className="text-base sm:text-lg text-charcoal text-justify">
            Located at Shop No. 1 & 2, Shree Manav Siva Vikas Mandal, Near
            I.T.I., New RTO Road, Vastral - 382418, Geetanjali Furniture has
            proudly served the community for over 15 years with unwavering
            dedication to quality, affordability, and customer satisfaction.
          </p>
        </div>

        {/* Legacy */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-4">
            A Legacy of Trust and Quality
          </h2>
          <p className="text-base sm:text-lg text-charcoal text-justify">
            At Geetanjali Furniture, we believe that your home is a reflection
            of your personality — and we help you express it through stylish,
            durable, and comfortable furniture. Since our humble beginnings, we
            have grown into a trusted name in the local furniture market, known
            for delivering elegance and excellence to every household.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-6">
            Why Choose Us?
          </h2>
          <ul className="text-charcoal text-base sm:text-lg space-y-4 list-disc pl-5">
            <li>
              <strong>Extensive Collection:</strong> Contemporary to classic
              furniture solutions.
            </li>
            <li>
              <strong>Customization Options:</strong> Tailored to your taste,
              size, and space.
            </li>
            <li>
              <strong>One-Stop Destination:</strong> From décor to kitchens, all
              under one roof.
            </li>
            <li>
              <strong>Budget-Friendly Pricing:</strong> Great value with
              seasonal deals.
            </li>
            <li>
              <strong>Fast & Reliable Delivery:</strong> Timely and careful
              handling.
            </li>
            <li>
              <strong>After-Sales Support:</strong> Hassle-free expert service.
            </li>
            <li>
              <strong>Eco-Friendly Craftsmanship:</strong> Sustainable and
              conscious design.
            </li>
          </ul>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-4">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-charcoal text-justify">
            To provide high-quality, stylish, and affordable furniture that
            enhances your home. We strive for innovation, craftsmanship, and
            sustainability.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-4">
            Our Vision
          </h2>
          <p className="text-base sm:text-lg text-charcoal text-justify">
            Whether it's your first home or a fresh update, we help bring your
            vision to life. Explore comfort. Explore style. Explore Geetanjali.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 text-center hover:shadow-lg transition">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan mb-2">
            📍 Geetanjali Furniture
          </h2>
          <p className="text-base sm:text-lg text-charcoal">
            Shop No. 1 & 2, Shree Manav Siva Vikas Mandal, Near I.T.I., New RTO
            Road, Vastral – 382418
          </p>
          <h3 className="text-lg sm:text-xl font-medium text-tan-dark mt-4">
            📞 Call us today for inquiries and offers!
          </h3>
          <p>
            <a
              href="tel:+919662199989"
              className="text-olive-dark hover:underline transition"
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
