import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const UserHome = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingIndex, setEditingIndex] = useState(0);
  const [editQuantity, setEditQuantity] = useState(1);
  const [editNotes, setEditNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editMessage, setEditMessage] = useState("");

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

  const handleDeleteOrder = async (id) => {
    if (!confirm("Delete this order?")) return;
    try {
      await axios.delete(`${API}/api/orders/${id}`, { withCredentials: true });
      fetchOrders();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEditOrder = (id) => {
    const order = orders.find((o) => o._id === id);
    if (order && order.status === "pending") {
      setEditingOrder(order);
      setEditingIndex(0);
      setEditQuantity(1);
      setEditNotes("");
      setShowEditModal(true);
      setEditMessage("");
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!editingOrder || (editQuantity < 1 && !editNotes.trim())) {
      setEditMessage("Please provide quantity >0 or notes.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${API}/api/edit-requests/`,
        {
          orderId: editingOrder._id,
          orderItemIndex: editingIndex,
          proposedChanges: {
            quantity: editQuantity,
            notes: editNotes.trim(),
          },
        },
        { withCredentials: true },
      );

      setEditMessage("Edit request submitted successfully!");
      setShowEditModal(false);
      fetchOrders(); // Refresh to show status if changed
    } catch (error) {
      console.error("Submit failed:", error);
      setEditMessage(
        error.response?.data?.message || "Failed to submit request.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <style>{styles}</style>
        <div className="uh-not-auth">
          <div className="uh-not-auth-inner">
            <div className="uh-lock-icon">🔐</div>
            <h1>Access Restricted</h1>
            <p>Please log in to view your dashboard.</p>
          </div>
        </div>
      </>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <>
      <style>{styles}</style>

      {/* ── Hero ── */}
      <section className="uh-hero">
        <div className="uh-hero-bg" />
        <div className="uh-hero-content">
          <div className="uh-greeting-pill">👋 Welcome back</div>
          <h1 className="uh-hero-name">{user.fullname}</h1>
          <p className="uh-hero-sub">
            Here's everything happening with your account today.
          </p>

          {/* Stat Bar */}
          <div className="uh-stat-bar">
            <div className="uh-stat">
              <span className="uh-stat-val">{orders.length}</span>
              <span className="uh-stat-label">Total Orders</span>
            </div>
            <div className="uh-stat-divider" />
            <div className="uh-stat">
              <span className="uh-stat-val">{pendingOrders}</span>
              <span className="uh-stat-label">Pending</span>
            </div>
            <div className="uh-stat-divider" />
            <div className="uh-stat">
              <span className="uh-stat-val">{deliveredOrders}</span>
              <span className="uh-stat-label">Delivered</span>
            </div>
            <div className="uh-stat-divider" />
            <div className="uh-stat">
              <span className="uh-stat-val">
                ₹{totalSpent.toLocaleString()}
              </span>
              <span className="uh-stat-label">Total Spent</span>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="uh-quick-actions">
            <Link to="/products" className="uh-qa-card uh-qa-primary">
              <span className="uh-qa-icon">🛍️</span>
              <div>
                <div className="uh-qa-title">Shop Products</div>
                <div className="uh-qa-desc">Fresh masala & grocery</div>
              </div>
              <span className="uh-qa-arrow">→</span>
            </Link>

            <a href="#orders" className="uh-qa-card uh-qa-accent">
              <span className="uh-qa-icon">📦</span>
              <div>
                <div className="uh-qa-title">My Orders</div>
                <div className="uh-qa-desc">{orders.length} purchases</div>
              </div>
              <span className="uh-qa-arrow">→</span>
            </a>

            <Link to="/about" className="uh-qa-card uh-qa-muted">
              <span className="uh-qa-icon">⚙️</span>
              <div>
                <div className="uh-qa-title">Settings</div>
                <div className="uh-qa-desc">Profile & security</div>
              </div>
              <span className="uh-qa-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Orders ── */}
      <section id="orders" className="uh-orders-section">
        <div className="uh-orders-container">
          <div className="uh-section-header">
            <div>
              <h2 className="uh-section-title">Order History</h2>
              <p className="uh-section-sub">
                All your past and active orders in one place
              </p>
            </div>
            <Link to="/products" className="uh-shop-btn">
              + New Order
            </Link>
          </div>

          {loading ? (
            <div className="uh-loading">
              <div className="uh-spinner" />
              <p>Fetching your orders…</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="uh-empty">
              <div className="uh-empty-icon">🛒</div>
              <h3>No orders yet</h3>
              <p>Start shopping to see your order history here.</p>
              <Link to="/products" className="uh-shop-btn">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="uh-orders-list">
              {orders.map((order, idx) => (
                <div
                  key={order._id}
                  className="uh-order-card"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {/* Card Header */}
                  <div className="uh-order-header">
                    <div className="uh-order-meta">
                      <span className="uh-order-id">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                      <span className="uh-order-date">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span
                      className={`uh-badge ${order.status === "delivered" ? "uh-badge-delivered" : "uh-badge-pending"}`}
                    >
                      {order.status === "delivered"
                        ? "✓ Delivered"
                        : "⏳ Pending"}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="uh-order-items">
                    {order.items.map((item, i) => (
                      <div key={i} className="uh-order-item">
                        <div className="uh-item-info">
                          <span className="uh-item-dot" />
                          <span className="uh-item-name">
                            {item.productName}
                          </span>
                          <span className="uh-item-qty">×{item.quantity}</span>
                        </div>
                        <span className="uh-item-price">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="uh-order-footer">
                    <div className="uh-order-total">
                      <span className="uh-total-label">Order Total</span>
                      <span className="uh-total-val">
                        ₹{order.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    {order.status === "pending" && (
                      <div className="uh-order-actions">
                        <button
                          onClick={() => handleEditOrder(order._id)}
                          className="uh-btn-edit"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="uh-btn-delete"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit Modal */}
          {showEditModal && editingOrder && (
            <div className="uh-edit-modal-overlay">
              <div className="uh-edit-modal">
                <div className="uh-edit-header">
                  <h3>
                    Edit Order #{editingOrder._id.slice(-6).toUpperCase()}
                  </h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="uh-edit-close"
                    disabled={submitting}
                  >
                    ×
                  </button>
                </div>

                {editMessage && (
                  <div
                    className={`uh-edit-msg ${editMessage.includes("success") ? "uh-edit-success" : "uh-edit-error"}`}
                  >
                    {editMessage}
                  </div>
                )}

                <form onSubmit={handleSubmitEdit}>
                  <div className="uh-edit-field">
                    <label>Item to Edit</label>
                    <select
                      value={editingIndex}
                      onChange={(e) => setEditingIndex(Number(e.target.value))}
                      disabled={submitting}
                    >
                      {editingOrder.items.map((item, i) => (
                        <option key={i} value={i}>
                          {item.productName} (×{item.quantity})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="uh-edit-field">
                    <label>New Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(Number(e.target.value))}
                      disabled={submitting}
                      placeholder="e.g. 5"
                    />
                  </div>

                  <div className="uh-edit-field">
                    <label>Notes (optional)</label>
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      disabled={submitting}
                      rows="3"
                      placeholder="e.g. Change to spicier version, add extra onions..."
                    />
                  </div>

                  <div className="uh-edit-actions">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      disabled={submitting}
                      className="uh-btn-cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="uh-btn-submit"
                    >
                      {submitting ? "Submitting..." : "Submit Request"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

/* ─── Styles ─────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --green-900: #14532d;
    --green-700: #15803d;
    --green-500: #22c55e;
    --green-100: #dcfce7;
    --green-50:  #f0fdf4;
    --amber:     #f59e0b;
    --amber-100: #fef3c7;
    --red-500:   #ef4444;
    --red-100:   #fee2e2;
    --blue-500:  #3b82f6;
    --blue-100:  #dbeafe;
    --gray-950:  #0a0f0d;
    --gray-800:  #1c2b22;
    --gray-600:  #4b5563;
    --gray-400:  #9ca3af;
    --gray-200:  #e5e7eb;
    --gray-100:  #f3f4f6;
    --gray-50:   #f9fafb;
    --white:     #ffffff;
    --radius-xl: 20px;
    --radius-lg: 14px;
    --radius-md: 10px;
    --shadow-card: 0 2px 16px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05);
    --shadow-hover: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
    --shadow-modal: 0 20px 60px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15);
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body:    'DM Sans', system-ui, sans-serif;
    --transition:   all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ── Not-auth ── */
  .uh-not-auth {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-body);
  }
  .uh-not-auth-inner {
    text-align: center;
    color: var(--gray-600);
  }
  .uh-lock-icon { font-size: 3rem; margin-bottom: 1rem; }
  .uh-not-auth h1 { font-family: var(--font-display); font-size: 2rem; color: var(--gray-800); margin: 0 0 .5rem; }
  .uh-not-auth p  { font-size: 1rem; }

  /* ── Hero ── */
  .uh-hero {
    position: relative;
    background: linear-gradient(145deg, #0d2818 0%, #14532d 45%, #166534 100%);
    padding: 72px 24px 80px;
    overflow: hidden;
    font-family: var(--font-body);
  }
  .uh-hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 80% 20%, rgba(34,197,94,0.15) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 10% 80%, rgba(20,83,45,0.4) 0%, transparent 70%);
    pointer-events: none;
  }
  .uh-hero-content {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
  .uh-greeting-pill {
    display: inline-block;
    background: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.85);
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.2);
    margin-bottom: 20px;
  }
  .uh-hero-name {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 6vw, 4rem);
    color: var(--white);
    margin: 0 0 16px;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  .uh-hero-sub {
    font-size: 1.05rem;
    color: rgba(255,255,255,0.65);
    margin: 0 0 40px;
    font-weight: 300;
  }

  /* Stat bar */
  .uh-stat-bar {
    display: inline-flex;
    align-items: center;
    gap: 0;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: var(--radius-xl);
    padding: 20px 32px;
    margin-bottom: 40px;
    backdrop-filter: blur(12px);
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 16px;
  }
  .uh-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 28px;
  }
  .uh-stat-val {
    font-family: var(--font-display);
    font-size: 1.75rem;
    color: var(--white);
    line-height: 1;
    margin-bottom: 4px;
  }
  .uh-stat-label {
    font-size: 0.72rem;
    color: rgba(255,255,255,0.55);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    font-weight: 500;
  }
  .uh-stat-divider {
    width: 1px;
    height: 36px;
    background: rgba(255,255,255,0.2);
  }

  /* Quick actions */
  .uh-quick-actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    max-width: 800px;
    margin: 0 auto;
  }
  .uh-qa-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 20px;
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: var(--transition);
    cursor: pointer;
  }
  .uh-qa-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-hover); }
  .uh-qa-primary {
    background: var(--white);
    color: var(--gray-800);
    border: 1px solid rgba(255,255,255,0.3);
  }
  .uh-qa-accent {
    background: linear-gradient(135deg, var(--green-500), var(--green-700));
    color: var(--white);
    border: 1px solid rgba(255,255,255,0.2);
  }
  .uh-qa-muted {
    background: rgba(255,255,255,0.1);
    color: var(--white);
    border: 1px solid rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
  }
  .uh-qa-icon { font-size: 1.5rem; flex-shrink: 0; }
  .uh-qa-title { font-weight: 600; font-size: 0.95rem; margin-bottom: 2px; }
  .uh-qa-desc  { font-size: 0.78rem; opacity: 0.7; }
  .uh-qa-arrow { margin-left: auto; font-size: 1.1rem; opacity: 0.5; }

  /* ── Orders Section ── */
  .uh-orders-section {
    background: var(--gray-50);
    min-height: 400px;
    padding: 72px 24px 96px;
    font-family: var(--font-body);
    position: relative;
  }
  .uh-orders-container {
    max-width: 860px;
    margin: 0 auto;
  }
  .uh-section-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }
  .uh-section-title {
    font-family: var(--font-display);
    font-size: 2rem;
    color: var(--gray-800);
    margin: 0 0 6px;
    letter-spacing: -0.02em;
  }
  .uh-section-sub {
    font-size: 0.9rem;
    color: var(--gray-400);
    margin: 0;
    font-weight: 300;
  }
  .uh-shop-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--green-700);
    color: var(--white);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: var(--radius-md);
    transition: var(--transition);
    white-space: nowrap;
    border: none;
    cursor: pointer;
  }
  .uh-shop-btn:hover { background: var(--green-900); transform: translateY(-1px); }

  /* Loading */
  .uh-loading {
    text-align: center;
    padding: 80px 0;
    color: var(--gray-400);
    font-size: 0.95rem;
  }
  .uh-spinner {
    width: 40px; height: 40px;
    border: 3px solid var(--gray-200);
    border-top-color: var(--green-700);
    border-radius: 50%;
    animation: uh-spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }
  @keyframes uh-spin { to { transform: rotate(360deg); } }

  /* Empty */
  .uh-empty {
    text-align: center;
    padding: 80px 24px;
    background: var(--white);
    border-radius: var(--radius-xl);
    border: 1px solid var(--gray-200);
  }
  .uh-empty-icon { font-size: 3.5rem; margin-bottom: 16px; }
  .uh-empty h3 {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--gray-800);
    margin: 0 0 8px;
  }
  .uh-empty p {
    color: var(--gray-400);
    font-size: 0.95rem;
    margin: 0 0 28px;
    font-weight: 300;
  }

  /* Orders list */
  .uh-orders-list { display: flex; flex-direction: column; gap: 16px; }

  /* Order card */
  .uh-order-card {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: var(--transition);
    animation: uh-fade-up 0.4s ease both;
    box-shadow: var(--shadow-card);
  }
  .uh-order-card:hover {
    box-shadow: var(--shadow-hover);
    border-color: #d1fae5;
    transform: translateY(-2px);
  }
  @keyframes uh-fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .uh-order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px 16px;
    border-bottom: 1px solid var(--gray-100);
  }
  .uh-order-meta { display: flex; flex-direction: column; gap: 3px; }
  .uh-order-id {
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--gray-800);
    font-weight: 600;
  }
  .uh-order-date {
    font-size: 0.78rem;
    color: var(--gray-400);
    font-weight: 400;
  }

  /* Badge */
  .uh-badge {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 100px;
    letter-spacing: 0.02em;
  }
  .uh-badge-delivered { background: var(--green-100); color: var(--green-700); }
  .uh-badge-pending   { background: var(--amber-100); color: #92400e; }

  /* Items */
  .uh-order-items { padding: 12px 24px; }
  .uh-order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 0;
    border-bottom: 1px solid var(--gray-100);
  }
  .uh-order-item:last-child { border-bottom: none; }
  .uh-item-info { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .uh-item-dot {
    width: 7px; height: 7px;
    background: var(--green-500);
    border-radius: 50%;
    flex-shrink: 0;
  }
  .uh-item-name {
    font-size: 0.9rem;
    color: var(--gray-800);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 280px;
  }
  .uh-item-qty {
    font-size: 0.78rem;
    color: var(--gray-400);
    background: var(--gray-100);
    padding: 2px 7px;
    border-radius: 4px;
    flex-shrink: 0;
  }
  .uh-item-price {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--green-700);
    flex-shrink: 0;
  }

  /* Footer */
  .uh-order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: var(--gray-50);
    border-top: 1px solid var(--gray-100);
    gap: 16px;
    flex-wrap: wrap;
  }
  .uh-order-total { display: flex; flex-direction: column; gap: 2px; }
  .uh-total-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--gray-400);
    font-weight: 500;
  }
  .uh-total-val {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--gray-800);
  }

  /* Action buttons */
  .uh-order-actions { display: flex; gap: 10px; }
  .uh-btn-edit, .uh-btn-delete {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.825rem;
    font-weight: 600;
    padding: 9px 18px;
    border-radius: var(--radius-md);
    border: none;
    cursor: pointer;
    transition: var(--transition);
    font-family: var(--font-body);
  }
  .uh-btn-edit {
    background: var(--blue-100);
    color: var(--blue-500);
  }
  .uh-btn-edit:hover { background: var(--blue-500); color: var(--white); }
  .uh-btn-delete {
    background: var(--red-100);
    color: var(--red-500);
  }
  .uh-btn-delete:hover { background: var(--red-500); color: var(--white); }

  /* ── Edit Modal ── */
  .uh-edit-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
    animation: uh-fade-in 0.2s ease;
  }
  @keyframes uh-fade-in { from { opacity: 0; } to { opacity: 1; } }
  .uh-edit-modal {
    background: var(--white);
    border-radius: var(--radius-xl);
    max-width: 480px;
    width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-modal);
    animation: uh-slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: var(--font-body);
  }
  @keyframes uh-slide-up { from { opacity: 0; transform: translateY(20px) scale(0.95); } }
  .uh-edit-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 28px 16px;
    border-bottom: 1px solid var(--gray-100);
  }
  .uh-edit-header h3 {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--gray-800);
    margin: 0;
    font-weight: 600;
  }
  .uh-edit-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--gray-400);
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
  }
  .uh-edit-close:hover { background: var(--gray-100); color: var(--gray-600); }
  .uh-edit-msg {
    padding: 14px 28px;
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
    border-bottom: 1px solid var(--gray-100);
  }
  .uh-edit-success { background: #ecfdf5; color: var(--green-700); border-left: 4px solid var(--green-500); }
  .uh-edit-error { background: #fef2f2; color: var(--red-500); border-left: 4px solid var(--red-500); }
  .uh-edit-field {
    padding: 20px 28px;
    border-bottom: 1px solid var(--gray-100);
  }
  .uh-edit-field:last-child { border-bottom: none; }
  .uh-edit-field label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--gray-700);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .uh-edit-field input,
  .uh-edit-field select,
  .uh-edit-field textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-family: var(--font-body);
    transition: var(--transition);
    background: var(--white);
  }
  .uh-edit-field input:focus,
  .uh-edit-field select:focus,
  .uh-edit-field textarea:focus {
    outline: none;
    border-color: var(--blue-500);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
  }
  .uh-edit-field textarea { resize: vertical; line-height: 1.4; }
  .uh-edit-actions {
    padding: 24px 28px;
    display: flex;
    gap: 12px;
    border-top: 1px solid var(--gray-100);
  }
  .uh-btn-cancel {
    flex: 1;
    padding: 12px 20px;
    background: var(--gray-100);
    color: var(--gray-600);
    border: none;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
  }
  .uh-btn-cancel:hover { background: var(--gray-200); }
  .uh-btn-submit {
    flex: 1;
    padding: 12px 20px;
    background: var(--blue-500);
    color: var(--white);
    border: none;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
  }
  .uh-btn-submit:hover:not(:disabled) { background: #2563eb; }
  .uh-btn-submit:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Responsive */
  @media (max-width: 600px) {
    .uh-stat-bar { padding: 16px 12px; }
    .uh-stat { padding: 0 14px; }
    .uh-stat-val { font-size: 1.4rem; }
    .uh-order-header { flex-wrap: wrap; gap: 10px; }
    .uh-order-footer { flex-direction: column; align-items: flex-start; }
    .uh-order-actions { width: 100%; }
    .uh-btn-edit, .uh-btn-delete { flex: 1; justify-content: center; }
    .uh-edit-actions { flex-direction: column; }
  }
`;

export default UserHome;
