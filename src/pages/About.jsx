import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import UserLogin from "./UserLogin";
import ProtectedRoute from "../components/ProtectedRoute";

const About = () => {
  const { user, owner, isAuthenticated, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [changePassMode, setChangePassMode] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const API = "http://localhost:8765";

  useEffect(() => {
    if (user || owner) {
      const data = user || owner;
      setProfile(data);
      setRole(user ? "user" : "owner");
      setFormData({
        fullname: data.fullname || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    }
  }, [user, owner]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint =
        role === "user" ? "/api/auth/profile" : "/api/auth/ownerprofile";
      const res = await axios.put(`${API}${endpoint}`, formData, {
        withCredentials: true,
      });
      setProfile(res.data.profile);
      setEditMode(false);
      setMessageType("success");
      setMessage("Profile updated successfully!");
    } catch {
      setMessageType("error");
      setMessage("Error updating profile");
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passData.newPassword !== passData.confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const endpoint =
        role === "user"
          ? "/api/auth/change-password"
          : "/api/auth/owner-change-password";
      await axios.post(`${API}${endpoint}`, passData, {
        withCredentials: true,
      });
      setPassData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setChangePassMode(false);
      setMessageType("success");
      setMessage("Password changed successfully!");
    } catch (err) {
      setMessageType("error");
      setMessage(err?.response?.data?.message || "Error changing password");
    }
    setLoading(false);
  };

  if (!isAuthenticated) return <UserLogin />;
  if (!profile)
    return (
      <>
        <style>{styles}</style>
        <div className="ab-loading-screen">
          <div className="ab-spinner" />
          <p>Loading profile…</p>
        </div>
      </>
    );

  const initials = profile.fullname
    ? profile.fullname
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <ProtectedRoute>
      <style>{styles}</style>

      {/* ── Hero Banner ── */}
      <div className="ab-hero">
        <div className="ab-hero-overlay" />
        <div className="ab-hero-content">
          <div className="ab-brand-label">Rajesh Masala Agency</div>
          <p className="ab-brand-sub">
            Premium Wholesale Masala & Grocery Supplier
          </p>
        </div>
      </div>

      {/* ── Page Body ── */}
      <div className="ab-page">
        {/* Profile Card — floated up over hero */}
        <div className="ab-identity-card">
          <div className="ab-avatar">{initials}</div>
          <div className="ab-identity-info">
            <div className="ab-identity-name">{profile.fullname}</div>
            <div className="ab-identity-role">
              {role === "owner" ? "🏪 Owner Account" : "👤 User Account"}
            </div>
          </div>
        </div>

        {/* Toast */}
        {message && (
          <div
            className={`ab-toast ${messageType === "error" ? "ab-toast-error" : "ab-toast-success"}`}
          >
            {messageType === "success" ? "✓ " : "⚠ "}
            {message}
          </div>
        )}

        {/* Grid */}
        <div className="ab-grid">
          {/* ── Profile Card ── */}
          <div className="ab-card">
            <div className="ab-card-header">
              <div className="ab-card-icon">👤</div>
              <div>
                <div className="ab-card-title">Profile Information</div>
                <div className="ab-card-sub">Your personal details</div>
              </div>
            </div>

            {!editMode ? (
              <div className="ab-info-view">
                <div className="ab-info-row">
                  <span className="ab-info-label">Full Name</span>
                  <span className="ab-info-val">{profile.fullname || "—"}</span>
                </div>
                <div className="ab-info-row">
                  <span className="ab-info-label">Phone</span>
                  <span className="ab-info-val">{profile.phone || "—"}</span>
                </div>
                <div className="ab-info-row ab-info-row-last">
                  <span className="ab-info-label">Address</span>
                  <span className="ab-info-val ab-info-address">
                    {profile.address || "—"}
                  </span>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="ab-btn ab-btn-primary"
                >
                  ✏️ Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="ab-form">
                <div className="ab-field">
                  <label className="ab-label">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullname}
                    onChange={(e) =>
                      setFormData({ ...formData, fullname: e.target.value })
                    }
                    className="ab-input"
                    placeholder="Your full name"
                  />
                </div>
                <div className="ab-field">
                  <label className="ab-label">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="ab-input"
                    placeholder="Your phone number"
                  />
                </div>
                <div className="ab-field">
                  <label className="ab-label">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="ab-input ab-textarea"
                    placeholder="Your delivery address"
                    rows={3}
                  />
                </div>
                <div className="ab-btn-row">
                  <button
                    type="submit"
                    className="ab-btn ab-btn-success"
                    disabled={loading}
                  >
                    {loading ? "Saving…" : "✓ Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="ab-btn ab-btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── Security Card ── */}
          <div className="ab-card">
            <div className="ab-card-header">
              <div className="ab-card-icon">🔐</div>
              <div>
                <div className="ab-card-title">Security</div>
                <div className="ab-card-sub">Manage your password & access</div>
              </div>
            </div>

            {!changePassMode ? (
              <div className="ab-security-idle">
                <div className="ab-security-hint">
                  <div className="ab-hint-icon">🛡️</div>
                  <p>
                    Keep your account safe by using a strong, unique password.
                  </p>
                </div>
                <button
                  onClick={() => setChangePassMode(true)}
                  className="ab-btn ab-btn-warning"
                >
                  🔑 Change Password
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordChange} className="ab-form">
                <div className="ab-field">
                  <label className="ab-label">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={passData.currentPassword}
                    onChange={(e) =>
                      setPassData({
                        ...passData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="ab-input"
                  />
                </div>
                <div className="ab-field">
                  <label className="ab-label">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={passData.newPassword}
                    onChange={(e) =>
                      setPassData({ ...passData, newPassword: e.target.value })
                    }
                    className="ab-input"
                  />
                </div>
                <div className="ab-field">
                  <label className="ab-label">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Re-enter new password"
                    value={passData.confirmPassword}
                    onChange={(e) =>
                      setPassData({
                        ...passData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="ab-input"
                  />
                </div>
                <div className="ab-btn-row">
                  <button
                    type="submit"
                    className="ab-btn ab-btn-warning"
                    disabled={loading}
                  >
                    {loading ? "Updating…" : "🔑 Update Password"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setChangePassMode(false)}
                    className="ab-btn ab-btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="ab-divider" />

            <button onClick={logout} className="ab-btn ab-btn-danger">
              ↩ Sign Out
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

/* ─── Styles ───────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --spice-900: #7c2d12;
    --spice-700: #c2410c;
    --spice-500: #f97316;
    --spice-100: #ffedd5;
    --spice-50:  #fff7ed;
    --green-700: #15803d;
    --green-100: #dcfce7;
    --red-600:   #dc2626;
    --red-100:   #fee2e2;
    --gray-800:  #1f2937;
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
    --shadow-hover: 0 8px 32px rgba(0,0,0,0.12);
    --transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body:    'DM Sans', system-ui, sans-serif;
  }

  /* Loading */
  .ab-loading-screen {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    font-family: var(--font-body);
    color: var(--gray-400);
    font-size: 0.95rem;
  }
  .ab-spinner {
    width: 38px; height: 38px;
    border: 3px solid var(--gray-200);
    border-top-color: var(--spice-500);
    border-radius: 50%;
    animation: ab-spin 0.8s linear infinite;
  }
  @keyframes ab-spin { to { transform: rotate(360deg); } }

  /* Hero */
  .ab-hero {
    position: relative;
    height: 220px;
    background: linear-gradient(135deg, #431407 0%, #7c2d12 50%, #9a3412 100%);
    overflow: hidden;
    font-family: var(--font-body);
  }
  .ab-hero-overlay {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 55% 60% at 85% 30%, rgba(249,115,22,0.2) 0%, transparent 65%),
      radial-gradient(ellipse 40% 50% at 10% 70%, rgba(124,45,18,0.5) 0%, transparent 70%);
    pointer-events: none;
  }
  .ab-hero-content {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 24px;
  }
  .ab-brand-label {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    color: var(--white);
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }
  .ab-brand-sub {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
    font-weight: 300;
    font-family: var(--font-body);
  }

  /* Page */
  .ab-page {
    background: var(--gray-50);
    min-height: calc(100vh - 220px);
    padding: 0 24px 80px;
    font-family: var(--font-body);
  }

  /* Identity card (overlaps hero) */
  .ab-identity-card {
    display: flex;
    align-items: center;
    gap: 16px;
    max-width: 860px;
    margin: -36px auto 32px;
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-xl);
    padding: 20px 28px;
    box-shadow: var(--shadow-card);
    position: relative;
    z-index: 2;
  }
  .ab-avatar {
    width: 60px; height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--spice-500), var(--spice-700));
    color: var(--white);
    font-family: var(--font-display);
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    letter-spacing: 0.02em;
  }
  .ab-identity-name {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--gray-800);
    margin-bottom: 3px;
  }
  .ab-identity-role {
    font-size: 0.8rem;
    color: var(--gray-400);
    font-weight: 400;
  }

  /* Toast */
  .ab-toast {
    max-width: 860px;
    margin: 0 auto 20px;
    padding: 12px 20px;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
    animation: ab-toast-in 0.3s ease;
  }
  @keyframes ab-toast-in { from { opacity:0; transform: translateY(-6px); } to { opacity:1; transform: none; } }
  .ab-toast-success { background: var(--green-100); color: var(--green-700); border: 1px solid #bbf7d0; }
  .ab-toast-error   { background: var(--red-100);   color: var(--red-600);   border: 1px solid #fecaca; }

  /* Grid */
  .ab-grid {
    max-width: 860px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media (max-width: 680px) {
    .ab-grid { grid-template-columns: 1fr; }
    .ab-identity-card { flex-direction: column; text-align: center; margin-top: -28px; }
  }

  /* Card */
  .ab-card {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-xl);
    padding: 28px;
    box-shadow: var(--shadow-card);
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .ab-card:hover { box-shadow: var(--shadow-hover); }

  .ab-card-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--gray-100);
  }
  .ab-card-icon {
    width: 42px; height: 42px;
    background: var(--spice-50);
    border-radius: var(--radius-md);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  .ab-card-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--gray-800);
    margin-bottom: 2px;
  }
  .ab-card-sub { font-size: 0.78rem; color: var(--gray-400); font-weight: 300; }

  /* Info view */
  .ab-info-view { display: flex; flex-direction: column; }
  .ab-info-row {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 12px 0;
    border-bottom: 1px solid var(--gray-100);
  }
  .ab-info-row-last { border-bottom: none; margin-bottom: 8px; }
  .ab-info-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--gray-400);
    font-weight: 500;
  }
  .ab-info-val { font-size: 0.95rem; color: var(--gray-800); font-weight: 500; }
  .ab-info-address { font-weight: 400; line-height: 1.5; color: var(--gray-600); }

  /* Form */
  .ab-form { display: flex; flex-direction: column; gap: 16px; }
  .ab-field { display: flex; flex-direction: column; gap: 6px; }
  .ab-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--gray-600);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .ab-input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid var(--gray-200);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--gray-800);
    background: var(--gray-50);
    transition: var(--transition);
    outline: none;
    box-sizing: border-box;
  }
  .ab-input:focus {
    border-color: var(--spice-500);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
  }
  .ab-textarea { resize: vertical; min-height: 80px; }

  /* Security idle */
  .ab-security-idle { display: flex; flex-direction: column; gap: 20px; }
  .ab-security-hint {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: var(--gray-50);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-lg);
    padding: 16px;
  }
  .ab-hint-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 1px; }
  .ab-security-hint p {
    font-size: 0.85rem;
    color: var(--gray-600);
    margin: 0;
    line-height: 1.5;
    font-weight: 300;
  }

  /* Divider */
  .ab-divider {
    height: 1px;
    background: var(--gray-100);
    margin: 20px 0 0;
  }

  /* Buttons */
  .ab-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    width: 100%;
    padding: 11px 20px;
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: none;
    margin-top: 4px;
  }
  .ab-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .ab-btn-primary  { background: var(--gray-800); color: var(--white); }
  .ab-btn-primary:hover  { background: var(--gray-600); transform: translateY(-1px); }
  .ab-btn-success  { background: var(--green-700); color: var(--white); }
  .ab-btn-success:hover  { background: #166534; transform: translateY(-1px); }
  .ab-btn-warning  { background: var(--spice-500); color: var(--white); }
  .ab-btn-warning:hover  { background: var(--spice-700); transform: translateY(-1px); }
  .ab-btn-danger   { background: var(--red-100); color: var(--red-600); }
  .ab-btn-danger:hover   { background: var(--red-600); color: var(--white); transform: translateY(-1px); }
  .ab-btn-ghost    { background: var(--gray-100); color: var(--gray-600); }
  .ab-btn-ghost:hover    { background: var(--gray-200); }

  .ab-btn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
`;

export default About;
