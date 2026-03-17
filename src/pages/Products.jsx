import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Products = () => {
  const { user, owner } = useAuth();
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, item: "" });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8765/api/items/getitems",
        );
        setItems(response.data.items || []);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ show: false, item: "" }), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // quantity change
  const changeQuantity = (id, type) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;

      if (type === "inc") {
        return { ...prev, [id]: current + 1 };
      }

      if (type === "dec") {
        return { ...prev, [id]: current > 1 ? current - 1 : 1 };
      }

      return prev;
    });
  };

  // add to cart
  const handleAddToCart = (item) => {
    const qty = quantities[item._id] || 1;

    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);

      const newCart = existing
        ? prev.map((i) =>
            i._id === item._id ? { ...i, quantity: i.quantity + qty } : i,
          )
        : [...prev, { ...item, quantity: qty }];

      localStorage.setItem("cart", JSON.stringify(newCart));
      setToast({ show: true, item: item.name });

      return newCart;
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading products...
      </div>
    );

  if (!user && !owner) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Products</h1>
        <p className="text-xl mb-8">Please login to view products</p>
        <a
          href="/user/login"
          className="bg-blue-500 text-white px-8 py-3 rounded-xl hover:bg-blue-600 font-bold"
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Toast */}
      {toast.show && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl">
          🛒 {toast.item} added to cart!
        </div>
      )}

      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Products ({items.length})</h1>

        {cart.length > 0 && (
          <a
            href="/cart"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
          >
            Cart ({cart.length})
          </a>
        )}
      </div>

      {error && <div className="text-red-500 text-center mb-8">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6"
          >
            <img
              src={
                item.image || "https://via.placeholder.com/300?text=No+Image"
              }
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>

            <p className="text-gray-600 mb-4">{item.description}</p>

            <span className="text-2xl font-bold text-red-600">
              ₹{item.price}
            </span>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => changeQuantity(item._id, "dec")}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>

              <span className="font-semibold">{quantities[item._id] || 1}</span>

              <button
                onClick={() => changeQuantity(item._id, "inc")}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => handleAddToCart(item)}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Add to Cart
            </button>

            <p className="text-xs text-gray-500 mt-2">
              By {item.owner?.fullname || "Owner"}
            </p>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-2">No products yet</h2>
          <p>Login as owner to add items.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
