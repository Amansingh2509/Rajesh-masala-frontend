import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const OwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8765/api/auth/owner/login",
        { email, password },
        { withCredentials: true },
      );
      if (response.status === 200) {
        login("owner", response.data.owner);
        navigate("/owner/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ol-root">
        {/* ── Left Panel ── */}
        <div className="ol-left">
          <div className="ol-left-inner">
            <div className="ol-brand">
              <span className="ol-brand-icon">🌶️</span>
              <span className="ol-brand-name">Rajesh Masala</span>
            </div>

            <h1 className="ol-hero-title">
              Your store,
              <br />
              <em>your control.</em>
            </h1>
            <p className="ol-hero-sub">
              Sign in to your owner panel to manage products, track orders, and
              grow your business.
            </p>

            <div className="ol-features">
              {[
                { icon: "📦", text: "Manage your full product catalogue" },
                { icon: "📋", text: "View and update customer orders" },
                { icon: "📊", text: "Track revenue and order history" },
                { icon: "🔐", text: "Secure owner-only access" },
              ].map(({ icon, text }) => (
                <div key={text} className="ol-feature-row">
                  <span className="ol-feature-icon">{icon}</span>
                  <span className="ol-feature-text">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="ol-right">
          <div className="ol-card">
            {/* Badge */}
            <div className="ol-badge">
              <span className="ol-badge-dot" />
              Owner Portal
            </div>

            <h2 className="ol-card-title">Welcome back</h2>
            <p className="ol-card-sub">Sign in to access your dashboard</p>

            {/* Error */}
            {error && (
              <div className="ol-error">
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="ol-form">
              {/* Email */}
              <div className="ol-field">
                <label className="ol-label">Owner Email</label>
                <div className="ol-input-wrap">
                  <svg
                    className="ol-input-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    type="email"
                    placeholder="owner@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                    className="ol-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="ol-field">
                <label className="ol-label">Password</label>
                <div className="ol-input-wrap">
                  <svg
                    className="ol-input-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                    className="ol-input"
                  />
                  <button
                    type="button"
                    className="ol-eye-btn"
                    onClick={() => setShowPass((v) => !v)}
                    tabIndex={-1}
                    aria-label="Toggle password"
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="ol-submit-btn"
              >
                {loading ? (
                  <>
                    <span className="ol-spinner" /> Signing in…
                  </>
                ) : (
                  "Sign In to Dashboard →"
                )}
              </button>
            </form>

            {/* Register link */}
            <p className="ol-register-hint">
              New owner?{" "}
              <Link to="/owner/register" className="ol-link">
                Register an account
              </Link>
            </p>

            {/* Divider */}
            <div className="ol-divider">
              <span>or</span>
            </div>

            {/* User login */}
            <Link to="/user/login" className="ol-user-btn">
              👤 Login as User instead
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --indigo:    #4f46e5;
    --indigo-dk: #3730a3;
    --indigo-lt: #eef2ff;
    --spice:     #f97316;
    --spice-lt:  #fff7ed;
    --red:       #dc2626;
    --red-lt:    #fef2f2;
    --gray-900:  #111827;
    --gray-700:  #374151;
    --gray-600:  #4b5563;
    --gray-400:  #9ca3af;
    --gray-200:  #e5e7eb;
    --gray-100:  #f3f4f6;
    --gray-50:   #f9fafb;
    --white:     #ffffff;
    --font-d: 'Playfair Display', Georgia, serif;
    --font-b: 'DM Sans', system-ui, sans-serif;
    --tr: all 0.22s cubic-bezier(0.4,0,0.2,1);
    --r-xl: 20px; --r-lg: 14px; --r-md: 10px;
    --shadow: 0 2px 16px rgba(0,0,0,0.07);
    --shadow-h: 0 8px 32px rgba(0,0,0,0.12);
  }

  .ol-root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
    font-family: var(--font-b);
  }

  /* ── Left Panel ── */
  .ol-left {
    background: linear-gradient(150deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%);
    display: flex; align-items: center; position: relative; overflow: hidden;
  }
  .ol-left::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 55% 50% at 85% 25%, rgba(99,102,241,0.25) 0%, transparent 65%),
      radial-gradient(ellipse 40% 55% at 5%  75%, rgba(49,46,129,0.5)  0%, transparent 65%);
    pointer-events: none;
  }
  .ol-left-inner {
    position: relative; z-index: 1;
    padding: 64px 52px;
    display: flex; flex-direction: column; gap: 0;
  }

  .ol-brand {
    display: flex; align-items: center; gap: 10px; margin-bottom: 40px;
  }
  .ol-brand-icon { font-size: 1.4rem; }
  .ol-brand-name {
    font-family: var(--font-d); font-size: 1.1rem; color: rgba(255,255,255,0.9);
  }

  .ol-hero-title {
    font-family: var(--font-d);
    font-size: clamp(2rem, 4vw, 3rem);
    color: var(--white); line-height: 1.1;
    letter-spacing: -0.02em; margin: 0 0 18px;
  }
  .ol-hero-title em { color: #a5b4fc; font-style: italic; }

  .ol-hero-sub {
    font-size: 0.9rem; color: rgba(255,255,255,0.55);
    font-weight: 300; line-height: 1.75; margin-bottom: 40px; max-width: 340px;
  }

  /* Feature list */
  .ol-features { display: flex; flex-direction: column; gap: 14px; }
  .ol-feature-row { display: flex; align-items: center; gap: 14px; }
  .ol-feature-icon {
    width: 36px; height: 36px; flex-shrink: 0;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
    border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 1rem;
  }
  .ol-feature-text { font-size: 0.85rem; color: rgba(255,255,255,0.7); font-weight: 400; }

  /* ── Right Panel ── */
  .ol-right {
    background: var(--gray-50);
    display: flex; align-items: center; justify-content: center; padding: 48px 24px;
  }
  .ol-card {
    width: 100%; max-width: 420px;
    background: var(--white); border: 1px solid var(--gray-200);
    border-radius: var(--r-xl); padding: 40px 36px;
    box-shadow: var(--shadow);
  }

  /* Badge */
  .ol-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--indigo-lt); border: 1px solid #c7d2fe;
    color: var(--indigo); font-size: 0.72rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.09em;
    padding: 5px 14px; border-radius: 100px; margin-bottom: 20px;
  }
  .ol-badge-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--indigo);
    animation: ol-pulse 2s ease infinite;
  }
  @keyframes ol-pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }

  .ol-card-title {
    font-family: var(--font-d); font-size: 1.7rem; color: var(--gray-900);
    margin: 0 0 6px; letter-spacing: -0.02em;
  }
  .ol-card-sub { font-size: 0.85rem; color: var(--gray-400); font-weight: 300; margin-bottom: 28px; }

  /* Error */
  .ol-error {
    display: flex; align-items: center; gap: 8px;
    background: var(--red-lt); border: 1px solid #fecaca;
    color: var(--red); font-size: 0.85rem; font-weight: 500;
    padding: 11px 14px; border-radius: var(--r-md); margin-bottom: 20px;
    animation: ol-fade-in 0.3s ease;
  }
  @keyframes ol-fade-in { from { opacity:0; transform: translateY(-4px); } to { opacity:1; transform:none; } }

  /* Form */
  .ol-form { display: flex; flex-direction: column; gap: 18px; margin-bottom: 20px; }
  .ol-field { display: flex; flex-direction: column; gap: 6px; }
  .ol-label {
    font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.07em; color: var(--gray-600);
  }
  .ol-input-wrap {
    position: relative; display: flex; align-items: center;
    background: var(--gray-50); border: 1.5px solid var(--gray-200);
    border-radius: var(--r-md); transition: var(--tr);
  }
  .ol-input-wrap:focus-within {
    border-color: var(--indigo); background: var(--white);
    box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
  }
  .ol-input-icon {
    width: 16px; height: 16px; color: var(--gray-400);
    margin: 0 12px; flex-shrink: 0; transition: color 0.2s;
  }
  .ol-input-wrap:focus-within .ol-input-icon { color: var(--indigo); }
  .ol-input {
    flex: 1; padding: 12px 0; border: none; background: transparent;
    font-family: var(--font-b); font-size: 0.9rem; color: var(--gray-900); outline: none;
  }
  .ol-input::placeholder { color: var(--gray-400); font-weight: 300; }
  .ol-input:disabled { opacity: 0.6; }
  .ol-eye-btn {
    background: none; border: none; cursor: pointer; padding: 0 12px;
    font-size: 0.9rem; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
  }
  .ol-eye-btn:hover { opacity: 1; }

  /* Submit */
  .ol-submit-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 13px; margin-top: 4px;
    background: linear-gradient(135deg, var(--indigo), var(--indigo-dk));
    color: var(--white); border: none; border-radius: var(--r-md);
    font-family: var(--font-b); font-size: 0.9rem; font-weight: 600;
    cursor: pointer; transition: var(--tr);
    box-shadow: 0 2px 12px rgba(79,70,229,0.3);
  }
  .ol-submit-btn:hover:not(:disabled) {
    transform: translateY(-1px); box-shadow: 0 6px 20px rgba(79,70,229,0.4);
  }
  .ol-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .ol-spinner {
    width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%; animation: ol-spin 0.7s linear infinite;
  }
  @keyframes ol-spin { to { transform: rotate(360deg); } }

  /* Register hint */
  .ol-register-hint { font-size: 0.825rem; color: var(--gray-400); text-align: center; margin-bottom: 20px; }
  .ol-link { color: var(--indigo); font-weight: 600; text-decoration: none; }
  .ol-link:hover { text-decoration: underline; }

  /* Divider */
  .ol-divider {
    display: flex; align-items: center; gap: 12px;
    color: var(--gray-400); font-size: 0.75rem; margin-bottom: 16px;
  }
  .ol-divider::before, .ol-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--gray-200);
  }

  /* User login btn */
  .ol-user-btn {
    display: block; width: 100%; text-align: center; text-decoration: none;
    font-family: var(--font-b); font-size: 0.875rem; font-weight: 600;
    color: var(--gray-700); background: var(--gray-100);
    border: 1.5px solid var(--gray-200); border-radius: var(--r-md);
    padding: 11px; transition: var(--tr); box-sizing: border-box;
  }
  .ol-user-btn:hover { border-color: var(--gray-400); background: var(--gray-200); }

  /* Responsive */
  @media (max-width: 768px) {
    .ol-root { grid-template-columns: 1fr; }
    .ol-left { display: none; }
    .ol-right { padding: 32px 16px; min-height: 100vh; }
    .ol-card { padding: 32px 24px; }
  }
`;

export default OwnerLogin;
