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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex gap-4 mb-8">
        <h1
          className={`text-2xl font-bold p-3 rounded-xl cursor-pointer ${activeTab === "products" ? "bg-orange-500 text-white" : "bg-gray-100"}`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </h1>
        <h1
          className={`text-2xl font-bold p-3 rounded-xl cursor-pointer ${activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => setActiveTab("orders")}
        >
          Orders ({orders.length})
        </h1>
      </div>

      {activeTab === "products" && <CreateItemOwner />}

      {activeTab === "orders" && (
        <div className="bg-white shadow-2xl rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-6">Recent Orders</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <div className="space-y-4 overflow-x-auto">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-xl p-6 hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{order.userName}</h3>
                      <p className="text-gray-600">
                        Order #{order._id.slice(-6)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        ₹{order.totalAmount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-semibold">{item.productName}</p>
                        <p>
                          x{item.quantity} - ₹
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
