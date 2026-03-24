import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [placing, setPlacing] = useState(false);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item._id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item,
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const placeOrder = async () => {
    if (cart.length === 0) return;
    if (loading || !user) {
      navigate("/user/login");
      return;
    }
    setPlacing(true);
    try {
      const orderItems = cart.map((item) => ({
        productName: item.name,
        itemId: item._id,
        price: parseFloat(item.price),
        quantity: item.quantity || 1,
      }));
      const response = await axios.post(
        "http://localhost:8765/api/orders",
        { items: orderItems },
        { withCredentials: true },
      );
      setOrderSuccess({ orderId: response.data.orderId, total: totalPrice });
      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      alert(
        "Order failed: " + (error.response?.data?.message || error.message),
      );
    } finally {
      setPlacing(false);
    }
  };

  /* ── Order Success Screen ── */
  if (orderSuccess) {
    return (
      <>
        <style>{styles}</style>
        <div className="cp-success-root">
          <div className="cp-success-card">
            <div className="cp-success-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="36"
                height="36"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="cp-success-pill">Order Confirmed</div>
            <h1 className="cp-success-title">You're all set!</h1>
            <p className="cp-success-sub">
              The owner has received your order and will respond shortly.
            </p>

            <div className="cp-success-meta">
              <div className="cp-success-meta-row">
                <span className="cp-meta-label">Order ID</span>
                <span className="cp-meta-val">
                  #{orderSuccess.orderId.slice(-6).toUpperCase()}
                </span>
              </div>
              <div className="cp-success-meta-row">
                <span className="cp-meta-label">Amount Paid</span>
                <span className="cp-meta-val cp-meta-green">
                  ₹{orderSuccess.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="cp-success-actions">
              <button
                onClick={() => navigate("/products")}
                className="cp-success-primary"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate("/user/home")}
                className="cp-success-ghost"
              >
                View My Orders
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── Empty Cart ── */
  if (cart.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="cp-empty-root">
          <div className="cp-empty-inner">
            <div className="cp-empty-icon">🛒</div>
            <h2 className="cp-empty-title">Your cart is empty</h2>
            <p className="cp-empty-sub">Add some products to get started.</p>
            <button
              onClick={() => navigate("/products")}
              className="cp-start-btn"
            >
              Browse Products →
            </button>
          </div>
        </div>
      </>
    );
  }

  /* ── Main Cart ── */
  return (
    <>
      <style>{styles}</style>

      {/* Header */}
      <div className="cp-header">
        <div className="cp-header-inner">
          <div>
            <div className="cp-header-pill">Your Cart</div>
            <h1 className="cp-header-title">Review your order</h1>
            <p className="cp-header-sub">
              {totalItems} item{totalItems !== 1 ? "s" : ""} · {cart.length}{" "}
              product{cart.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="cp-continue-btn"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>

      <div className="cp-page">
        <div className="cp-layout">
          {/* ── Cart Items ── */}
          <div className="cp-items-col">
            <div className="cp-items-list">
              {cart.map((item, idx) => (
                <div
                  key={item._id}
                  className="cp-item-card"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Image */}
                  <div className="cp-item-img-wrap">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cp-item-img"
                      />
                    ) : (
                      <div className="cp-item-img-fallback">📦</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="cp-item-info">
                    <div className="cp-item-top">
                      <div>
                        <h3 className="cp-item-name">{item.name}</h3>
                        {item.category && (
                          <span className="cp-item-cat">{item.category}</span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="cp-remove-btn"
                        aria-label="Remove item"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          width="14"
                          height="14"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>

                    <div className="cp-item-bottom">
                      {/* Qty control */}
                      <div className="cp-qty-ctrl">
                        <button
                          onClick={() => decreaseQty(item._id)}
                          className="cp-qty-btn"
                        >
                          −
                        </button>
                        <span className="cp-qty-val">{item.quantity || 1}</span>
                        <button
                          onClick={() => increaseQty(item._id)}
                          className="cp-qty-btn"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="cp-item-price-wrap">
                        <span className="cp-item-unit">
                          ₹{item.price} × {item.quantity || 1}
                        </span>
                        <span className="cp-item-total">
                          ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="cp-summary-col">
            <div className="cp-summary-card">
              <h2 className="cp-summary-title">Order Summary</h2>

              <div className="cp-summary-rows">
                {cart.map((item) => (
                  <div key={item._id} className="cp-summary-row">
                    <span className="cp-summary-item-name">
                      {item.name}
                      <span className="cp-summary-qty">
                        {" "}
                        ×{item.quantity || 1}
                      </span>
                    </span>
                    <span className="cp-summary-item-price">
                      ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="cp-summary-divider" />

              <div className="cp-summary-total-row">
                <span className="cp-summary-total-label">Total</span>
                <span className="cp-summary-total-val">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={placeOrder}
                disabled={placing}
                className="cp-place-btn"
              >
                {placing ? (
                  <>
                    <span className="cp-btn-spinner" /> Placing Order…
                  </>
                ) : (
                  "Place Order →"
                )}
              </button>

              <p className="cp-summary-hint">
                🔒 Secure order · No payment needed upfront
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --green:    #16a34a;
    --green-dk: #14532d;
    --green-lt: #f0fdf4;
    --spice:    #f97316;
    --spice-dk: #c2410c;
    --spice-lt: #fff7ed;
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

  /* ── Success Screen ── */
  .cp-success-root {
    min-height: 100vh; background: var(--green-lt);
    display: flex; align-items: center; justify-content: center;
    padding: 40px 24px; font-family: var(--font-b);
  }
  .cp-success-card {
    background: var(--white); border: 1px solid #bbf7d0;
    border-radius: var(--r-xl); padding: 52px 44px;
    max-width: 440px; width: 100%; text-align: center;
    box-shadow: 0 12px 40px rgba(22,163,74,0.12);
    animation: cp-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes cp-pop { from { opacity:0; transform: scale(0.9); } to { opacity:1; transform: none; } }
  .cp-success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: var(--green); color: var(--white);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px; box-shadow: 0 4px 20px rgba(22,163,74,0.35);
  }
  .cp-success-pill {
    display: inline-block; background: var(--green-lt); border: 1px solid #bbf7d0;
    color: var(--green); font-size: 0.72rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.09em;
    padding: 5px 14px; border-radius: 100px; margin-bottom: 16px;
  }
  .cp-success-title {
    font-family: var(--font-d); font-size: 2rem; color: var(--gray-900);
    margin: 0 0 10px; letter-spacing: -0.02em;
  }
  .cp-success-sub { font-size: 0.9rem; color: var(--gray-400); font-weight: 300; line-height: 1.6; margin-bottom: 28px; }
  .cp-success-meta {
    background: var(--gray-50); border: 1px solid var(--gray-200);
    border-radius: var(--r-lg); padding: 18px 20px; margin-bottom: 28px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .cp-success-meta-row { display: flex; justify-content: space-between; align-items: center; }
  .cp-meta-label { font-size: 0.78rem; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
  .cp-meta-val { font-family: var(--font-d); font-size: 1.1rem; color: var(--gray-900); }
  .cp-meta-green { color: var(--green); }
  .cp-success-actions { display: flex; flex-direction: column; gap: 10px; }
  .cp-success-primary {
    width: 100%; padding: 13px; background: linear-gradient(135deg, var(--green), var(--green-dk));
    color: var(--white); border: none; border-radius: var(--r-md);
    font-family: var(--font-b); font-size: 0.9rem; font-weight: 600;
    cursor: pointer; transition: var(--tr); box-shadow: 0 2px 12px rgba(22,163,74,0.3);
  }
  .cp-success-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(22,163,74,0.4); }
  .cp-success-ghost {
    width: 100%; padding: 13px; background: var(--gray-100);
    color: var(--gray-700); border: none; border-radius: var(--r-md);
    font-family: var(--font-b); font-size: 0.875rem; font-weight: 600;
    cursor: pointer; transition: var(--tr);
  }
  .cp-success-ghost:hover { background: var(--gray-200); }

  /* ── Empty ── */
  .cp-empty-root {
    min-height: 70vh; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-b); background: var(--gray-50); padding: 40px;
  }
  .cp-empty-inner { text-align: center; }
  .cp-empty-icon { font-size: 3.5rem; margin-bottom: 16px; }
  .cp-empty-title {
    font-family: var(--font-d); font-size: 1.7rem; color: var(--gray-900);
    margin-bottom: 8px;
  }
  .cp-empty-sub { font-size: 0.9rem; color: var(--gray-400); font-weight: 300; margin-bottom: 28px; }
  .cp-start-btn {
    display: inline-block; background: linear-gradient(135deg, var(--spice), var(--spice-dk));
    color: var(--white); border: none; border-radius: var(--r-lg);
    font-family: var(--font-b); font-size: 0.9rem; font-weight: 600;
    padding: 13px 28px; cursor: pointer; transition: var(--tr);
    box-shadow: 0 2px 12px rgba(249,115,22,0.3);
  }
  .cp-start-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(249,115,22,0.4); }

  /* ── Header ── */
  .cp-header {
    background: var(--white); border-bottom: 1px solid var(--gray-100);
    padding: 40px 24px 28px; font-family: var(--font-b);
  }
  .cp-header-inner {
    max-width: 1000px; margin: 0 auto;
    display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap;
  }
  .cp-header-pill {
    display: inline-block; font-size: 0.68rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--spice-dk); background: var(--spice-lt);
    border: 1px solid #fed7aa; border-radius: 100px;
    padding: 4px 13px; margin-bottom: 10px;
  }
  .cp-header-title {
    font-family: var(--font-d); font-size: clamp(1.6rem, 3vw, 2.2rem);
    color: var(--gray-900); margin: 0 0 6px; letter-spacing: -0.02em;
  }
  .cp-header-sub { font-size: 0.875rem; color: var(--gray-400); font-weight: 300; }
  .cp-continue-btn {
    font-family: var(--font-b); font-size: 0.825rem; font-weight: 600;
    color: var(--gray-600); background: var(--gray-100);
    border: 1.5px solid var(--gray-200); border-radius: var(--r-md);
    padding: 9px 18px; cursor: pointer; transition: var(--tr); white-space: nowrap;
  }
  .cp-continue-btn:hover { border-color: var(--spice); color: var(--spice); background: var(--spice-lt); }

  /* ── Page ── */
  .cp-page { background: var(--gray-50); padding: 32px 24px 80px; font-family: var(--font-b); }
  .cp-layout {
    max-width: 1000px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start;
  }

  /* ── Items ── */
  .cp-items-list { display: flex; flex-direction: column; gap: 14px; }
  .cp-item-card {
    background: var(--white); border: 1px solid var(--gray-200);
    border-radius: var(--r-xl); overflow: hidden;
    display: flex; gap: 0; transition: var(--tr); box-shadow: var(--shadow);
    animation: cp-fade-up 0.35s ease both;
  }
  .cp-item-card:hover { box-shadow: var(--shadow-h); border-color: #fed7aa; }
  @keyframes cp-fade-up { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: none; } }

  .cp-item-img-wrap {
    width: 110px; flex-shrink: 0;
    background: var(--gray-100); overflow: hidden;
  }
  .cp-item-img { width: 100%; height: 100%; object-fit: cover; }
  .cp-item-img-fallback {
    width: 100%; height: 100%; min-height: 100px;
    display: flex; align-items: center; justify-content: center; font-size: 1.8rem;
  }

  .cp-item-info { flex: 1; padding: 16px 18px; display: flex; flex-direction: column; gap: 12px; }
  .cp-item-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
  .cp-item-name {
    font-family: var(--font-d); font-size: 1rem; color: var(--gray-900); margin-bottom: 4px;
  }
  .cp-item-cat {
    display: inline-block; font-size: 0.68rem; font-weight: 600; text-transform: capitalize;
    color: var(--spice-dk); background: var(--spice-lt); border: 1px solid #fed7aa;
    padding: 2px 9px; border-radius: 100px;
  }
  .cp-remove-btn {
    width: 30px; height: 30px; flex-shrink: 0;
    background: var(--red-lt); border: none; border-radius: 8px;
    color: var(--red); cursor: pointer; display: flex;
    align-items: center; justify-content: center; transition: var(--tr);
  }
  .cp-remove-btn:hover { background: var(--red); color: var(--white); }

  .cp-item-bottom { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .cp-qty-ctrl {
    display: flex; align-items: center;
    background: var(--gray-100); border: 1px solid var(--gray-200);
    border-radius: var(--r-md); overflow: hidden;
  }
  .cp-qty-btn {
    width: 32px; height: 32px; background: none; border: none;
    font-size: 1.1rem; color: var(--gray-700); cursor: pointer;
    transition: background 0.15s; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-b);
  }
  .cp-qty-btn:hover { background: var(--gray-200); }
  .cp-qty-val {
    min-width: 30px; text-align: center; font-size: 0.875rem; font-weight: 600;
    color: var(--gray-900); border-left: 1px solid var(--gray-200);
    border-right: 1px solid var(--gray-200); line-height: 32px;
  }
  .cp-item-price-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
  .cp-item-unit  { font-size: 0.75rem; color: var(--gray-400); font-weight: 300; }
  .cp-item-total { font-family: var(--font-d); font-size: 1.1rem; color: var(--green); }

  /* ── Summary ── */
  .cp-summary-card {
    background: var(--white); border: 1px solid var(--gray-200);
    border-radius: var(--r-xl); padding: 28px; box-shadow: var(--shadow);
    position: sticky; top: 80px;
  }
  .cp-summary-title {
    font-family: var(--font-d); font-size: 1.15rem; color: var(--gray-900);
    margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--gray-100);
  }
  .cp-summary-rows { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
  .cp-summary-row {
    display: flex; justify-content: space-between; align-items: center; gap: 8px;
  }
  .cp-summary-item-name {
    font-size: 0.825rem; color: var(--gray-600); font-weight: 400;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px;
  }
  .cp-summary-qty { color: var(--gray-400); font-size: 0.78rem; }
  .cp-summary-item-price { font-size: 0.85rem; font-weight: 600; color: var(--gray-800); flex-shrink: 0; }
  .cp-summary-divider { height: 1px; background: var(--gray-100); margin: 16px 0; }
  .cp-summary-total-row {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
  }
  .cp-summary-total-label {
    font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.07em; color: var(--gray-400);
  }
  .cp-summary-total-val { font-family: var(--font-d); font-size: 1.6rem; color: var(--gray-900); }

  /* Place order btn */
  .cp-place-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 14px;
    background: linear-gradient(135deg, var(--green), var(--green-dk));
    color: var(--white); border: none; border-radius: var(--r-md);
    font-family: var(--font-b); font-size: 0.95rem; font-weight: 600;
    cursor: pointer; transition: var(--tr);
    box-shadow: 0 2px 12px rgba(22,163,74,0.3); margin-bottom: 14px;
  }
  .cp-place-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(22,163,74,0.4); }
  .cp-place-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .cp-btn-spinner {
    width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%; animation: cp-spin 0.7s linear infinite;
  }
  @keyframes cp-spin { to { transform: rotate(360deg); } }

  .cp-summary-hint {
    text-align: center; font-size: 0.75rem; color: var(--gray-400);
    font-weight: 300; line-height: 1.5;
  }

  /* Responsive */
  @media (max-width: 720px) {
    .cp-layout { grid-template-columns: 1fr; }
    .cp-summary-card { position: static; }
    .cp-item-img-wrap { width: 80px; }
    .cp-header { padding: 28px 16px 20px; }
    .cp-page { padding: 20px 16px 60px; }
  }
`;

export default CartPage;
