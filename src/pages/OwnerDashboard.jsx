import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import CreateItemOwner from "../item-owner/createitemowner";

const OwnerDashboard = () => {
  const { owner } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8765/api/orders", {
        withCredentials: true,
      });

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Orders fetch error:", error);

      if (error.response?.status === 401) {
        console.log("Login as owner to view orders");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8765/api/orders/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true },
      );

      fetchOrders(); // refresh list
      alert(`Status updated to ${newStatus.toUpperCase()}`);
    } catch (error) {
      alert(
        "Update failed: " + (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Owner Dashboard - {owner?.fullname || "Owner"}
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            className={`px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transform transition-all duration-300 ${
              activeTab === "products"
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105 hover:shadow-2xl"
                : "bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 hover:shadow-lg"
            }`}
            onClick={() => setActiveTab("products")}
          >
            📦 Products
          </button>

          <button
            className={`px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transform transition-all duration-300 ${
              activeTab === "orders"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:scale-105 hover:shadow-2xl"
                : "bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 hover:shadow-lg"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            📋 Orders ({orders.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && <CreateItemOwner />}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <span className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                📋
              </span>
              Manage Orders
            </h2>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-xl text-gray-600">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20">
                <div className="mx-auto w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-4xl">📦</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  No Orders
                </h3>
                <p className="text-lg text-gray-600">
                  No orders yet. Start accepting orders!
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-gradient-to-r from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200 p-8 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          #{order._id.slice(-6)}
                        </h3>
                        <p className="text-gray-600">{order.userName}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-3xl font-bold text-emerald-600 mb-1">
                          ₹{order.totalAmount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-gray-700">
                        Items:
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-gray-50 rounded-xl border hover:bg-gray-100 transition"
                          >
                            <p className="font-semibold text-gray-800">
                              {item.productName}
                            </p>
                            <p className="text-sm text-gray-600">
                              x{item.quantity}
                            </p>
                            <p className="font-bold text-emerald-600">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status + Update */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-end items-center">
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : order.status === "not-available"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }`}
                      >
                        {order.status ? order.status.toUpperCase() : "PENDING"}
                      </div>

                      <select
                        value={order.status || "pending"}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          await updateStatus(order._id, newStatus);
                        }}
                        className="p-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 transition-all bg-white shadow-md hover:shadow-lg min-w-[160px]"
                      >
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered ✅</option>
                        <option value="not-available">Not Available ❌</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
