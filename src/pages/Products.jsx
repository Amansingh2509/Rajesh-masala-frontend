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

  const changeQuantity = (id, type) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      if (type === "inc") return { ...prev, [id]: current + 1 };
      if (type === "dec")
        return { ...prev, [id]: current > 1 ? current - 1 : 1 };
      return prev;
    });
  };

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

  const totalCartItems = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="pr-loading">
          <div className="pr-spinner" />
          <p>Loading products…</p>
        </div>
      </>
    );
  }

  if (!user && !owner) {
    return (
      <>
        <style>{styles}</style>
        <div className="pr-gate">
          <div className="pr-gate-inner">
            <div className="pr-gate-icon">🔐</div>
            <h1 className="pr-gate-title">Members Only</h1>
            <p className="pr-gate-sub">Please log in to browse our products.</p>
            <a href="/user/login" className="pr-gate-btn">
              Log In to Continue
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>

      {/* Toast */}
      <div className={`pr-toast ${toast.show ? "pr-toast-show" : ""}`}>
        <span className="pr-toast-icon">✓</span>
        <span>
          <strong>{toast.item}</strong> added to cart
        </span>
      </div>

      {/* Page Header */}
      <div className="pr-header">
        <div className="pr-header-inner">
          <div>
            <div className="pr-header-pill">Our Catalogue</div>
            <h1 className="pr-header-title">Fresh Products</h1>
            <p className="pr-header-sub">
              {items.length} items available · Wholesale & retail
            </p>
          </div>
          {cart.length > 0 && (
            <a href="/cart" className="pr-cart-btn">
              <span className="pr-cart-icon">🛒</span>
              <span>Cart</span>
              <span className="pr-cart-badge">{totalCartItems}</span>
            </a>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="pr-page">
        {error && <div className="pr-error">⚠ {error}</div>}

        {items.length === 0 ? (
          <div className="pr-empty">
            <div className="pr-empty-icon">📦</div>
            <h2 className="pr-empty-title">No products yet</h2>
            <p className="pr-empty-sub">Log in as an owner to add items.</p>
          </div>
        ) : (
          <div className="pr-grid">
            {items.map((item, idx) => {
              const qty = quantities[item._id] || 1;
              return (
                <div
                  key={item._id}
                  className="pr-card"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Image */}
                  <div className="pr-img-wrap">
                    <img
                      src={
                        item.image ||
                        "https://placehold.co/400x300/f3f4f6/9ca3af?text=No+Image"
                      }
                      alt={item.name}
                      className="pr-img"
                    />
                  </div>

                  {/* Body */}
                  <div className="pr-body">
                    <div className="pr-item-meta">
                      {item.owner?.fullname && (
                        <span className="pr-owner-tag">
                          🏪 {item.owner.fullname}
                        </span>
                      )}
                    </div>

                    <h3 className="pr-item-name">{item.name}</h3>

                    {item.description && (
                      <p className="pr-item-desc">{item.description}</p>
                    )}

                    <div className="pr-price-row">
                      <span className="pr-price">₹{item.price}</span>
                      <span className="pr-price-unit">/ unit</span>
                    </div>

                    {/* Quantity */}
                    <div className="pr-qty-row">
                      <div className="pr-qty-ctrl">
                        <button
                          onClick={() => changeQuantity(item._id, "dec")}
                          className="pr-qty-btn"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="pr-qty-val">{qty}</span>
                        <button
                          onClick={() => changeQuantity(item._id, "inc")}
                          className="pr-qty-btn"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <span className="pr-subtotal">
                        ₹{(item.price * qty).toLocaleString()}
                      </span>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="pr-add-btn"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
    --r-xl: 20px;
    --r-lg: 14px;
    --r-md: 10px;
  }

  /* Loading */
  .pr-loading {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-family: var(--font-b);
    color: var(--gray-400);
    font-size: 0.95rem;
  }
  .pr-spinner {
    width: 40px; height: 40px;
    border: 3px solid var(--gray-200);
    border-top-color: var(--spice);
    border-radius: 50%;
    animation: pr-spin 0.8s linear infinite;
  }
  @keyframes pr-spin { to { transform: rotate(360deg); } }

  /* Gate */
  .pr-gate {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-b);
    padding: 40px;
  }
  .pr-gate-inner { text-align: center; }
  .pr-gate-icon  { font-size: 3rem; margin-bottom: 16px; }
  .pr-gate-title {
    font-family: var(--font-d);
    font-size: 2rem;
    color: var(--gray-900);
    margin: 0 0 10px;
  }
  .pr-gate-sub { font-size: 0.95rem; color: var(--gray-400); margin-bottom: 28px; font-weight: 300; }
  .pr-gate-btn {
    display: inline-block;
    background: linear-gradient(135deg, var(--spice), var(--spice-dk));
    color: var(--white);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 12px 28px;
    border-radius: var(--r-lg);
    box-shadow: 0 2px 12px rgba(249,115,22,0.3);
    transition: var(--tr);
    font-family: var(--font-b);
  }
  .pr-gate-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(249,115,22,0.4); }

  /* Toast */
  .pr-toast {
    position: fixed;
    top: 80px;
    right: 24px;
    z-index: 999;
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--gray-900);
    color: var(--white);
    font-family: var(--font-b);
    font-size: 0.875rem;
    padding: 12px 20px;
    border-radius: var(--r-lg);
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .pr-toast-show { opacity: 1; transform: none; pointer-events: auto; }
  .pr-toast-icon {
    width: 22px; height: 22px;
    background: var(--green);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem;
    flex-shrink: 0;
  }

  /* Header */
  .pr-header {
    background: var(--white);
    border-bottom: 1px solid var(--gray-100);
    padding: 40px 24px 32px;
    font-family: var(--font-b);
  }
  .pr-header-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
  .pr-header-pill {
    display: inline-block;
    font-size: 0.68rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--spice-dk);
    background: var(--spice-lt);
    border: 1px solid #fed7aa;
    border-radius: 100px;
    padding: 4px 13px;
    margin-bottom: 10px;
  }
  .pr-header-title {
    font-family: var(--font-d);
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    color: var(--gray-900);
    margin: 0 0 6px;
    letter-spacing: -0.02em;
  }
  .pr-header-sub { font-size: 0.875rem; color: var(--gray-400); font-weight: 300; }

  /* Cart button */
  .pr-cart-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    background: var(--gray-900);
    color: var(--white);
    font-family: var(--font-b);
    font-size: 0.875rem;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: var(--r-lg);
    transition: var(--tr);
    white-space: nowrap;
  }
  .pr-cart-btn:hover { background: var(--gray-700); transform: translateY(-1px); }
  .pr-cart-icon { font-size: 1rem; }
  .pr-cart-badge {
    background: var(--spice);
    color: var(--white);
    font-size: 0.7rem;
    font-weight: 700;
    width: 20px; height: 20px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }

  /* Page */
  .pr-page {
    background: var(--gray-50);
    min-height: 60vh;
    padding: 40px 24px 80px;
    font-family: var(--font-b);
  }

  /* Error */
  .pr-error {
    max-width: 1200px;
    margin: 0 auto 24px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 12px 18px;
    border-radius: var(--r-md);
    font-size: 0.875rem;
    font-weight: 500;
  }

  /* Empty */
  .pr-empty {
    text-align: center;
    padding: 80px 24px;
    font-family: var(--font-b);
  }
  .pr-empty-icon  { font-size: 3rem; margin-bottom: 16px; }
  .pr-empty-title {
    font-family: var(--font-d);
    font-size: 1.5rem;
    color: var(--gray-900);
    margin-bottom: 8px;
  }
  .pr-empty-sub { font-size: 0.9rem; color: var(--gray-400); font-weight: 300; }

  /* Grid */
  .pr-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }

  /* Card */
  .pr-card {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--r-xl);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: var(--tr);
    box-shadow: var(--shadow);
    animation: pr-fade-up 0.4s ease both;
  }
  .pr-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-h);
    border-color: #fed7aa;
  }
  @keyframes pr-fade-up {
    from { opacity:0; transform: translateY(16px); }
    to   { opacity:1; transform: none; }
  }

  /* Image */
  .pr-img-wrap {
    width: 100%;
    aspect-ratio: 4/3;
    overflow: hidden;
    background: var(--gray-100);
  }
  .pr-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  .pr-card:hover .pr-img { transform: scale(1.04); }

  /* Body */
  .pr-body {
    padding: 18px 18px 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0;
  }
  .pr-item-meta { margin-bottom: 8px; }
  .pr-owner-tag {
    font-size: 0.68rem;
    color: var(--gray-400);
    font-weight: 400;
  }
  .pr-item-name {
    font-family: var(--font-d);
    font-size: 1.05rem;
    color: var(--gray-900);
    margin-bottom: 6px;
    line-height: 1.3;
  }
  .pr-item-desc {
    font-size: 0.8rem;
    color: var(--gray-400);
    line-height: 1.55;
    font-weight: 300;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .pr-price-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-bottom: 14px;
  }
  .pr-price {
    font-family: var(--font-d);
    font-size: 1.4rem;
    color: var(--spice-dk);
    line-height: 1;
  }
  .pr-price-unit { font-size: 0.75rem; color: var(--gray-400); }

  /* Qty */
  .pr-qty-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .pr-qty-ctrl {
    display: flex;
    align-items: center;
    gap: 0;
    background: var(--gray-100);
    border: 1px solid var(--gray-200);
    border-radius: var(--r-md);
    overflow: hidden;
  }
  .pr-qty-btn {
    width: 34px; height: 34px;
    background: none;
    border: none;
    font-size: 1.1rem;
    color: var(--gray-700);
    cursor: pointer;
    transition: background 0.15s;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-b);
  }
  .pr-qty-btn:hover { background: var(--gray-200); }
  .pr-qty-val {
    min-width: 32px;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--gray-900);
    border-left: 1px solid var(--gray-200);
    border-right: 1px solid var(--gray-200);
    line-height: 34px;
  }
  .pr-subtotal {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--green);
  }

  /* Add to Cart */
  .pr-add-btn {
    width: 100%;
    padding: 11px;
    background: linear-gradient(135deg, var(--spice), var(--spice-dk));
    color: var(--white);
    border: none;
    border-radius: var(--r-md);
    font-family: var(--font-b);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--tr);
    box-shadow: 0 1px 8px rgba(249,115,22,0.25);
    margin-top: auto;
  }
  .pr-add-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(249,115,22,0.35);
  }
  .pr-add-btn:active { transform: none; }

  @media (max-width: 600px) {
    .pr-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
    .pr-header { padding: 28px 16px 24px; }
    .pr-page { padding: 24px 16px 60px; }
  }
  @media (max-width: 400px) {
    .pr-grid { grid-template-columns: 1fr; }
  }
`;

export default Products;
