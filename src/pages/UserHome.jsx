import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const UserHome = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:8765";

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchOrders();
    }
  }, [isAuthenticated, user]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/api/orders/my`, {
        withCredentials: true,
      });
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <h1>Please login</h1>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/ansuprovisonal.jpg')] bg-cover bg-center opacity-10"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">
            Welcome back!
            <br />
            <span className="text-4xl">{user.fullname}</span>
          </h1>

          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Your dashboard is ready. Browse fresh masala, place orders, track
            history.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              to="/products"
              className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">
                🛍️
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Shop Products
              </h3>
              <p className="text-gray-600">Fresh masala & grocery</p>
            </Link>

            <a
              href="#orders"
              className="group bg-gradient-to-br from-emerald-500 to-green-600 p-8 rounded-3xl shadow-xl hover:shadow-2xl text-white transition-all duration-500 hover:-translate-y-2 hover:scale-105"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">
                📦
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {orders.length} Orders
              </h3>
              <p>Track your purchases</p>
            </a>

            <Link
              to="/about"
              className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">
                ⚙️
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Settings
              </h3>
              <p className="text-gray-600">Profile & security</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div id="orders" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Your Order History
          </h2>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-xl text-gray-600">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto w-32 h-32 bg-gray-100 rounded-3xl flex flex-col items-center justify-center mb-6">
                <div className="text-5xl mb-2">📦</div>
                <p className="text-sm text-gray-500">No orders</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Orders Yet
              </h3>

              <p className="text-lg text-gray-600 mb-8">
                Start shopping to see your orders here.
              </p>

              <Link
                to="/products"
                className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                🛍️ Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-8"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        Order #{order._id.slice(-6)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium">{item.productName}</span>
                        <span className="font-bold text-emerald-600">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                    <span className="text-xl font-bold text-gray-800">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-emerald-600">
                      ₹{order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserHome;
