import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Load cart
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Remove item
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item._id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          }
        : item,
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );

  // Place order
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (loading || !user) {
      alert("Please login first");
      navigate("/user/login");
      return;
    }

    try {
      const orderItems = cart.map((item) => ({
        productName: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity || 1,
      }));

      const response = await axios.post(
        "http://localhost:8765/api/orders",
        { items: orderItems },
        { withCredentials: true },
      );

      setOrderSuccess({
        orderId: response.data.orderId,
        total: totalPrice,
      });

      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      alert(
        "Order failed: " + (error.response?.data?.message || error.message),
      );
    }
  };

  // Success screen
  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 px-4 py-20">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 text-center transform scale-105">
          <div className="text-8xl mb-6 mx-auto w-24 h-24 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
            ✅
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Placed Successfully! 🎉
          </h1>

          <p className="text-xl text-green-700 mb-2 font-semibold">
            Order ID: #{orderSuccess.orderId.slice(-6).toUpperCase()}
          </p>

          <p className="text-lg text-gray-700 mb-8">
            🛒 Your order is confirmed! Owner will respond soon.
          </p>

          <p className="text-2xl font-bold text-emerald-600 mb-8">
            Total: ₹{orderSuccess.total.toFixed(2)}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/products")}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-semibold"
            >
              Continue Shopping 🛒
            </button>

            <button
              onClick={() => setOrderSuccess(null)}
              className="w-full bg-gray-500 text-white py-4 rounded-2xl font-semibold"
            >
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main cart UI
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Shopping Cart ({cart.length})
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>

            <button
              onClick={() => navigate("/products")}
              className="bg-orange-500 text-white px-8 py-4 rounded-2xl"
            >
              Start Shopping 🚀
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-6 mb-12">
              {cart.map((item) => (
                <div key={item._id} className="bg-white p-6 rounded-2xl shadow">
                  <h3 className="text-xl font-bold">{item.name}</h3>

                  <div className="flex gap-4 items-center my-3">
                    <button onClick={() => decreaseQty(item._id)}>−</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => increaseQty(item._id)}>+</button>
                  </div>

                  <p className="text-lg text-emerald-600 font-bold">
                    ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-white p-8 rounded-2xl shadow">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Order Total</h2>
                <p className="text-2xl font-bold text-emerald-600">
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>

              <button
                onClick={placeOrder}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl text-xl font-bold"
              >
                Place Order 🚀
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
