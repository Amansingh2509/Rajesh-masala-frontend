const Footer = () => {
  return (
    <>
      <style>{styles}</style>
      <footer className="ft-footer">
        <div className="ft-top">
          {/* Brand */}
          <div className="ft-brand-col">
            <div className="ft-logo">
              <span className="ft-logo-icon">🌶️</span>
              <span className="ft-logo-text">Rajesh Masala</span>
            </div>
            <p className="ft-brand-desc">
              Premium provisions marketplace for quality-conscious customers and
              trusted owners. Sourced fresh, delivered with care.
            </p>
            <div className="ft-social-row">
              <a href="#" className="ft-social-btn" aria-label="Twitter">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="ft-social-btn" aria-label="WhatsApp">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a href="#" className="ft-social-btn" aria-label="Instagram">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="ft-col">
            <div className="ft-col-title">Quick Links</div>
            <ul className="ft-link-list">
              <li>
                <a href="/" className="ft-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/user/login" className="ft-link">
                  User Login
                </a>
              </li>
              <li>
                <a href="/owner/login" className="ft-link">
                  Owner Login
                </a>
              </li>
              <li>
                <a href="#" className="ft-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="ft-col">
            <div className="ft-col-title">Our Products</div>
            <ul className="ft-link-list">
              <li>
                <a href="#" className="ft-link">
                  Rice & Grains
                </a>
              </li>
              <li>
                <a href="#" className="ft-link">
                  Pulses & Dals
                </a>
              </li>
              <li>
                <a href="#" className="ft-link">
                  Spices
                </a>
              </li>
              <li>
                <a href="#" className="ft-link">
                  Ghee & Oils
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="ft-col">
            <div className="ft-col-title">Get in Touch</div>
            <div className="ft-contact-list">
              <div className="ft-contact-row">
                <span className="ft-contact-icon">🏪</span>
                <span>Rajesh Masala Agency</span>
              </div>
              <div className="ft-contact-row">
                <span className="ft-contact-icon">📞</span>
                <a href="tel:+919876543210" className="ft-link">
                  +91 98765 43210
                </a>
              </div>
              <div className="ft-contact-row">
                <span className="ft-contact-icon">✉️</span>
                <a href="mailto:contact@rajeshmasala.com" className="ft-link">
                  contact@rajeshmasala.com
                </a>
              </div>
            </div>

            <div className="ft-badge">
              <span className="ft-badge-dot" />
              Wholesale Orders Welcome
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ft-bottom">
          <span>© 2024 Rajesh Masala Agency. All rights reserved.</span>
          <span className="ft-bottom-sep">·</span>
          <span>Premium Provisions Marketplace</span>
        </div>
      </footer>
    </>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .ft-footer {
    background: #0d1410;
    color: #e5e7eb;
    font-family: 'DM Sans', system-ui, sans-serif;
    margin-top: 80px;
    position: relative;
    overflow: hidden;
  }
  .ft-footer::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #c2410c, #f97316, #eab308, #15803d, #0ea5e9);
  }
  .ft-footer::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 50% 60% at 5% 50%, rgba(194,65,12,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 95% 20%, rgba(21,128,61,0.05) 0%, transparent 60%);
    pointer-events: none;
  }

  .ft-top {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 56px 24px 40px;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1.4fr;
    gap: 40px;
  }

  /* Brand col */
  .ft-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }
  .ft-logo-icon { font-size: 1.4rem; }
  .ft-logo-text {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.3rem;
    color: #fff;
    letter-spacing: -0.01em;
  }
  .ft-brand-desc {
    font-size: 0.83rem;
    line-height: 1.65;
    color: #6b7280;
    font-weight: 300;
    margin-bottom: 20px;
  }

  /* Social */
  .ft-social-row { display: flex; gap: 10px; }
  .ft-social-btn {
    width: 34px; height: 34px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: #9ca3af;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .ft-social-btn:hover {
    background: rgba(249,115,22,0.15);
    border-color: rgba(249,115,22,0.4);
    color: #f97316;
    transform: translateY(-2px);
  }

  /* Columns */
  .ft-col { display: flex; flex-direction: column; }
  .ft-col-title {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    color: #fff;
    margin-bottom: 18px;
  }
  .ft-link-list {
    list-style: none;
    margin: 0; padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ft-link {
    font-size: 0.875rem;
    color: #6b7280;
    text-decoration: none;
    font-weight: 400;
    transition: color 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .ft-link:hover { color: #f97316; }

  /* Contact */
  .ft-contact-list { display: flex; flex-direction: column; gap: 11px; margin-bottom: 20px; }
  .ft-contact-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.875rem;
    color: #6b7280;
  }
  .ft-contact-icon { font-size: 0.95rem; flex-shrink: 0; }

  /* Wholesale badge */
  .ft-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(21,128,61,0.12);
    border: 1px solid rgba(21,128,61,0.25);
    border-radius: 100px;
    padding: 6px 14px;
    font-size: 0.75rem;
    font-weight: 500;
    color: #4ade80;
    width: fit-content;
  }
  .ft-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4ade80;
    animation: ft-pulse 2s ease infinite;
    flex-shrink: 0;
  }
  @keyframes ft-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* Bottom bar */
  .ft-bottom {
    position: relative;
    z-index: 1;
    border-top: 1px solid rgba(255,255,255,0.07);
    max-width: 1100px;
    margin: 0 auto;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.78rem;
    color: #4b5563;
    flex-wrap: wrap;
  }
  .ft-bottom-sep { color: #374151; }

  @media (max-width: 900px) {
    .ft-top { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 540px) {
    .ft-top { grid-template-columns: 1fr; gap: 28px; }
    .ft-bottom { justify-content: center; text-align: center; }
  }
`;

export default Footer;
