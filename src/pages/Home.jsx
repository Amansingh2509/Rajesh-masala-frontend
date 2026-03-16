import React from "react";
import Hero from "../components/Hero";

const Home = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8765/api/auth/google";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />

      <main className="container mx-auto px-4 py-20">
        {/* ABOUT */}
        <section className="text-center max-w-4xl mx-auto mb-24">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Welcome to Ansu Provisional
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            We provide all types of <strong>grocery and provision items</strong>
            . Our shop is also an authorized{" "}
            <strong>Rajesh Masala agency</strong>. If you want products in bulk
            we also provide <strong>wholesale supply</strong> for shops and
            businesses.
          </p>
        </section>

        {/* SERVICES */}
        <section className="grid md:grid-cols-3 gap-10 mb-24">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-xl font-bold mb-3">Provision Store</h3>
            <p className="text-gray-600">
              All daily grocery items available in one place with best quality.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
            <div className="text-5xl mb-4">🌶</div>
            <h3 className="text-xl font-bold mb-3">Rajesh Masala Products</h3>
            <p className="text-gray-600">
              Premium quality spices from Rajesh Masala available here.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-3">Wholesale Supply</h3>
            <p className="text-gray-600">
              Bulk supply available for shops and retailers.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section className="text-center py-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Contact Ansu Provisional</h2>

          <p className="text-gray-600 mb-10">
            Want grocery items or wholesale masala products? Contact us directly
            on WhatsApp.
          </p>

          <a
            href="https://wa.me/917667816204"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition"
          >
            💬 Chat on WhatsApp
          </a>
        </section>
      </main>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="fixed bottom-24 right-6 bg-white border border-gray-300 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition hover:bg-gray-50 text-sm font-medium z-50"
      >
        🚀 Login with Google
      </button>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/917667816204"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 w-16 h-16 flex items-center justify-center rounded-full text-white text-3xl shadow-lg hover:bg-green-600"
      >
        💬
      </a>
    </div>
  );
};

export default Home;
