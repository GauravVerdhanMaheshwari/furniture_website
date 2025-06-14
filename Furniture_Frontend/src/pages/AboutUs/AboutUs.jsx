import React from "react";

function AboutUs() {
  return (
    <div className="bg-cream py-10 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto mt-20">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-tan-dark">
          About Us
        </h1>
        <p className="text-base sm:text-lg mt-2 text-olive-dark font-medium">
          Welcome to Geetanjali Furniture – Crafting Comfort, Creating Style.
        </p>
      </div>

      <div className="space-y-10">
        {/* Introduction Block */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition duration-300">
          <p className="text-base sm:text-lg text-charcoal text-justify leading-relaxed">
            Located at Shop No. 1 & 2, Shree Manav Siva Vikas Mandal, Near
            I.T.I., New RTO Road, Vastral - 382418, Geetanjali Furniture has
            proudly served the community for over 15 years with unwavering
            dedication to quality, affordability, and customer satisfaction.
          </p>
        </section>

        {/* Legacy Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-4">
            A Legacy of Trust and Quality
          </h2>
          <p className="text-base sm:text-lg text-charcoal text-justify leading-relaxed">
            At Geetanjali Furniture, we believe your home is a reflection of
            your personality — and we help you express it through stylish,
            durable, and comfortable furniture. Since our humble beginnings,
            we’ve become a trusted name in the local market, delivering elegance
            and excellence to every household.
          </p>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-6">
            Why Choose Us?
          </h2>
          <ul className="text-charcoal text-base sm:text-lg space-y-4 list-disc pl-5 leading-relaxed">
            <li>
              <strong>Extensive Collection:</strong> From contemporary to
              classic furniture solutions.
            </li>
            <li>
              <strong>Customization Options:</strong> Tailored to your taste,
              size, and space.
            </li>
            <li>
              <strong>One-Stop Destination:</strong> Everything from décor to
              kitchens under one roof.
            </li>
            <li>
              <strong>Budget-Friendly Pricing:</strong> Great value with
              seasonal discounts.
            </li>
            <li>
              <strong>Fast & Reliable Delivery:</strong> On-time and careful
              handling every time.
            </li>
            <li>
              <strong>After-Sales Support:</strong> Hassle-free, expert guidance
              post-purchase.
            </li>
            <li>
              <strong>Eco-Friendly Craftsmanship:</strong> Sustainable,
              planet-conscious design.
            </li>
          </ul>
        </section>

        {/* Mission Statement */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-4">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-charcoal text-justify leading-relaxed">
            To provide high-quality, stylish, and affordable furniture that
            enhances your home. We strive for innovation, craftsmanship, and
            sustainability in every piece we offer.
          </p>
        </section>

        {/* Vision Statement */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-4">
            Our Vision
          </h2>
          <p className="text-base sm:text-lg text-charcoal text-justify leading-relaxed">
            Whether it's your first home or a fresh update, we help bring your
            vision to life. Explore comfort. Explore style. Explore Geetanjali.
          </p>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 text-center hover:shadow-lg transition duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan mb-2">
            📍 Geetanjali Furniture
          </h2>
          <p className="text-base sm:text-lg text-charcoal leading-relaxed">
            Shop No. 1 & 2, Shree Manav Siva Vikas Mandal, Near I.T.I., New RTO
            Road, Vastral – 382418
          </p>

          <h3 className="text-lg sm:text-xl font-medium text-tan-dark mt-4">
            📞 Call us today for inquiries and offers!
          </h3>
          <p>
            <a
              href="tel:+919662199989"
              className="text-olive-dark hover:underline transition duration-200"
            >
              +91 96621 99989
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
