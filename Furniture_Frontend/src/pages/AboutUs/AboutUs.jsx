import React from "react";
import { Helmet } from "react-helmet";

function AboutUs() {
  return (
    <div className="bg-cream py-10 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto mt-20 sm:mt-15">
      {/* SEO and Meta Info */}
      <Helmet>
        <title>About Us | Geetanjali Furniture</title>
        <meta
          name="description"
          content="Learn about Geetanjali Furniture, a trusted name in stylish and affordable furniture for over 15 years in Vastral. Discover our mission, values, and why customers love us."
        />
      </Helmet>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-tan-dark">
          About Us
        </h1>
        <p className="text-base sm:text-lg mt-2 text-olive-dark font-medium">
          Welcome to Geetanjali Furniture – Crafting Comfort, Creating Style.
        </p>
      </div>

      <div className="space-y-10">
        {/* Company Intro */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition duration-300">
          <p className="text-base sm:text-lg text-charcoal text-justify leading-relaxed">
            Located at Shop No. 1 & 2, Shree Manav Siva Vikas Mandal, near
            I.T.I., New RTO Road, Vastral – 382418, Geetanjali Furniture has
            proudly served the community for over 15 years. We are known for
            quality craftsmanship, affordability, and unwavering customer
            satisfaction.
          </p>
        </section>

        {/* Legacy */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-4">
            A Legacy of Trust and Quality
          </h2>
          <p className="text-base sm:text-lg text-charcoal text-justify leading-relaxed">
            At Geetanjali Furniture, we believe your home should reflect your
            personality. That’s why we offer furniture that’s not only stylish
            and durable, but also comfortable and affordable. From modest
            beginnings, we've earned the community’s trust through consistent
            quality and service.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-6">
            Why Choose Us?
          </h2>
          <ul className="text-charcoal text-base sm:text-lg space-y-4 list-disc pl-5 leading-relaxed">
            <li>
              <strong>Extensive Collection:</strong> From modern minimalism to
              timeless classics.
            </li>
            <li>
              <strong>Customization:</strong> Tailored sizes, finishes, and
              styles to fit your needs.
            </li>
            <li>
              <strong>All-in-One Store:</strong> Furniture, décor, and kitchen
              solutions.
            </li>
            <li>
              <strong>Affordable Pricing:</strong> Honest value with seasonal
              offers.
            </li>
            <li>
              <strong>Timely Delivery:</strong> Reliable, careful shipping every
              time.
            </li>
            <li>
              <strong>After-Sales Support:</strong> We're here for you, even
              after your purchase.
            </li>
            <li>
              <strong>Sustainable Craftsmanship:</strong> Built with
              eco-friendly materials and processes.
            </li>
          </ul>
        </section>

        {/* Mission */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-4">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-charcoal text-justify leading-relaxed">
            To deliver high-quality, stylish, and affordable furniture that
            elevates your living experience. We aim to blend innovation with
            traditional craftsmanship — with a deep focus on sustainability.
          </p>
        </section>

        {/* Vision */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan text-center mb-4">
            Our Vision
          </h2>
          <p className="text-base sm:text-lg text-charcoal text-justify leading-relaxed">
            Whether furnishing your first home or updating your space, our goal
            is to make your journey comfortable and stylish. Explore comfort.
            Explore style. Explore Geetanjali.
          </p>
        </section>

        {/* Contact Info */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 text-center hover:shadow-lg transition duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-peach-tan mb-2">
            📍 Visit Us
          </h2>
          <p className="text-base sm:text-lg text-charcoal leading-relaxed">
            Shop No. 1 & 2, Shree Manav Siva Vikas Mandal, Near I.T.I., New RTO
            Road, Vastral – 382418
          </p>

          <h3 className="text-lg sm:text-xl font-medium text-tan-dark mt-4">
            📞 Contact Us
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
