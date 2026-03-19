import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setError("All fields are required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Enter a valid email address");
      return false;
    }
    if (formData.phone.length < 10) {
      setError("Enter a valid phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8765/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Server not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <section className="ct-root">
        {/* ── Left Panel ── */}
        <div className="ct-left">
          <div className="ct-left-inner">
            <div className="ct-brand-pill">🌶️ Ansu Provisional</div>
            <h1 className="ct-hero-title">
              Let's talk
              <br />
              <em>business.</em>
            </h1>
            <p className="ct-hero-sub">
              Reach out for wholesale grocery orders, Rajesh Masala products, or
              any enquiry — we're here to help.
            </p>

            <div className="ct-info-list">
              <div className="ct-info-item">
                <div className="ct-info-icon">🏪</div>
                <div>
                  <div className="ct-info-label">Store</div>
                  <div className="ct-info-val">Ansu Provisional Store</div>
                </div>
              </div>
              <div className="ct-info-item">
                <div className="ct-info-icon">📞</div>
                <div>
                  <div className="ct-info-label">Phone / WhatsApp</div>
                  <a
                    href="tel:+917667816204"
                    className="ct-info-val ct-info-link"
                  >
                    +91 76678 16204
                  </a>
                </div>
              </div>
              <div className="ct-info-item">
                <div className="ct-info-icon">🌶️</div>
                <div>
                  <div className="ct-info-label">Agency</div>
                  <div className="ct-info-val">Rajesh Masala Agency</div>
                </div>
              </div>
              <div className="ct-info-item">
                <div className="ct-info-icon">📦</div>
                <div>
                  <div className="ct-info-label">Supply</div>
                  <div className="ct-info-val">Wholesale & Retail</div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/917667816204"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-wa-btn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* ── Right Panel (Form) ── */}
        <div className="ct-right">
          <div className="ct-form-wrap">
            <h2 className="ct-form-title">Send a Message</h2>
            <p className="ct-form-sub">
              We typically respond within a few hours.
            </p>

            {/* Alerts */}
            {success && (
              <div className="ct-alert ct-alert-success">
                <span>✓</span> {success}
              </div>
            )}
            {error && (
              <div className="ct-alert ct-alert-error">
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="ct-form">
              <div className="ct-field">
                <label className="ct-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="ct-input"
                />
              </div>

              <div className="ct-field-row">
                <div className="ct-field">
                  <label className="ct-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="ct-input"
                  />
                </div>
                <div className="ct-field">
                  <label className="ct-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="ct-input"
                  />
                </div>
              </div>

              <div className="ct-field">
                <label className="ct-label">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us about your order or enquiry…"
                  value={formData.message}
                  onChange={handleChange}
                  className="ct-input ct-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="ct-submit-btn"
              >
                {loading ? (
                  <>
                    <span className="ct-btn-spinner" /> Sending…
                  </>
                ) : (
                  "Send Message →"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --spice:    #f97316;
    --spice-dk: #c2410c;
    --spice-lt: #fff7ed;
    --green:    #16a34a;
    --green-lt: #f0fdf4;
    --red-lt:   #fef2f2;
    --red-txt:  #dc2626;
    --gray-900: #111827;
    --gray-700: #374151;
    --gray-600: #4b5563;
    --gray-400: #9ca3af;
    --gray-200: #e5e7eb;
    --gray-100: #f3f4f6;
    --white:    #ffffff;
    --font-d: 'Playfair Display', Georgia, serif;
    --font-b: 'DM Sans', system-ui, sans-serif;
    --tr: all 0.22s cubic-bezier(0.4,0,0.2,1);
  }

  /* Layout */
  .ct-root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
    font-family: var(--font-b);
  }

  /* ── Left ── */
  .ct-left {
    background: linear-gradient(155deg, #431407 0%, #7c2d12 55%, #9a3412 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .ct-left::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 55% 50% at 90% 20%, rgba(249,115,22,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 5%  80%, rgba(124,45,18,0.4) 0%, transparent 60%);
    pointer-events: none;
  }
  .ct-left-inner {
    position: relative;
    z-index: 1;
    padding: 64px 52px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .ct-brand-pill {
    display: inline-block;
    width: fit-content;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.85);
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 28px;
  }
  .ct-hero-title {
    font-family: var(--font-d);
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    color: var(--white);
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 0 20px;
  }
  .ct-hero-title em { color: #fdba74; font-style: italic; }
  .ct-hero-sub {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
    font-weight: 300;
    line-height: 1.75;
    margin-bottom: 40px;
    max-width: 340px;
  }

  /* Info list */
  .ct-info-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 40px;
  }
  .ct-info-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .ct-info-icon {
    width: 38px; height: 38px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .ct-info-label {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.45);
    font-weight: 500;
    margin-bottom: 3px;
  }
  .ct-info-val { font-size: 0.875rem; color: rgba(255,255,255,0.85); font-weight: 500; }
  .ct-info-link { text-decoration: none; transition: color 0.2s; }
  .ct-info-link:hover { color: #fdba74; }

  /* WhatsApp btn */
  .ct-wa-btn {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    width: fit-content;
    background: #22c55e;
    color: var(--white);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 12px 22px;
    border-radius: 12px;
    box-shadow: 0 2px 14px rgba(34,197,94,0.35);
    transition: var(--tr);
  }
  .ct-wa-btn:hover { background: #16a34a; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(34,197,94,0.4); }

  /* ── Right ── */
  .ct-right {
    background: var(--gray-100);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 64px 48px;
  }
  .ct-form-wrap {
    width: 100%;
    max-width: 480px;
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: 24px;
    padding: 44px 40px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }
  .ct-form-title {
    font-family: var(--font-d);
    font-size: 1.6rem;
    color: var(--gray-900);
    margin: 0 0 6px;
    letter-spacing: -0.02em;
  }
  .ct-form-sub {
    font-size: 0.825rem;
    color: var(--gray-400);
    font-weight: 300;
    margin-bottom: 28px;
  }

  /* Alerts */
  .ct-alert {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 11px 16px;
    border-radius: 10px;
    margin-bottom: 20px;
    animation: ct-fade-in 0.3s ease;
  }
  @keyframes ct-fade-in { from { opacity:0; transform: translateY(-4px); } to { opacity:1; transform: none; } }
  .ct-alert-success { background: var(--green-lt); color: var(--green); border: 1px solid #bbf7d0; }
  .ct-alert-error   { background: var(--red-lt);   color: var(--red-txt); border: 1px solid #fecaca; }

  /* Form */
  .ct-form { display: flex; flex-direction: column; gap: 18px; }
  .ct-field { display: flex; flex-direction: column; gap: 6px; }
  .ct-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .ct-label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--gray-600);
  }
  .ct-input {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid var(--gray-200);
    border-radius: 10px;
    font-family: var(--font-b);
    font-size: 0.875rem;
    color: var(--gray-900);
    background: var(--gray-100);
    outline: none;
    transition: var(--tr);
    box-sizing: border-box;
  }
  .ct-input::placeholder { color: var(--gray-400); }
  .ct-input:focus {
    border-color: var(--spice);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
  }
  .ct-textarea { resize: none; }

  /* Submit */
  .ct-submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 13px 20px;
    background: linear-gradient(135deg, var(--spice), var(--spice-dk));
    color: var(--white);
    font-family: var(--font-b);
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(249,115,22,0.3);
    transition: var(--tr);
    margin-top: 4px;
  }
  .ct-submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(249,115,22,0.4);
  }
  .ct-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* Spinner */
  .ct-btn-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: ct-spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes ct-spin { to { transform: rotate(360deg); } }

  /* Responsive */
  @media (max-width: 860px) {
    .ct-root { grid-template-columns: 1fr; }
    .ct-left { padding: 56px 24px 48px; }
    .ct-left-inner { padding: 0; }
    .ct-hero-sub { max-width: 100%; }
    .ct-right { padding: 40px 20px; }
    .ct-form-wrap { padding: 32px 24px; }
  }
  @media (max-width: 480px) {
    .ct-field-row { grid-template-columns: 1fr; }
  }
`;

export default Contact;
