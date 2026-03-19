import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CreateItemOwner = () => {
  const { owner } = useAuth();

  const [ownItems, setOwnItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [searchItems, setSearchItems] = useState("");

  const fetchOwnItems = async () => {
    try {
      const r = await axios.get("http://localhost:8765/api/items/getitems", {
        withCredentials: true,
      });
      setOwnItems(r.data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllItems = async () => {
    try {
      const r = await axios.get("http://localhost:8765/api/items/getitems", {
        withCredentials: true,
      });
      setAllItems(r.data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  const uniqueCategories = [
    ...new Set(allItems.map((i) => i.category).filter(Boolean)),
  ];

  useEffect(() => {
    fetchOwnItems();
    fetchAllItems();
  }, []);

  useEffect(() => {
    if (success || error) {
      const t = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [success, error]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      price: item.price,
      category: item.category || "",
      image: null,
    });
    setImagePreview(item.image || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });
    setImagePreview(null);
  };

  const buildFormData = () => {
    const d = new FormData();
    d.append("name", formData.name);
    d.append("description", formData.description);
    d.append("price", formData.price);
    d.append("category", formData.category);
    if (formData.image) d.append("image", formData.image);
    return d;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await axios.put(
        `http://localhost:8765/api/items/${editingItem._id}`,
        buildFormData(),
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      await fetchOwnItems();
      await fetchAllItems();
      setSuccess("Product updated successfully!");
      handleCancelEdit();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8765/api/items/${id}`, {
        withCredentials: true,
      });
      await fetchOwnItems();
      await fetchAllItems();
      setSuccess("Product deleted.");
    } catch {
      setError("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitLoading(true);
    try {
      await axios.post("http://localhost:8765/api/items", buildFormData(), {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchOwnItems();
      await fetchAllItems();
      setSuccess("Product created!");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
      });
      setImagePreview(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setSubmitLoading(false);
    }
  };

  const groupedProducts = ownItems.reduce((acc, item) => {
    const cat = item.category || "Uncategorized";
    acc[cat] = acc[cat] || [];
    acc[cat].push(item);
    return acc;
  }, {});

  const filteredItems = ownItems.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchItems.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchItems.toLowerCase()),
  );

  const totalOwnCategories = Object.keys(groupedProducts).length;

  return (
    <>
      <style>{styles}</style>
      <div className="ci-root">
        {/* ── Alert Toast ── */}
        {(success || error) && (
          <div
            className={`ci-toast ${error ? "ci-toast-error" : "ci-toast-success"}`}
          >
            <span>{error ? "⚠" : "✓"}</span>
            <span>{error || success}</span>
          </div>
        )}

        {/* ── Stats Row ── */}
        <div className="ci-stats">
          <div className="ci-stat ci-stat-spice">
            <span className="ci-stat-icon">📦</span>
            <span className="ci-stat-val">{ownItems.length}</span>
            <span className="ci-stat-label">Your Products</span>
          </div>
          <div className="ci-stat ci-stat-blue">
            <span className="ci-stat-icon">🗄️</span>
            <span className="ci-stat-val">{allItems.length}</span>
            <span className="ci-stat-label">Database Total</span>
          </div>
          <div className="ci-stat ci-stat-indigo">
            <span className="ci-stat-icon">🏷️</span>
            <span className="ci-stat-val">{totalOwnCategories}</span>
            <span className="ci-stat-label">Categories</span>
          </div>
          <div className="ci-stat ci-stat-green">
            <span className="ci-stat-icon">🆕</span>
            <span className="ci-stat-val ci-stat-val-sm">
              {ownItems[0]?.name || "—"}
            </span>
            <span className="ci-stat-label">
              Latest · ₹{ownItems[0]?.price || "—"}
            </span>
          </div>
        </div>

        {/* ── Category Breakdown ── */}
        {Object.keys(groupedProducts).length > 0 && (
          <div className="ci-section">
            <div className="ci-section-header">
              <h3 className="ci-section-title">Products by Category</h3>
            </div>
            <div className="ci-cat-grid">
              {Object.entries(groupedProducts).map(([cat, items]) => (
                <div key={cat} className="ci-cat-card">
                  <div className="ci-cat-top">
                    <span className="ci-cat-name">{cat}</span>
                    <span className="ci-cat-count">{items.length}</span>
                  </div>
                  <div className="ci-cat-items">
                    {items.map((item, i) => (
                      <div key={i} className="ci-cat-item-row">
                        <span className="ci-cat-item-dot" />
                        <span className="ci-cat-item-name">{item.name}</span>
                        <span className="ci-cat-item-price">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Form ── */}
        <div className="ci-section">
          <div className="ci-form-card">
            <div className="ci-form-header">
              <div>
                <div className="ci-form-pill">
                  {editingItem ? "Editing" : "New Product"}
                </div>
                <h2 className="ci-form-title">
                  {editingItem ? `Edit: ${editingItem.name}` : "Add a Product"}
                </h2>
              </div>
              {editingItem && (
                <button className="ci-cancel-btn" onClick={handleCancelEdit}>
                  ✕ Cancel Edit
                </button>
              )}
            </div>

            <form
              onSubmit={editingItem ? handleUpdate : handleSubmit}
              className="ci-form"
            >
              <div className="ci-form-grid">
                {/* Name */}
                <div className="ci-field">
                  <label className="ci-label">Product Name *</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="e.g. Basmati Rice"
                    className="ci-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Price */}
                <div className="ci-field">
                  <label className="ci-label">Price (₹) *</label>
                  <div className="ci-prefix-wrap">
                    <span className="ci-prefix">₹</span>
                    <input
                      name="price"
                      type="number"
                      placeholder="0"
                      className="ci-input ci-input-prefix"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="ci-field ci-field-full">
                  <label className="ci-label">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    placeholder="Short product description…"
                    className="ci-input ci-textarea"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Category */}
                <div className="ci-field">
                  <label className="ci-label">Category *</label>
                  <select
                    name="category"
                    className="ci-input ci-select"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
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
                </div>

                {/* Image upload */}
                <div className="ci-field">
                  <label className="ci-label">Product Image</label>
                  <label className="ci-file-label">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="ci-file-hidden"
                      onChange={handleChange}
                    />
                    <span className="ci-file-btn">📁 Choose Image</span>
                    <span className="ci-file-hint">
                      {formData.image ? formData.image.name : "No file chosen"}
                    </span>
                  </label>
                </div>

                {/* Image preview */}
                {imagePreview && (
                  <div className="ci-field ci-field-full">
                    <label className="ci-label">Preview</label>
                    <div className="ci-preview-wrap">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="ci-preview-img"
                      />
                      <button
                        type="button"
                        className="ci-preview-remove"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData({ ...formData, image: null });
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="ci-form-actions">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="ci-submit-btn"
                >
                  {submitLoading ? (
                    <>
                      <span className="ci-btn-spinner" />{" "}
                      {editingItem ? "Updating…" : "Creating…"}
                    </>
                  ) : editingItem ? (
                    "✓ Update Product"
                  ) : (
                    "+ Create Product"
                  )}
                </button>
                {editingItem && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="ci-ghost-btn"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* ── Products List ── */}
        <div className="ci-section">
          <div className="ci-section-header">
            <div>
              <h3 className="ci-section-title">Your Products</h3>
              <p className="ci-section-sub">
                {ownItems.length} products in catalogue
              </p>
            </div>
            {/* Search */}
            <div className="ci-search-box">
              <svg
                className="ci-search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="ci-search-input"
                placeholder="Search by name or category…"
                value={searchItems}
                onChange={(e) => setSearchItems(e.target.value)}
              />
              {searchItems && (
                <button
                  className="ci-search-clear"
                  onClick={() => setSearchItems("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="ci-empty">
              <div className="ci-empty-icon">{searchItems ? "🔍" : "📦"}</div>
              <h4 className="ci-empty-title">
                {searchItems
                  ? `No results for "${searchItems}"`
                  : "No products yet"}
              </h4>
              <p className="ci-empty-sub">
                {searchItems
                  ? "Try a different keyword."
                  : "Use the form above to add your first product."}
              </p>
            </div>
          ) : (
            <div className="ci-products-grid">
              {filteredItems.map((item, idx) => (
                <div
                  key={item._id}
                  className="ci-product-card"
                  style={{ animationDelay: `${idx * 35}ms` }}
                >
                  <div className="ci-product-img-wrap">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="ci-product-img"
                      />
                    ) : (
                      <div className="ci-product-img-fallback">📦</div>
                    )}
                    {item.category && (
                      <span className="ci-product-cat-tag">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <div className="ci-product-body">
                    <h4 className="ci-product-name">{item.name}</h4>
                    {item.description && (
                      <p className="ci-product-desc">{item.description}</p>
                    )}
                    <div className="ci-product-price">₹{item.price}</div>
                    <div className="ci-product-actions">
                      <button
                        onClick={() => handleEdit(item)}
                        className="ci-edit-btn"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="ci-delete-btn"
                      >
                        🗑️ Delete
                      </button>
                    </div>
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

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --spice:    #f97316;
    --spice-dk: #c2410c;
    --spice-lt: #fff7ed;
    --green:    #16a34a;
    --green-lt: #f0fdf4;
    --blue:     #2563eb;
    --blue-lt:  #eff6ff;
    --indigo:   #4f46e5;
    --indigo-lt:#eef2ff;
    --red:      #dc2626;
    --red-lt:   #fef2f2;
    --gray-900: #111827;
    --gray-700: #374151;
    --gray-600: #4b5563;
    --gray-400: #9ca3af;
    --gray-200: #e5e7eb;
    --gray-100: #f3f4f6;
    --gray-50:  #f9fafb;
    --white:    #ffffff;
    --font-d: 'Playfair Display', Georgia, serif;
    --font-b: 'DM Sans', system-ui, sans-serif;
    --tr: all 0.22s cubic-bezier(0.4,0,0.2,1);
    --shadow: 0 2px 16px rgba(0,0,0,0.07);
    --shadow-h: 0 8px 28px rgba(0,0,0,0.12);
    --r-xl: 20px; --r-lg: 14px; --r-md: 10px;
  }

  .ci-root { font-family: var(--font-b); display: flex; flex-direction: column; gap: 28px; }

  /* Toast */
  .ci-toast {
    position: fixed; top: 72px; right: 24px; z-index: 999;
    display: flex; align-items: center; gap: 10px;
    font-size: 0.875rem; font-weight: 500; padding: 12px 20px;
    border-radius: var(--r-lg); box-shadow: var(--shadow-h);
    animation: ci-fade-in 0.3s ease;
  }
  @keyframes ci-fade-in { from { opacity:0; transform: translateY(-6px); } to { opacity:1; transform: none; } }
  .ci-toast-success { background: var(--green-lt); color: var(--green); border: 1px solid #bbf7d0; }
  .ci-toast-error   { background: var(--red-lt);   color: var(--red);   border: 1px solid #fecaca; }

  /* Stats */
  .ci-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .ci-stat {
    border-radius: var(--r-xl); padding: 20px;
    display: flex; flex-direction: column; gap: 4px;
    border: 1px solid transparent;
  }
  .ci-stat-spice  { background: var(--spice-lt);  border-color: #fed7aa; }
  .ci-stat-blue   { background: var(--blue-lt);   border-color: #bfdbfe; }
  .ci-stat-indigo { background: var(--indigo-lt); border-color: #c7d2fe; }
  .ci-stat-green  { background: var(--green-lt);  border-color: #bbf7d0; }
  .ci-stat-icon   { font-size: 1.3rem; margin-bottom: 4px; }
  .ci-stat-val    { font-family: var(--font-d); font-size: 1.7rem; color: var(--gray-900); line-height: 1.1; }
  .ci-stat-val-sm { font-size: 1rem; }
  .ci-stat-label  { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.07em; color: var(--gray-400); font-weight: 600; }

  /* Sections */
  .ci-section { display: flex; flex-direction: column; gap: 16px; }
  .ci-section-header {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; flex-wrap: wrap;
  }
  .ci-section-title {
    font-family: var(--font-d); font-size: 1.3rem;
    color: var(--gray-900); margin: 0; letter-spacing: -0.01em;
  }
  .ci-section-sub { font-size: 0.8rem; color: var(--gray-400); margin-top: 2px; font-weight: 300; }

  /* Category grid */
  .ci-cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
  .ci-cat-card {
    background: var(--white); border: 1px solid var(--gray-200);
    border-left: 4px solid var(--spice); border-radius: var(--r-lg);
    padding: 18px; box-shadow: var(--shadow); transition: var(--tr);
  }
  .ci-cat-card:hover { box-shadow: var(--shadow-h); }
  .ci-cat-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .ci-cat-name { font-weight: 600; font-size: 0.9rem; color: var(--gray-900); text-transform: capitalize; }
  .ci-cat-count {
    font-family: var(--font-d); font-size: 1.4rem; color: var(--spice); line-height: 1;
  }
  .ci-cat-items { display: flex; flex-direction: column; gap: 4px; max-height: 130px; overflow-y: auto; }
  .ci-cat-item-row { display: flex; align-items: center; gap: 8px; padding: 4px 0; border-bottom: 1px solid var(--gray-100); }
  .ci-cat-item-row:last-child { border-bottom: none; }
  .ci-cat-item-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--spice); flex-shrink: 0; }
  .ci-cat-item-name { font-size: 0.8rem; color: var(--gray-700); flex: 1; }
  .ci-cat-item-price { font-size: 0.78rem; font-weight: 600; color: var(--green); }

  /* Form card */
  .ci-form-card {
    background: var(--white); border: 1px solid var(--gray-200);
    border-radius: var(--r-xl); padding: 32px; box-shadow: var(--shadow);
  }
  .ci-form-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 12px; margin-bottom: 28px; padding-bottom: 20px;
    border-bottom: 1px solid var(--gray-100);
  }
  .ci-form-pill {
    display: inline-block; font-size: 0.68rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--spice-dk); background: var(--spice-lt);
    border: 1px solid #fed7aa; border-radius: 100px; padding: 4px 13px; margin-bottom: 8px;
  }
  .ci-form-title { font-family: var(--font-d); font-size: 1.35rem; color: var(--gray-900); margin: 0; }
  .ci-cancel-btn {
    font-family: var(--font-b); font-size: 0.8rem; font-weight: 600;
    color: var(--gray-400); background: var(--gray-100); border: none;
    padding: 8px 16px; border-radius: var(--r-md); cursor: pointer; transition: var(--tr);
    white-space: nowrap;
  }
  .ci-cancel-btn:hover { color: var(--red); background: var(--red-lt); }

  /* Form fields */
  .ci-form { display: flex; flex-direction: column; gap: 20px; }
  .ci-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .ci-field { display: flex; flex-direction: column; gap: 6px; }
  .ci-field-full { grid-column: 1 / -1; }
  .ci-label {
    font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.06em; color: var(--gray-600);
  }
  .ci-input {
    padding: 11px 14px; border: 1.5px solid var(--gray-200);
    border-radius: var(--r-md); font-family: var(--font-b); font-size: 0.875rem;
    color: var(--gray-900); background: var(--gray-50); outline: none; transition: var(--tr);
    width: 100%; box-sizing: border-box;
  }
  .ci-input:focus { border-color: var(--spice); background: var(--white); box-shadow: 0 0 0 3px rgba(249,115,22,0.1); }
  .ci-input::placeholder { color: var(--gray-400); }
  .ci-textarea { resize: vertical; min-height: 80px; }
  .ci-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center; padding-right: 34px;
  }

  /* Price prefix */
  .ci-prefix-wrap { position: relative; display: flex; align-items: center; }
  .ci-prefix {
    position: absolute; left: 14px; font-size: 0.9rem; font-weight: 600;
    color: var(--gray-400); pointer-events: none;
  }
  .ci-input-prefix { padding-left: 28px; }

  /* File input */
  .ci-file-label { display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .ci-file-hidden { display: none; }
  .ci-file-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--gray-100); border: 1.5px solid var(--gray-200);
    color: var(--gray-700); font-size: 0.825rem; font-weight: 600;
    padding: 9px 16px; border-radius: var(--r-md); transition: var(--tr); white-space: nowrap;
    font-family: var(--font-b);
  }
  .ci-file-label:hover .ci-file-btn { border-color: var(--spice); color: var(--spice); }
  .ci-file-hint { font-size: 0.8rem; color: var(--gray-400); font-weight: 300; }

  /* Image preview */
  .ci-preview-wrap { position: relative; width: 160px; }
  .ci-preview-img { width: 160px; height: 120px; object-fit: cover; border-radius: var(--r-md); border: 1px solid var(--gray-200); }
  .ci-preview-remove {
    position: absolute; top: -8px; right: -8px; width: 24px; height: 24px;
    background: var(--red); color: var(--white); border: none; border-radius: 50%;
    font-size: 0.65rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
  }

  /* Form actions */
  .ci-form-actions { display: flex; gap: 12px; }
  .ci-submit-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    flex: 1; padding: 13px; background: linear-gradient(135deg, var(--spice), var(--spice-dk));
    color: var(--white); border: none; border-radius: var(--r-md); font-family: var(--font-b);
    font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: var(--tr);
    box-shadow: 0 2px 12px rgba(249,115,22,0.3);
  }
  .ci-submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(249,115,22,0.4); }
  .ci-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .ci-ghost-btn {
    font-family: var(--font-b); font-size: 0.875rem; font-weight: 600; color: var(--gray-600);
    background: var(--gray-100); border: none; padding: 13px 24px; border-radius: var(--r-md);
    cursor: pointer; transition: var(--tr);
  }
  .ci-ghost-btn:hover { background: var(--gray-200); }
  .ci-btn-spinner {
    width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff; border-radius: 50%; animation: ci-spin 0.7s linear infinite;
  }
  @keyframes ci-spin { to { transform: rotate(360deg); } }

  /* Search */
  .ci-search-box {
    display: flex; align-items: center; background: var(--gray-50);
    border: 1.5px solid var(--gray-200); border-radius: var(--r-md); transition: var(--tr);
    min-width: 240px;
  }
  .ci-search-box:focus-within { border-color: var(--spice); background: var(--white); box-shadow: 0 0 0 3px rgba(249,115,22,0.1); }
  .ci-search-icon { width: 15px; height: 15px; color: var(--gray-400); margin: 0 10px; flex-shrink: 0; transition: color 0.2s; }
  .ci-search-box:focus-within .ci-search-icon { color: var(--spice); }
  .ci-search-input { flex: 1; padding: 9px 0; border: none; background: transparent; font-family: var(--font-b); font-size: 0.875rem; color: var(--gray-900); outline: none; }
  .ci-search-input::placeholder { color: var(--gray-400); font-weight: 300; }
  .ci-search-clear {
    width: 24px; height: 24px; margin-right: 8px; background: var(--gray-200); border: none;
    border-radius: 50%; color: var(--gray-600); font-size: 0.6rem;
    cursor: pointer; display: flex; align-items: center; justify-content: center; transition: var(--tr);
  }
  .ci-search-clear:hover { background: var(--gray-300); }

  /* Empty */
  .ci-empty { text-align: center; padding: 60px 24px; }
  .ci-empty-icon { font-size: 2.5rem; margin-bottom: 12px; }
  .ci-empty-title { font-family: var(--font-d); font-size: 1.2rem; color: var(--gray-900); margin-bottom: 6px; }
  .ci-empty-sub { font-size: 0.875rem; color: var(--gray-400); font-weight: 300; }

  /* Products grid */
  .ci-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
  .ci-product-card {
    background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--r-xl);
    overflow: hidden; transition: var(--tr); box-shadow: var(--shadow);
    animation: ci-fade-up 0.35s ease both; display: flex; flex-direction: column;
  }
  .ci-product-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-h); border-color: #fed7aa; }
  @keyframes ci-fade-up { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: none; } }

  .ci-product-img-wrap { position: relative; width: 100%; aspect-ratio: 4/3; background: var(--gray-100); overflow: hidden; }
  .ci-product-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
  .ci-product-card:hover .ci-product-img { transform: scale(1.05); }
  .ci-product-img-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem; }
  .ci-product-cat-tag {
    position: absolute; top: 8px; left: 8px;
    background: rgba(0,0,0,0.55); color: #fff; font-size: 0.65rem; font-weight: 600;
    text-transform: capitalize; padding: 3px 9px; border-radius: 100px; backdrop-filter: blur(4px);
  }

  .ci-product-body { padding: 14px 14px 16px; display: flex; flex-direction: column; flex: 1; }
  .ci-product-name { font-family: var(--font-d); font-size: 0.95rem; color: var(--gray-900); margin-bottom: 4px; }
  .ci-product-desc { font-size: 0.775rem; color: var(--gray-400); font-weight: 300; line-height: 1.5; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .ci-product-price { font-family: var(--font-d); font-size: 1.2rem; color: var(--green); margin-bottom: 12px; margin-top: auto; }

  .ci-product-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .ci-edit-btn, .ci-delete-btn {
    font-family: var(--font-b); font-size: 0.775rem; font-weight: 600;
    padding: 8px; border: none; border-radius: var(--r-md); cursor: pointer; transition: var(--tr);
  }
  .ci-edit-btn   { background: var(--blue-lt);  color: var(--blue); }
  .ci-edit-btn:hover   { background: var(--blue);  color: var(--white); }
  .ci-delete-btn { background: var(--red-lt);   color: var(--red);  }
  .ci-delete-btn:hover { background: var(--red);   color: var(--white); }

  /* Responsive */
  @media (max-width: 860px) { .ci-stats { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 600px) {
    .ci-stats { grid-template-columns: 1fr 1fr; }
    .ci-form-grid { grid-template-columns: 1fr; }
    .ci-field-full { grid-column: 1; }
    .ci-products-grid { grid-template-columns: 1fr 1fr; }
    .ci-section-header { flex-direction: column; align-items: flex-start; }
    .ci-search-box { width: 100%; min-width: unset; }
  }
  @media (max-width: 400px) { .ci-products-grid { grid-template-columns: 1fr; } }
`;

export default CreateItemOwner;
