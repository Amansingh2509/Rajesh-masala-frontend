import React from "react";
import { useAuth } from "../context/AuthContext";

const UserHome = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome, {user?.fullname || "User"}!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your dashboard. View products and orders{" "}
          <a href="/products" className="text-blue-500 hover:underline">
            here
          </a>
          .
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className="bg-blue-50 p-8 rounded-xl text-center">
            <div className="text-4xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-2">Cart</h2>
            <p>
              <a href="/cart" className="text-blue-500 hover:underline">
                View Cart
              </a>
            </p>
          </div>
          <div className="bg-green-50 p-8 rounded-xl text-center">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-2xl font-bold mb-2">Orders</h2>
            <p>Your purchase history</p>
          </div>
          <div className="bg-purple-50 p-8 rounded-xl text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h2 className="text-2xl font-bold mb-2">Profile</h2>
            <p>{user?.email || "email@example.com"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
