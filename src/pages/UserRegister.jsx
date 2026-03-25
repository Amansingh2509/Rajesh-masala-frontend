import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API_BASE } from "../utils/api.js";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${API_BASE}/api/auth/user/register`,
        formData,
        { withCredentials: true },
      );
      if (response.status === 201) {
        navigate("/user/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "fullname",
      label: "Full Name",
      type: "text",
      placeholder: "e.g. Ramesh Sharma",
      icon: "person",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "you@example.com",
      icon: "mail",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+91 XXXXX XXXXX",
      icon: "phone",
    },
    {
      name: "address",
      label: "Delivery Address",
      type: "text",
      placeholder: "Your home or shop address",
      icon: "pin",
    },
  ];

  const iconPaths = {
    person: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </>
    ),
    mail: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .91h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    ),
    pin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    lock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </>
    ),
  };

  const Icon = ({ type }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
    >
      {iconPaths[type]}
    </svg>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="ur-root">
        {/* ── Left Panel ── */}
        <div className="ur-left">
          <div className="ur-left-inner">
            <div className="ur-brand">
              <span className="ur-brand-icon">🌶️</span>
              <span className="ur-brand-name">Rajesh Masala</span>
            </div>

            <h1 className="ur-hero-title">
              Start shopping
              <br />
              <em>in minutes.</em>
            </h1>
            <p className="ur-hero-sub">
              Create your free account and instantly access our full catalogue
              of premium masala, grocery, and wholesale supplies.
            </p>

            <div className="ur-steps">
              <div className="ur-step-label">How it works</div>
              {[
                { n: "1", text: "Fill in your personal details" },
                { n: "2", text: "Your account is created instantly" },
                { n: "3", text: "Browse & add products to cart" },
                { n: "4", text: "Place orders & track delivery" },
              ].map(({ n, text }) => (
                <div key={n} className="ur-step-row">
                  <span className="ur-step-num">{n}</span>
                  <span className="ur-step-text">{text}</span>
                </div>
              ))}
            </div>

            <div className="ur-already">
              Already have an account?{" "}
              <Link to="/user/login" className="ur-already-link">
                Sign in →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="ur-right">
          <div className="ur-card">
            <div className="ur-badge">
              <span className="ur-badge-dot" />
              User Registration
            </div>

            <h2 className="ur-card-title">Create your account</h2>
            <p className="ur-card-sub">
              Free to join — takes less than a minute
            </p>

            {error && (
              <div className="ur-error">
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="ur-form">
              {fields.map(({ name, label, type, placeholder, icon }) => (
                <div key={name} className="ur-field">
                  <label className="ur-label">{label}</label>
                  <div className="ur-input-wrap">
                    <span className="ur-input-icon">
                      <Icon type={icon} />
                    </span>
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="ur-input"
                    />
                  </div>
                </div>
              ))}

              {/* Password */}
              <div className="ur-field">
                <label className="ur-label">Password</label>
                <div className="ur-input-wrap">
                  <span className="ur-input-icon">
                    <Icon type="lock" />
                  </span>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="ur-input"
                  />
                  <button
                    type="button"
                    className="ur-eye-btn"
                    onClick={() => setShowPass((v) => !v)}
                    tabIndex={-1}
                    aria-label="Toggle password"
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="ur-submit-btn"
              >
                {loading ? (
                  <>
                    <span className="ur-spinner" /> Creating account…
                  </>
                ) : (
                  "Create Account →"
                )}
              </button>
            </form>

            <p className="ur-login-hint">
              Already registered?{" "}
              <Link to="/user/login" className="ur-link">
                Sign in here
              </Link>
            </p>

            <div className="ur-divider">
              <span>or</span>
            </div>

            <Link to="/owner/register" className="ur-owner-btn">
              🏪 Register as Owner instead
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
    --green:    #16a34a;
    --green-dk: #14532d;
    --green-lt: #f0fdf4;
    --red:      #dc2626;
    --red-lt:   #fef2f2;
    --gray-900: #111827;
    --gray-600: #4b5563;
    --gray-400: #9ca3af;
    --gray-200: #e5e7eb;
    --gray-100: #f3f4f6;
    --gray-50:  #f9fafb;
    --white:    #ffffff;
    --font-d: 'Playfair Display', Georgia, serif;
    --font-b: 'DM Sans', system-ui, sans-serif;
    --tr: all 0.22s cubic-bezier(0.4,0,0.2,1);
    --r-xl: 20px; --r-lg: 14px; --r-md: 10px;
    --shadow: 0 2px 16px rgba(0,0,0,0.07);
  }

  .ur-root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
    font-family: var(--font-b);
  }

  /* ── Left ── */
  .ur-left {
    background: linear-gradient(150deg, #052e16 0%, #14532d 50%, #166534 100%);
    display: flex; align-items: center; position: relative; overflow: hidden;
  }
  .ur-left::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 55% 50% at 85% 20%, rgba(34,197,94,0.15) 0%, transparent 65%),
      radial-gradient(ellipse 40% 55% at 5%  80%, rgba(5,46,22,0.5)   0%, transparent 65%);
    pointer-events: none;
  }
  .ur-left-inner {
    position: relative; z-index: 1;
    padding: 64px 52px;
    display: flex; flex-direction: column;
  }

  .ur-brand {
    display: flex; align-items: center; gap: 10px; margin-bottom: 36px;
  }
  .ur-brand-icon { font-size: 1.4rem; }
  .ur-brand-name { font-family: var(--font-d); font-size: 1.1rem; color: rgba(255,255,255,0.9); }

  .ur-hero-title {
    font-family: var(--font-d);
    font-size: clamp(1.9rem, 3.5vw, 2.9rem);
    color: var(--white); line-height: 1.1;
    letter-spacing: -0.02em; margin: 0 0 18px;
  }
  .ur-hero-title em { color: #86efac; font-style: italic; }
  .ur-hero-sub {
    font-size: 0.875rem; color: rgba(255,255,255,0.55);
    font-weight: 300; line-height: 1.75;
    margin-bottom: 36px; max-width: 340px;
  }

  /* Steps */
  .ur-steps { display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px; }
  .ur-step-label {
    font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em;
    color: rgba(255,255,255,0.35); font-weight: 600; margin-bottom: 4px;
  }
  .ur-step-row { display: flex; align-items: center; gap: 14px; }
  .ur-step-num {
    width: 26px; height: 26px; flex-shrink: 0;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700; color: #86efac;
  }
  .ur-step-text { font-size: 0.85rem; color: rgba(255,255,255,0.7); }

  .ur-already { font-size: 0.825rem; color: rgba(255,255,255,0.45); }
  .ur-already-link { color: #86efac; font-weight: 600; text-decoration: none; }
  .ur-already-link:hover { text-decoration: underline; }

  /* ── Right ── */
  .ur-right {
    background: var(--gray-50);
    display: flex; align-items: center; justify-content: center;
    padding: 48px 24px; overflow-y: auto;
  }
  .ur-card {
    width: 100%; max-width: 440px;
    background: var(--white); border: 1px solid var(--gray-200);
    border-radius: var(--r-xl); padding: 36px 32px;
    box-shadow: var(--shadow);
  }

  /* Badge */
  .ur-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--green-lt); border: 1px solid #bbf7d0;
    color: var(--green); font-size: 0.72rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.09em;
    padding: 5px 14px; border-radius: 100px; margin-bottom: 18px;
  }
  .ur-badge-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--green);
    animation: ur-pulse 2s ease infinite;
  }
  @keyframes ur-pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }

  .ur-card-title {
    font-family: var(--font-d); font-size: 1.55rem; color: var(--gray-900);
    margin: 0 0 5px; letter-spacing: -0.02em;
  }
  .ur-card-sub { font-size: 0.825rem; color: var(--gray-400); font-weight: 300; margin-bottom: 24px; }

  /* Error */
  .ur-error {
    display: flex; align-items: center; gap: 8px;
    background: var(--red-lt); border: 1px solid #fecaca;
    color: var(--red); font-size: 0.85rem; font-weight: 500;
    padding: 11px 14px; border-radius: var(--r-md); margin-bottom: 18px;
    animation: ur-fade-in 0.3s ease;
  }
  @keyframes ur-fade-in { from { opacity:0; transform: translateY(-4px); } to { opacity:1; transform:none; } }

  /* Form */
  .ur-form { display: flex; flex-direction: column; gap: 14px; margin-bottom: 18px; }
  .ur-field { display: flex; flex-direction: column; gap: 5px; }
  .ur-label {
    font-size: 0.7rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.07em; color: var(--gray-600);
  }
  .ur-input-wrap {
    display: flex; align-items: center;
    background: var(--gray-50); border: 1.5px solid var(--gray-200);
    border-radius: var(--r-md); transition: var(--tr);
  }
  .ur-input-wrap:focus-within {
    border-color: var(--green); background: var(--white);
    box-shadow: 0 0 0 3px rgba(22,163,74,0.1);
  }
  .ur-input-icon {
    display: flex; align-items: center; justify-content: center;
    color: var(--gray-400); margin: 0 11px; flex-shrink: 0; transition: color 0.2s;
  }
  .ur-input-wrap:focus-within .ur-input-icon { color: var(--green); }
  .ur-input {
    flex: 1; padding: 11px 0; border: none; background: transparent;
    font-family: var(--font-b); font-size: 0.875rem; color: var(--gray-900); outline: none;
  }
  .ur-input::placeholder { color: var(--gray-400); font-weight: 300; }
  .ur-input:disabled { opacity: 0.6; }
  .ur-eye-btn {
    background: none; border: none; cursor: pointer;
    padding: 0 11px; font-size: 0.9rem; opacity: 0.6; transition: opacity 0.2s;
  }
  .ur-eye-btn:hover { opacity: 1; }

  /* Submit */
  .ur-submit-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 13px; margin-top: 6px;
    background: linear-gradient(135deg, var(--green), var(--green-dk));
    color: var(--white); border: none; border-radius: var(--r-md);
    font-family: var(--font-b); font-size: 0.9rem; font-weight: 600;
    cursor: pointer; transition: var(--tr);
    box-shadow: 0 2px 12px rgba(22,163,74,0.3);
  }
  .ur-submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(22,163,74,0.4); }
  .ur-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .ur-spinner {
    width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%; animation: ur-spin 0.7s linear infinite;
  }
  @keyframes ur-spin { to { transform: rotate(360deg); } }

  .ur-login-hint { font-size: 0.8rem; color: var(--gray-400); text-align: center; margin-bottom: 18px; }
  .ur-link { color: var(--green); font-weight: 600; text-decoration: none; }
  .ur-link:hover { text-decoration: underline; }

  .ur-divider {
    display: flex; align-items: center; gap: 12px;
    color: var(--gray-400); font-size: 0.75rem; margin-bottom: 14px;
  }
  .ur-divider::before, .ur-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--gray-200);
  }

  .ur-owner-btn {
    display: block; width: 100%; text-align: center; text-decoration: none;
    font-family: var(--font-b); font-size: 0.875rem; font-weight: 600;
    color: var(--gray-700); background: var(--gray-100);
    border: 1.5px solid var(--gray-200); border-radius: var(--r-md);
    padding: 11px; transition: var(--tr); box-sizing: border-box;
  }
  .ur-owner-btn:hover { border-color: var(--gray-400); background: var(--gray-200); }

  /* Responsive */
  @media (max-width: 768px) {
    .ur-root { grid-template-columns: 1fr; }
    .ur-left { display: none; }
    .ur-right { padding: 28px 16px; min-height: 100vh; align-items: flex-start; padding-top: 48px; }
    .ur-card { padding: 28px 20px; }
  }
`;

export default UserRegister;
