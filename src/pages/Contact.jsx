import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setError("All fields are required");
      return false;
    }

    if (!formData.email.includes("@")) {
      setError("Enter valid email");
      return false;
    }

    if (formData.phone.length < 10) {
      setError("Enter valid phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8765/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("✅ Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("❌ Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Get in touch for wholesale grocery & Rajesh Masala orders
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-lg border rounded-3xl shadow-2xl p-8 space-y-6 transition-all hover:shadow-orange-200"
        >
          {/* Success / Error */}
          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg animate-bounce">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg animate-shake">
              {error}
            </div>
          )}

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="👤 Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />

          {/* Email + Phone */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="📧 Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="tel"
              name="phone"
              placeholder="📞 Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            rows="5"
            placeholder="💬 Write your message..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl hover:scale-105 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? "Sending..." : "🚀 Send Message"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-600">
          <p className="font-semibold text-lg">🏪 Ansu Provisional Store</p>
          <p>Rajesh Masala Agency | Wholesale & Retail</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
