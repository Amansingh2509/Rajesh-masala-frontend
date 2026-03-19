import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import CreateItemOwner from "../item-owner/createitemowner";

const OwnerDashboard = () => {
  const { owner } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("products");

  // Search filters
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchTime, setSearchTime] = useState("");

  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
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
      fetchOrders();
    } catch (error) {
      alert(
        "Update failed: " + (error.response?.data?.message || error.message),
      );
    }
  };

  // ── Filtering logic ──
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);

    const nameMatch =
      searchName.trim() === "" ||
      order.userName?.toLowerCase().includes(searchName.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchName.toLowerCase());

    const dateMatch =
      searchDate === "" || orderDate.toLocaleDateString("en-CA") === searchDate; // YYYY-MM-DD

    const timeMatch =
      searchTime === "" ||
      (() => {
        const [filterH, filterM] = searchTime.split(":").map(Number);
        const orderH = orderDate.getHours();
        const orderM = orderDate.getMinutes();
        return orderH === filterH && Math.abs(orderM - filterM) <= 30;
      })();

    return nameMatch && dateMatch && timeMatch;
  });

  const clearFilters = () => {
    setSearchName("");
    setSearchDate("");
    setSearchTime("");
  };

  const hasFilters = searchName || searchDate || searchTime;

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <>
      <style>{styles}</style>
      <div className="od-root">
        {/* ── Sidebar ── */}
        <aside className="od-sidebar">
          <div className="od-sidebar-top">
            <div className="od-brand">
              <span className="od-brand-icon">🌶️</span>
              <div>
                <div className="od-brand-name">Rajesh Masala</div>
                <div className="od-brand-sub">Owner Panel</div>
              </div>
            </div>

            <div className="od-owner-card">
              <div className="od-owner-avatar">
                {owner?.fullname?.charAt(0)?.toUpperCase() || "O"}
              </div>
              <div>
                <div className="od-owner-name">
                  {owner?.fullname || "Owner"}
                </div>
                <div className="od-owner-role">Store Manager</div>
              </div>
            </div>

            {/* Stats */}
            <div className="od-stats">
              <div className="od-stat-item">
                <span className="od-stat-val">{orders.length}</span>
                <span className="od-stat-label">Total Orders</span>
              </div>
              <div className="od-stat-item">
                <span className="od-stat-val od-stat-amber">
                  {pendingCount}
                </span>
                <span className="od-stat-label">Pending</span>
              </div>
              <div className="od-stat-item">
                <span className="od-stat-val od-stat-green">
                  {deliveredCount}
                </span>
                <span className="od-stat-label">Delivered</span>
              </div>
              <div className="od-stat-item od-stat-wide">
                <span className="od-stat-val od-stat-spice">
                  ₹{totalRevenue.toLocaleString()}
                </span>
                <span className="od-stat-label">Revenue</span>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="od-nav">
            <button
              className={`od-nav-btn ${activeTab === "products" ? "od-nav-active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <span className="od-nav-icon">📦</span>
              <span>Products</span>
            </button>
            <button
              className={`od-nav-btn ${activeTab === "orders" ? "od-nav-active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <span className="od-nav-icon">📋</span>
              <span>Orders</span>
              {orders.length > 0 && (
                <span className="od-nav-badge">{orders.length}</span>
              )}
            </button>
          </nav>
        </aside>

        {/* ── Main ── */}
        <main className="od-main">
          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="od-panel">
              <div className="od-panel-header">
                <div>
                  <div className="od-panel-pill">Inventory</div>
                  <h2 className="od-panel-title">Manage Products</h2>
                  <p className="od-panel-sub">
                    Add and manage your store catalogue
                  </p>
                </div>
              </div>
              <CreateItemOwner />
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="od-panel">
              <div className="od-panel-header">
                <div>
                  <div className="od-panel-pill">Orders</div>
                  <h2 className="od-panel-title">Manage Orders</h2>
                  <p className="od-panel-sub">
                    {hasFilters
                      ? `${filteredOrders.length} of ${orders.length} orders matching filters`
                      : `${orders.length} total orders received`}
                  </p>
                </div>
                <button onClick={fetchOrders} className="od-refresh-btn">
                  ↻ Refresh
                </button>
              </div>

              {/* ── Search Filters ── */}
              <div className="od-filters">
                <div className="od-filter-title">
                  <span>🔍</span> Search & Filter
                </div>
                <div className="od-filter-grid">
                  {/* Name / Order ID */}
                  <div className="od-filter-field">
                    <label className="od-filter-label">
                      Customer Name or Order ID
                    </label>
                    <div className="od-input-wrap">
                      <svg
                        className="od-input-icon"
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
                        className="od-filter-input"
                        placeholder="e.g. Ramesh or #A1B2C3"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                      />
                      {searchName && (
                        <button
                          className="od-input-clear"
                          onClick={() => setSearchName("")}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="od-filter-field">
                    <label className="od-filter-label">Order Date</label>
                    <div className="od-input-wrap">
                      <svg
                        className="od-input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <input
                        type="date"
                        className="od-filter-input"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                      />
                      {searchDate && (
                        <button
                          className="od-input-clear"
                          onClick={() => setSearchDate("")}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="od-filter-field">
                    <label className="od-filter-label">
                      Approximate Time (±30 min)
                    </label>
                    <div className="od-input-wrap">
                      <svg
                        className="od-input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <input
                        type="time"
                        className="od-filter-input"
                        value={searchTime}
                        onChange={(e) => setSearchTime(e.target.value)}
                      />
                      {searchTime && (
                        <button
                          className="od-input-clear"
                          onClick={() => setSearchTime("")}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {hasFilters && (
                  <div className="od-filter-footer">
                    <div className="od-filter-chips">
                      {searchName && (
                        <span className="od-chip">👤 "{searchName}"</span>
                      )}
                      {searchDate && (
                        <span className="od-chip">
                          📅{" "}
                          {new Date(
                            searchDate + "T00:00:00",
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      {searchTime && (
                        <span className="od-chip">🕐 ~{searchTime}</span>
                      )}
                    </div>
                    <button className="od-clear-all" onClick={clearFilters}>
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>

              {/* Orders List */}
              {loading ? (
                <div className="od-loading">
                  <div className="od-spinner" />
                  <p>Loading orders…</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="od-empty">
                  <div className="od-empty-icon">
                    {hasFilters ? "🔍" : "📦"}
                  </div>
                  <h3 className="od-empty-title">
                    {hasFilters
                      ? "No orders match your filters"
                      : "No orders yet"}
                  </h3>
                  <p className="od-empty-sub">
                    {hasFilters
                      ? "Try adjusting your search criteria."
                      : "Start accepting orders from customers!"}
                  </p>
                  {hasFilters && (
                    <button className="od-clear-all-btn" onClick={clearFilters}>
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="od-orders-list">
                  {filteredOrders.map((order, idx) => (
                    <div
                      key={order._id}
                      className="od-order-card"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      {/* Card Header */}
                      <div className="od-order-head">
                        <div className="od-order-id-block">
                          <span className="od-order-id">
                            #{order._id.slice(-6).toUpperCase()}
                          </span>
                          <span className="od-order-time">
                            {new Date(order.createdAt).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <span
                          className={`od-status-badge od-status-${order.status || "pending"}`}
                        >
                          {statusLabel(order.status)}
                        </span>
                      </div>

                      {/* Customer */}
                      <div className="od-customer-row">
                        <div className="od-customer-avatar">
                          {order.userName?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <div className="od-customer-name">
                            {order.userName || "Unknown"}
                          </div>
                          <div className="od-customer-address">
                            📍 {order.user?.address || "No address provided"}
                          </div>
                        </div>
                        <div className="od-order-total">
                          ₹{order.totalAmount.toFixed(2)}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="od-items-grid">
                        {order.items.map((item, i) => (
                          <div key={i} className="od-item-chip">
                            <div className="od-item-dot" />
                            <div>
                              <div className="od-item-name">
                                {item.productName}
                              </div>
                              <div className="od-item-meta">
                                ×{item.quantity} ·{" "}
                                <span className="od-item-price">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Status Updater */}
                      <div className="od-order-footer">
                        <label className="od-select-label">Update Status</label>
                        <select
                          value={order.status || "pending"}
                          onChange={(e) =>
                            updateStatus(order._id, e.target.value)
                          }
                          className="od-status-select"
                        >
                          <option value="pending">⏳ Pending</option>
                          <option value="accepted">✅ Accepted</option>
                          <option value="delivered">🚚 Delivered</option>
                          <option value="not-available">
                            ❌ Not Available
                          </option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

const statusLabel = (status) => {
  const map = {
    pending: "⏳ Pending",
    accepted: "✅ Accepted",
    delivered: "🚚 Delivered",
    "not-available": "❌ Not Available",
  };
  return map[status] || "⏳ Pending";
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --spice:    #f97316;
    --spice-dk: #c2410c;
    --spice-lt: #fff7ed;
    --green:    #16a34a;
    --green-lt: #f0fdf4;
    --amber:    #d97706;
    --amber-lt: #fffbeb;
    --red:      #dc2626;
    --red-lt:   #fef2f2;
    --blue:     #2563eb;
    --blue-lt:  #eff6ff;
    --gray-950: #030712;
    --gray-900: #111827;
    --gray-800: #1f2937;
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

  /* Layout */
  .od-root {
    display: flex;
    min-height: 100vh;
    font-family: var(--font-b);
    background: var(--gray-50);
  }

  /* ── Sidebar ── */
  .od-sidebar {
    width: 260px;
    flex-shrink: 0;
    background: var(--gray-900);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }
  .od-sidebar-top { padding: 28px 20px 20px; flex: 1; }

  /* Brand */
  .od-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .od-brand-icon { font-size: 1.5rem; }
  .od-brand-name { font-family: var(--font-d); font-size: 1rem; color: var(--white); }
  .od-brand-sub  { font-size: 0.68rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.08em; }

  /* Owner card */
  .od-owner-card {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--r-lg);
    padding: 14px;
    margin-bottom: 24px;
  }
  .od-owner-avatar {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, var(--spice), var(--spice-dk));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--white); font-weight: 700; font-size: 1rem; flex-shrink: 0;
  }
  .od-owner-name { font-size: 0.875rem; font-weight: 600; color: var(--white); }
  .od-owner-role { font-size: 0.7rem; color: rgba(255,255,255,0.4); }

  /* Stats */
  .od-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 28px;
  }
  .od-stat-item {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--r-md);
    padding: 12px 14px;
    display: flex; flex-direction: column; gap: 3px;
  }
  .od-stat-wide { grid-column: 1 / -1; }
  .od-stat-val   { font-family: var(--font-d); font-size: 1.3rem; color: var(--white); }
  .od-stat-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.07em; color: rgba(255,255,255,0.4); }
  .od-stat-amber { color: #fbbf24; }
  .od-stat-green { color: #4ade80; }
  .od-stat-spice { color: var(--spice); }

  /* Nav */
  .od-nav { padding: 0 12px 24px; display: flex; flex-direction: column; gap: 4px; }
  .od-nav-btn {
    display: flex; align-items: center; gap: 12px;
    width: 100%; padding: 12px 14px;
    background: none; border: none; border-radius: var(--r-md);
    font-family: var(--font-b); font-size: 0.875rem; font-weight: 500;
    color: rgba(255,255,255,0.55); cursor: pointer; transition: var(--tr);
    text-align: left; position: relative;
  }
  .od-nav-btn:hover { background: rgba(255,255,255,0.07); color: var(--white); }
  .od-nav-active { background: rgba(249,115,22,0.15) !important; color: var(--spice) !important; font-weight: 600; }
  .od-nav-icon  { font-size: 1.1rem; }
  .od-nav-badge {
    margin-left: auto; background: var(--spice); color: var(--white);
    font-size: 0.65rem; font-weight: 700; padding: 2px 7px; border-radius: 100px;
  }

  /* ── Main ── */
  .od-main { flex: 1; padding: 32px 28px; min-width: 0; }

  /* Panel */
  .od-panel { max-width: 1000px; }
  .od-panel-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 16px; flex-wrap: wrap; margin-bottom: 28px;
  }
  .od-panel-pill {
    display: inline-block; font-size: 0.68rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--spice-dk); background: var(--spice-lt);
    border: 1px solid #fed7aa; border-radius: 100px;
    padding: 4px 13px; margin-bottom: 10px;
  }
  .od-panel-title {
    font-family: var(--font-d); font-size: clamp(1.5rem, 3vw, 2rem);
    color: var(--gray-900); margin: 0 0 6px; letter-spacing: -0.02em;
  }
  .od-panel-sub { font-size: 0.875rem; color: var(--gray-400); font-weight: 300; }
  .od-refresh-btn {
    font-family: var(--font-b); font-size: 0.825rem; font-weight: 600;
    color: var(--gray-600); background: var(--white); border: 1.5px solid var(--gray-200);
    padding: 9px 18px; border-radius: var(--r-md); cursor: pointer; transition: var(--tr);
    white-space: nowrap;
  }
  .od-refresh-btn:hover { border-color: var(--spice); color: var(--spice); }

  /* ── Filters ── */
  .od-filters {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--r-xl);
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: var(--shadow);
  }
  .od-filter-title {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.8rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.07em; color: var(--gray-600); margin-bottom: 16px;
  }
  .od-filter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
  }
  .od-filter-field { display: flex; flex-direction: column; gap: 6px; }
  .od-filter-label {
    font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.06em; color: var(--gray-600);
  }
  .od-input-wrap {
    position: relative; display: flex; align-items: center;
    background: var(--gray-50); border: 1.5px solid var(--gray-200);
    border-radius: var(--r-md); transition: var(--tr);
  }
  .od-input-wrap:focus-within {
    border-color: var(--spice); background: var(--white);
    box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
  }
  .od-input-icon {
    width: 15px; height: 15px; color: var(--gray-400);
    margin: 0 10px; flex-shrink: 0; transition: color 0.2s;
  }
  .od-input-wrap:focus-within .od-input-icon { color: var(--spice); }
  .od-filter-input {
    flex: 1; padding: 10px 0; border: none; background: transparent;
    font-family: var(--font-b); font-size: 0.875rem; color: var(--gray-900); outline: none;
  }
  .od-filter-input::placeholder { color: var(--gray-400); font-weight: 300; }
  .od-input-clear {
    width: 24px; height: 24px; margin-right: 8px; background: var(--gray-200);
    border: none; border-radius: 50%; color: var(--gray-600); font-size: 0.6rem;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: var(--tr);
  }
  .od-input-clear:hover { background: var(--gray-300); }

  /* Filter footer / chips */
  .od-filter-footer {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; margin-top: 16px; padding-top: 16px;
    border-top: 1px solid var(--gray-100); flex-wrap: wrap;
  }
  .od-filter-chips { display: flex; gap: 8px; flex-wrap: wrap; }
  .od-chip {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--spice-lt); border: 1px solid #fed7aa;
    color: var(--spice-dk); font-size: 0.75rem; font-weight: 500;
    padding: 4px 12px; border-radius: 100px;
  }
  .od-clear-all {
    font-size: 0.78rem; font-weight: 600; color: var(--gray-400);
    background: none; border: none; cursor: pointer; transition: color 0.2s;
    white-space: nowrap;
  }
  .od-clear-all:hover { color: var(--red); }

  /* Loading */
  .od-loading {
    text-align: center; padding: 80px 0;
    color: var(--gray-400); font-size: 0.95rem;
  }
  .od-spinner {
    width: 40px; height: 40px; border: 3px solid var(--gray-200);
    border-top-color: var(--spice); border-radius: 50%;
    animation: od-spin 0.8s linear infinite; margin: 0 auto 16px;
  }
  @keyframes od-spin { to { transform: rotate(360deg); } }

  /* Empty */
  .od-empty { text-align: center; padding: 80px 24px; }
  .od-empty-icon  { font-size: 3rem; margin-bottom: 16px; }
  .od-empty-title {
    font-family: var(--font-d); font-size: 1.5rem;
    color: var(--gray-900); margin-bottom: 8px;
  }
  .od-empty-sub { font-size: 0.9rem; color: var(--gray-400); font-weight: 300; margin-bottom: 20px; }
  .od-clear-all-btn {
    display: inline-block; background: var(--gray-900); color: var(--white);
    font-family: var(--font-b); font-size: 0.875rem; font-weight: 600;
    padding: 10px 24px; border-radius: var(--r-md); border: none; cursor: pointer; transition: var(--tr);
  }
  .od-clear-all-btn:hover { background: var(--gray-700); }

  /* Orders list */
  .od-orders-list { display: flex; flex-direction: column; gap: 16px; }

  /* Order card */
  .od-order-card {
    background: var(--white); border: 1px solid var(--gray-200);
    border-radius: var(--r-xl); padding: 24px;
    box-shadow: var(--shadow); transition: var(--tr);
    animation: od-fade-up 0.4s ease both;
  }
  .od-order-card:hover { box-shadow: var(--shadow-h); border-color: #fed7aa; transform: translateY(-2px); }
  @keyframes od-fade-up { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: none; } }

  /* Card header */
  .od-order-head {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 16px; gap: 12px; flex-wrap: wrap;
  }
  .od-order-id-block { display: flex; flex-direction: column; gap: 3px; }
  .od-order-id {
    font-family: var(--font-d); font-size: 1.05rem; color: var(--gray-900); font-weight: 600;
  }
  .od-order-time { font-size: 0.75rem; color: var(--gray-400); }

  /* Status badge */
  .od-status-badge {
    font-size: 0.72rem; font-weight: 600; padding: 5px 12px; border-radius: 100px;
    letter-spacing: 0.02em; white-space: nowrap;
  }
  .od-status-pending       { background: var(--amber-lt); color: var(--amber); border: 1px solid #fde68a; }
  .od-status-accepted      { background: var(--blue-lt);  color: var(--blue);  border: 1px solid #bfdbfe; }
  .od-status-delivered     { background: var(--green-lt); color: var(--green); border: 1px solid #bbf7d0; }
  .od-status-not-available { background: var(--red-lt);   color: var(--red);   border: 1px solid #fecaca; }

  /* Customer row */
  .od-customer-row {
    display: flex; align-items: center; gap: 12px;
    background: var(--gray-50); border: 1px solid var(--gray-100);
    border-radius: var(--r-lg); padding: 14px 16px; margin-bottom: 16px;
  }
  .od-customer-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, #e0e7ff, #818cf8);
    display: flex; align-items: center; justify-content: center;
    color: #3730a3; font-weight: 700; font-size: 0.95rem; flex-shrink: 0;
  }
  .od-customer-name { font-size: 0.9rem; font-weight: 600; color: var(--gray-900); }
  .od-customer-address { font-size: 0.775rem; color: var(--gray-400); font-weight: 300; margin-top: 2px; }
  .od-order-total {
    margin-left: auto; font-family: var(--font-d);
    font-size: 1.3rem; color: var(--green); flex-shrink: 0;
  }

  /* Items grid */
  .od-items-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 10px; margin-bottom: 20px;
  }
  .od-item-chip {
    display: flex; align-items: flex-start; gap: 10px;
    background: var(--gray-50); border: 1px solid var(--gray-100);
    border-radius: var(--r-md); padding: 10px 12px;
  }
  .od-item-dot {
    width: 7px; height: 7px; border-radius: 50%; background: var(--spice);
    flex-shrink: 0; margin-top: 5px;
  }
  .od-item-name  { font-size: 0.84rem; font-weight: 500; color: var(--gray-900); margin-bottom: 2px; }
  .od-item-meta  { font-size: 0.75rem; color: var(--gray-400); }
  .od-item-price { color: var(--green); font-weight: 600; }

  /* Order footer */
  .od-order-footer {
    display: flex; align-items: center; gap: 12px;
    padding-top: 16px; border-top: 1px solid var(--gray-100);
    flex-wrap: wrap;
  }
  .od-select-label {
    font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.06em; color: var(--gray-400); white-space: nowrap;
  }
  .od-status-select {
    flex: 1; min-width: 160px; max-width: 240px;
    padding: 9px 14px; font-family: var(--font-b); font-size: 0.875rem;
    color: var(--gray-800); background: var(--gray-50);
    border: 1.5px solid var(--gray-200); border-radius: var(--r-md);
    outline: none; cursor: pointer; transition: var(--tr);
    appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px;
  }
  .od-status-select:focus { border-color: var(--spice); box-shadow: 0 0 0 3px rgba(249,115,22,0.1); background-color: var(--white); }

  /* Responsive */
  @media (max-width: 860px) {
    .od-sidebar { width: 220px; }
    .od-main { padding: 24px 16px; }
  }
  @media (max-width: 640px) {
    .od-root { flex-direction: column; }
    .od-sidebar { width: 100%; height: auto; position: static; }
    .od-sidebar-top { padding: 20px 16px 12px; }
    .od-nav { flex-direction: row; padding: 0 16px 16px; }
    .od-nav-btn { flex: 1; justify-content: center; }
    .od-main { padding: 20px 16px; }
    .od-filter-grid { grid-template-columns: 1fr; }
    .od-items-grid { grid-template-columns: 1fr; }
  }
`;

export default OwnerDashboard;
