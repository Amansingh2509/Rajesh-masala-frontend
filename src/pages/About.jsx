import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About <span className="text-orange-500">Ansu Provisional</span>
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Your trusted destination for quality grocery products, wholesale
            supplies, and authentic Rajesh Masala.
          </p>
        </div>

        {/* Store Info */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Store</h2>

            <p className="text-gray-600 mb-4 leading-relaxed">
              <strong>Ansu Provisional</strong> is a trusted grocery and
              wholesale store known for providing high-quality provision items
              at affordable prices. We supply a wide variety of daily household
              groceries and essential products.
            </p>

            <p className="text-gray-600 mb-4 leading-relaxed">
              Our store proudly operates the
              <strong> Rajesh Masala Agency</strong>, providing authentic and
              premium quality masala products. Customers can find all varieties
              of Rajesh Masala along with many other spices that enhance the
              flavor of everyday cooking.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Whether you are a household customer or a business looking for
              wholesale grocery supply, Ansu Provisional is your trusted partner
              for quality and reliability.
            </p>
          </div>

          {/* Store Image */}
          <div className="flex justify-center">
            <img
              src="/images/store.jpg"
              alt="Ansu Provisional Store"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>

        {/* Founders Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Co-Founders
          </h2>

          <p className="text-gray-600">
            The vision behind Ansu Provisional is driven by passionate founders
            dedicated to delivering the best grocery experience to customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Founder 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
            <img
              src="/images/PHOTO-2026-03-13-21-50-35.jpg"
              alt="Rajnish Singh"
              className="w-52 h-52 mx-auto rounded-full object-cover mb-4 border-4 border-orange-400"
            />

            <div className="text-4xl mb-2">👨‍💼</div>

            <h3 className="text-xl font-bold text-gray-800">Rajnish Singh</h3>

            <p className="text-orange-500 font-semibold mb-2">Co-Founder</p>

            <p className="text-gray-600">
              Rajnish Singh plays a key role in managing the store operations
              and ensuring customers receive quality grocery products along with
              excellent service.
            </p>
          </div>

          {/* Founder 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
            <img
              src="/images/vikash.jpg"
              alt="Vikash Singh"
              className="w-52 h-52 mx-auto rounded-full object-cover mb-4 border-4 border-orange-400"
            />

            <div className="text-4xl mb-2">👨‍💼</div>

            <h3 className="text-xl font-bold text-gray-800">Vikash Singh</h3>

            <p className="text-orange-500 font-semibold mb-2">Co-Founder</p>

            <p className="text-gray-600">
              Vikash Singh focuses on expanding the business and strengthening
              the Rajesh Masala Agency while maintaining strong relationships
              with customers and suppliers.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20 bg-orange-500 text-white rounded-2xl p-10 text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-6">
            Why Choose Ansu Provisional?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl mb-2">🛒</div>
              <h3 className="font-semibold text-lg">All Grocery Items</h3>
              <p className="text-sm">
                Wide range of daily provision products available.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-2">🌶</div>
              <h3 className="font-semibold text-lg">Rajesh Masala Agency</h3>
              <p className="text-sm">
                Authentic and premium quality masala products.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-2">📦</div>
              <h3 className="font-semibold text-lg">Wholesale Supply</h3>
              <p className="text-sm">
                Best prices for bulk grocery and shop owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
