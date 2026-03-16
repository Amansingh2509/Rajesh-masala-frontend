import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CreateItemOwner = () => {
  const { owner } = useAuth();

  const [ownItems, setOwnItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch Owner Items (public getitems)
  const fetchOwnItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8765/api/items/getitems",
        { withCredentials: true },
      );
      setOwnItems(response.data.items || []);
    } catch (err) {
      console.error("Items error:", err);
    }
  };

  // Fetch ALL Items from DB
  const fetchAllItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8765/api/items/getitems",
        { withCredentials: true },
      );
      setAllItems(response.data.items || []);
    } catch (err) {
      console.error("All items error:", err);
    }
  };

  // Get unique categories for dropdown
  const uniqueCategories = [
    ...new Set(allItems.map((item) => item.category).filter(Boolean)),
  ];

  useEffect(() => {
    fetchOwnItems();
    fetchAllItems();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Edit Item
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      price: item.price,
      category: item.category || "",
      image: null,
    });
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });
  };

  // Update Item
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (formData.image) data.append("image", formData.image);

      await axios.put(
        `http://localhost:8765/api/items/${editingItem._id}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      await fetchOwnItems();
      await fetchAllItems();
      setSuccess("Item updated successfully!");
      handleCancelEdit();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Delete Item
  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await axios.delete(`http://localhost:8765/api/items/${id}`, {
        withCredentials: true,
      });
      await fetchOwnItems();
      await fetchAllItems();
      setSuccess("Item deleted!");
    } catch (err) {
      setError("Delete failed");
    }
  };

  // Submit Item (create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (formData.image) data.append("image", formData.image);

      await axios.post("http://localhost:8765/api/items", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchOwnItems();
      await fetchAllItems();
      setSuccess("Item created! Dashboard updated.");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create item");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Group Products by Category
  const groupedOwnProducts = ownItems.reduce((acc, item) => {
    const cat = item.category || "Uncategorized";
    acc[cat] = acc[cat] || [];
    acc[cat].push(item);
    return acc;
  }, {});

  const totalOwnCategories = Object.keys(groupedOwnProducts).length;
  const totalOwnItems = ownItems.length;
  const totalDatabaseItems = allItems.length;

  const latestProduct = ownItems[0] || null;

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Owner Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your products, {owner?.fullname || "Owner"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-xl rounded-2xl p-6">
          <p className="text-white/80 text-sm">Your Products</p>
          <h2 className="text-3xl font-bold mt-1">{totalOwnItems}</h2>
        </div>
        <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 text-white shadow-xl rounded-2xl p-6">
          <p className="text-white/80 text-sm">Database Total</p>
          <h2 className="text-3xl font-bold mt-1">{totalDatabaseItems}</h2>
        </div>
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-xl rounded-2xl p-6">
          <p className="text-white/80 text-sm">Categories</p>
          <h2 className="text-3xl font-bold mt-1">{totalOwnCategories}</h2>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-green-500 text-white shadow-xl rounded-2xl p-6">
          <p className="text-white/80 text-sm">Latest Product</p>
          {latestProduct ? (
            <>
              <h3 className="text-lg font-semibold">{latestProduct.name}</h3>
              <p className="text-sm">₹{latestProduct.price}</p>
            </>
          ) : (
            <p className="text-sm">No products</p>
          )}
        </div>
      </div>

      {/* Categories Breakdown */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-4">Products by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(groupedOwnProducts).map(([category, items]) => (
            <div
              key={category}
              className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-orange-500 hover:shadow-xl"
            >
              <h4 className="font-bold text-xl mb-2 capitalize">{category}</h4>
              <p className="text-3xl font-bold text-orange-600">
                {items.length}
              </p>
              <p className="text-sm text-gray-500 mt-1">items</p>
              <div className="mt-3 space-y-1 max-h-32 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-sm py-1 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 px-2 rounded"
                  >
                    {item.name} - ₹{item.price}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form - Create or Edit */}
      <div className="bg-white shadow-2xl rounded-3xl p-8 mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          {editingItem ? "Edit Product" : "Add New Product"}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6">
            {success}
          </div>
        )}

        <form
          onSubmit={editingItem ? handleUpdate : handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            name="name"
            type="text"
            placeholder="Product Name *"
            className="border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price (₹) *"
            className="border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            className="md:col-span-2 border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="category"
            className="border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category *</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="rice">Rice</option>
            <option value="pulses">Pulses</option>
            <option value="spices">Spices</option>
            <option value="ghee">Ghee & Oils</option>
            <option value="other">Other</option>
          </select>

          <input
            type="file"
            name="image"
            accept="image/*"
            className="md:col-span-2 border border-gray-300 px-4 py-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            onChange={handleChange}
          />

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={submitLoading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 shadow-xl"
            >
              {submitLoading
                ? "Saving..."
                : editingItem
                  ? "Update Product"
                  : "Create Product"}
            </button>

            {editingItem && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products List with CRUD */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Your Products ({totalOwnItems})
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ownItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl hover:shadow-xl transition-all p-6 border"
            >
              <div className="h-32 w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">📦</span>
                )}
              </div>
              <h4 className="font-bold text-lg mb-1">{item.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-green-600">
                  ₹{item.price}
                </span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {ownItems.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl mb-4">📦</span>
            <h3 className="text-2xl font-bold mb-2">No products yet</h3>
            <p className="text-gray-600">Create your first product above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateItemOwner;
