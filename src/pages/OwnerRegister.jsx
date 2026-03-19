import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const OwnerRegister = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8765/api/auth/owner/register",
        formData,
        { withCredentials: true },
      );
      if (response.status === 201) {
        navigate("/owner/login");
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
      label: "Owner Full Name",
      type: "text",
      placeholder: "e.g. Rajesh Kumar",
      icon: "person",
    },
    {
      name: "email",
      label: "Owner Email",
      type: "email",
      placeholder: "owner@masalaagency.com",
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
      label: "Business Address",
      type: "text",
      placeholder: "Shop address or locality",
      icon: "pin",
    },
  ];

  const icons = {
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
      <>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .91h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </>
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

  const SvgIcon = ({ type }) => (
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
      {icons[type]}
    </svg>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="or-root">
        {/* ── Left Panel ── */}
        <div className="or-left">
          <div className="or-left-inner">
            <div className="or-brand">
              <span className="or-brand-icon">🌶️</span>
              <span className="or-brand-name">Rajesh Masala</span>
            </div>

            <h1 className="or-hero-title">
              Join as an
              <br />
              <em>owner partner.</em>
            </h1>
            <p className="or-hero-sub">
              Create your owner account to start listing products, managing
              orders, and serving customers across the platform.
            </p>

            <div className="or-steps">
              <div className="or-step-label">What happens next</div>
              {[
                { n: "1", text: "Fill in your business details" },
                { n: "2", text: "Your account is instantly created" },
                { n: "3", text: "Start adding products immediately" },
                { n: "4", text: "Receive & manage customer orders" },
              ].map(({ n, text }) => (
                <div key={n} className="or-step-row">
                  <span className="or-step-num">{n}</span>
                  <span className="or-step-text">{text}</span>
                </div>
              ))}
            </div>

            <div className="or-already">
              Already registered?{" "}
              <Link to="/owner/login" className="or-already-link">
                Sign in →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="or-right">
          <div className="or-card">
            <div className="or-badge">
              <span className="or-badge-dot" />
              Owner Registration
            </div>

            <h2 className="or-card-title">Create your account</h2>
            <p className="or-card-sub">
              All fields are required to get started
            </p>

            {error && (
              <div className="or-error">
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="or-form">
              {fields.map(({ name, label, type, placeholder, icon }) => (
                <div key={name} className="or-field">
                  <label className="or-label">{label}</label>
                  <div className="or-input-wrap">
                    <span className="or-input-icon">
                      <SvgIcon type={icon} />
                    </span>
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="or-input"
                    />
                  </div>
                </div>
              ))}

              {/* Password */}
              <div className="or-field">
                <label className="or-label">Password</label>
                <div className="or-input-wrap">
                  <span className="or-input-icon">
                    <SvgIcon type="lock" />
                  </span>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="or-input"
                  />
                  <button
                    type="button"
                    className="or-eye-btn"
                    onClick={() => setShowPass((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="or-submit-btn"
              >
                {loading ? (
                  <>
                    <span className="or-spinner" /> Creating account…
                  </>
                ) : (
                  "Create Owner Account →"
                )}
              </button>
            </form>

            <p className="or-login-hint">
              Already have an account?{" "}
              <Link to="/owner/login" className="or-link">
                Sign in here
              </Link>
            </p>

            <div className="or-divider">
              <span>or</span>
            </div>

            <Link to="/user/register" className="or-user-btn">
              👤 Register as User instead
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
  }

  .or-root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
    font-family: var(--font-b);
  }

  /* ── Left ── */
  .or-left {
    background: linear-gradient(150deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%);
    display: flex; align-items: center; position: relative; overflow: hidden;
  }
  .or-left::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 55% 50% at 85% 20%, rgba(99,102,241,0.25) 0%, transparent 65%),
      radial-gradient(ellipse 40% 55% at 5%  80%, rgba(49,46,129,0.5)  0%, transparent 65%);
    pointer-events: none;
  }
  .or-left-inner {
    position: relative; z-index: 1;
    padding: 64px 52px;
    display: flex; flex-direction: column; gap: 0;
  }

  .or-brand {
    display: flex; align-items: center; gap: 10px; margin-bottom: 36px;
  }
  .or-brand-icon { font-size: 1.4rem; }
  .or-brand-name { font-family: var(--font-d); font-size: 1.1rem; color: rgba(255,255,255,0.9); }

  .or-hero-title {
    font-family: var(--font-d);
    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
    color: var(--white); line-height: 1.1;
    letter-spacing: -0.02em; margin: 0 0 18px;
  }
  .or-hero-title em { color: #a5b4fc; font-style: italic; }
  .or-hero-sub {
    font-size: 0.875rem; color: rgba(255,255,255,0.55);
    font-weight: 300; line-height: 1.75; margin-bottom: 36px; max-width: 340px;
  }

  /* Steps */
  .or-steps { display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px; }
  .or-step-label {
    font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em;
    color: rgba(255,255,255,0.35); font-weight: 600; margin-bottom: 4px;
  }
  .or-step-row { display: flex; align-items: center; gap: 14px; }
  .or-step-num {
    width: 26px; height: 26px; flex-shrink: 0;
    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700; color: #a5b4fc;
  }
  .or-step-text { font-size: 0.85rem; color: rgba(255,255,255,0.7); }

  .or-already { font-size: 0.825rem; color: rgba(255,255,255,0.45); }
  .or-already-link { color: #a5b4fc; font-weight: 600; text-decoration: none; }
  .or-already-link:hover { text-decoration: underline; }

  /* ── Right ── */
  .or-right {
    background: var(--gray-50);
    display: flex; align-items: center; justify-content: center;
    padding: 48px 24px; overflow-y: auto;
  }
  .or-card {
    width: 100%; max-width: 440px;
    background: var(--white); border: 1px solid var(--gray-200);
    border-radius: var(--r-xl); padding: 36px 32px;
    box-shadow: var(--shadow);
  }

  /* Badge */
  .or-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--indigo-lt); border: 1px solid #c7d2fe;
    color: var(--indigo); font-size: 0.72rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.09em;
    padding: 5px 14px; border-radius: 100px; margin-bottom: 18px;
  }
  .or-badge-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--indigo);
    animation: or-pulse 2s ease infinite;
  }
  @keyframes or-pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }

  .or-card-title {
    font-family: var(--font-d); font-size: 1.55rem; color: var(--gray-900);
    margin: 0 0 5px; letter-spacing: -0.02em;
  }
  .or-card-sub { font-size: 0.825rem; color: var(--gray-400); font-weight: 300; margin-bottom: 24px; }

  /* Error */
  .or-error {
    display: flex; align-items: center; gap: 8px;
    background: var(--red-lt); border: 1px solid #fecaca;
    color: var(--red); font-size: 0.85rem; font-weight: 500;
    padding: 11px 14px; border-radius: var(--r-md); margin-bottom: 18px;
    animation: or-fade-in 0.3s ease;
  }
  @keyframes or-fade-in { from { opacity:0; transform: translateY(-4px); } to { opacity:1; transform:none; } }

  /* Form */
  .or-form { display: flex; flex-direction: column; gap: 14px; margin-bottom: 18px; }
  .or-field { display: flex; flex-direction: column; gap: 5px; }
  .or-label {
    font-size: 0.7rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.07em; color: var(--gray-600);
  }
  .or-input-wrap {
    display: flex; align-items: center;
    background: var(--gray-50); border: 1.5px solid var(--gray-200);
    border-radius: var(--r-md); transition: var(--tr);
  }
  .or-input-wrap:focus-within {
    border-color: var(--indigo); background: var(--white);
    box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
  }
  .or-input-icon {
    display: flex; align-items: center; justify-content: center;
    color: var(--gray-400); margin: 0 11px; flex-shrink: 0; transition: color 0.2s;
  }
  .or-input-wrap:focus-within .or-input-icon { color: var(--indigo); }
  .or-input {
    flex: 1; padding: 11px 0; border: none; background: transparent;
    font-family: var(--font-b); font-size: 0.875rem; color: var(--gray-900); outline: none;
  }
  .or-input::placeholder { color: var(--gray-400); font-weight: 300; }
  .or-input:disabled { opacity: 0.6; }
  .or-eye-btn {
    background: none; border: none; cursor: pointer;
    padding: 0 11px; font-size: 0.9rem; opacity: 0.6; transition: opacity 0.2s;
  }
  .or-eye-btn:hover { opacity: 1; }

  /* Submit */
  .or-submit-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 13px; margin-top: 6px;
    background: linear-gradient(135deg, var(--indigo), var(--indigo-dk));
    color: var(--white); border: none; border-radius: var(--r-md);
    font-family: var(--font-b); font-size: 0.9rem; font-weight: 600;
    cursor: pointer; transition: var(--tr);
    box-shadow: 0 2px 12px rgba(79,70,229,0.3);
  }
  .or-submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(79,70,229,0.4); }
  .or-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .or-spinner {
    width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%; animation: or-spin 0.7s linear infinite;
  }
  @keyframes or-spin { to { transform: rotate(360deg); } }

  .or-login-hint { font-size: 0.8rem; color: var(--gray-400); text-align: center; margin-bottom: 18px; }
  .or-link { color: var(--indigo); font-weight: 600; text-decoration: none; }
  .or-link:hover { text-decoration: underline; }

  .or-divider {
    display: flex; align-items: center; gap: 12px;
    color: var(--gray-400); font-size: 0.75rem; margin-bottom: 14px;
  }
  .or-divider::before, .or-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--gray-200);
  }

  .or-user-btn {
    display: block; width: 100%; text-align: center; text-decoration: none;
    font-family: var(--font-b); font-size: 0.875rem; font-weight: 600;
    color: var(--gray-700); background: var(--gray-100);
    border: 1.5px solid var(--gray-200); border-radius: var(--r-md);
    padding: 11px; transition: var(--tr); box-sizing: border-box;
  }
  .or-user-btn:hover { border-color: var(--gray-400); background: var(--gray-200); }

  /* Responsive */
  @media (max-width: 768px) {
    .or-root { grid-template-columns: 1fr; }
    .or-left { display: none; }
    .or-right { padding: 28px 16px; min-height: 100vh; align-items: flex-start; padding-top: 48px; }
    .or-card { padding: 28px 20px; }
  }
`;

export default OwnerRegister;
