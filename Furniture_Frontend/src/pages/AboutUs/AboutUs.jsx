import React from "react";
import { Helmet } from "react-helmet";

function AboutUs() {
  return (
    <main className="bg-[#FFE8D6] pt-24 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto text-[#3F4238]">
      {/* SEO */}
      <Helmet>
        <title>About Us | Geetanjali Furniture</title>
        <meta
          name="description"
          content="Learn about Geetanjali Furniture, a trusted name in stylish and affordable furniture for over 15 years in Vastral. Discover our mission, values, and why customers love us."
        />
      </Helmet>

      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#B98B73] mb-2">
          About Us
        </h1>
        <p className="text-lg sm:text-xl text-[#6B705C] font-medium">
          Welcome to Geetanjali Furniture – Crafting Comfort, Creating Style.
        </p>
      </header>

      {/* Content Sections */}
      <div className="space-y-12">
        {/* Company Introduction */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition">
          <p className="text-base sm:text-lg leading-relaxed text-justify text-[#3F4238]">
            Located at Shop No. 1 & 2, Shree Manav Siva Vikas Mandal, near
            I.T.I., New RTO Road, Vastral – 382418, Geetanjali Furniture has
            proudly served the community for over 15 years. We are known for
            quality craftsmanship, affordability, and unwavering customer
            satisfaction.
          </p>
        </section>

        {/* Legacy */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#CB997E] text-center mb-4">
            A Legacy of Trust and Quality
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-justify text-[#3F4238]">
            At Geetanjali Furniture, we believe your home should reflect your
            personality. That’s why we offer furniture that’s not only stylish
            and durable, but also comfortable and affordable. From modest
            beginnings, we've earned the community’s trust through consistent
            quality and service.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#CB997E] text-center mb-6">
            Why Choose Us?
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-base sm:text-lg text-[#3F4238] leading-relaxed">
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
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#CB997E] text-center mb-4">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-justify text-[#3F4238]">
            To deliver high-quality, stylish, and affordable furniture that
            elevates your living experience. We aim to blend innovation with
            traditional craftsmanship — with a deep focus on sustainability.
          </p>
        </section>

        {/* Vision */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 hover:shadow-lg transition">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#CB997E] text-center mb-4">
            Our Vision
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-justify text-[#3F4238]">
            Whether furnishing your first home or updating your space, our goal
            is to make your journey comfortable and stylish. Explore comfort.
            Explore style. Explore Geetanjali.
          </p>
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-10 text-center hover:shadow-lg transition">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#CB997E] mb-4">
            📍 Visit Us
          </h2>
          <p className="text-base sm:text-lg text-[#3F4238] leading-relaxed">
            Shop No. 1 & 2, Shree Manav Siva Vikas Mandal, Near I.T.I., New RTO
            Road, Vastral – 382418
          </p>

          <h3 className="text-lg sm:text-xl font-medium text-[#6B705C] mt-6">
            📞 Contact Us
          </h3>
          <p>
            <a
              href="tel:+919662199989"
              className="text-[#6B705C] underline hover:text-[#CB997E] transition"
            >
              +91 96621 99989
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}

export default AboutUs;
