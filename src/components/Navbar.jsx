import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, owner, logout, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuth = !!user || !!owner;
  const profile = user || owner;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const initials = profile?.fullname
    ? profile.fullname
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <>
      <style>{styles}</style>
      <nav className={`nb-nav ${scrolled ? "nb-scrolled" : ""}`}>
        <div className="nb-inner">
          {/* Logo */}
          <Link to="/" className="nb-logo">
            <span className="nb-logo-icon">🌶️</span>
            <span className="nb-logo-text">Rajesh Masala</span>
          </Link>

          {/* Desktop links */}
          <div className="nb-links">
            {[
              { to: "/products", label: "Products" },
              { to: "/about", label: "Account" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nb-link ${isActive(to) ? "nb-link-active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Auth area */}
          <div className="nb-auth">
            {isAuth ? (
              <>
                <Link
                  to={role === "user" ? "/user/home" : "/owner/dashboard"}
                  className="nb-dashboard-btn"
                >
                  <div className="nb-avatar">{initials}</div>
                  <span>{role === "user" ? "Dashboard" : "Owner Panel"}</span>
                </Link>
                <button onClick={handleLogout} className="nb-logout-btn">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/user/login" className="nb-ghost-btn">
                  User Login
                </Link>
                <Link to="/owner/login" className="nb-solid-btn">
                  Owner Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nb-hamburger ${mobileOpen ? "nb-hamburger-open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`nb-drawer ${mobileOpen ? "nb-drawer-open" : ""}`}>
          {[
            { to: "/products", label: "🛍️ Products" },
            { to: "/about", label: "👤 Account" },
            { to: "/contact", label: "📞 Contact" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nb-drawer-link ${isActive(to) ? "nb-drawer-link-active" : ""}`}
            >
              {label}
            </Link>
          ))}

          <div className="nb-drawer-divider" />

          {isAuth ? (
            <>
              <Link
                to={role === "user" ? "/user/home" : "/owner/dashboard"}
                className="nb-drawer-link"
              >
                {role === "user" ? "🏠 Dashboard" : "🏪 Owner Panel"}
              </Link>
              <button onClick={handleLogout} className="nb-drawer-logout">
                ↩ Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/user/login" className="nb-drawer-link">
                🔑 User Login
              </Link>
              <Link to="/owner/login" className="nb-drawer-link">
                🏪 Owner Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .nb-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(0,0,0,0.07);
    font-family: 'DM Sans', system-ui, sans-serif;
    transition: box-shadow 0.3s ease, background 0.3s ease;
  }
  .nb-scrolled {
    background: rgba(255,255,255,0.97);
    box-shadow: 0 2px 20px rgba(0,0,0,0.08);
  }

  .nb-inner {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 24px;
    height: 62px;
    display: flex;
    align-items: center;
    gap: 0;
  }

  /* Logo */
  .nb-logo {
    display: flex;
    align-items: center;
    gap: 9px;
    text-decoration: none;
    flex-shrink: 0;
    margin-right: 36px;
  }
  .nb-logo-icon { font-size: 1.25rem; }
  .nb-logo-text {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.15rem;
    color: #111827;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }

  /* Desktop nav links */
  .nb-links {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
  }
  .nb-link {
    position: relative;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    padding: 6px 12px;
    border-radius: 8px;
    transition: color 0.2s ease, background 0.2s ease;
  }
  .nb-link:hover { color: #111827; background: #f3f4f6; }
  .nb-link-active { color: #c2410c !important; background: #fff7ed; font-weight: 600; }
  .nb-link-active::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 50%;
    transform: translateX(-50%);
    width: 20px; height: 2px;
    background: #f97316;
    border-radius: 2px;
  }

  /* Auth area */
  .nb-auth {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
    flex-shrink: 0;
  }

  /* Dashboard btn (authenticated) */
  .nb-dashboard-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 100px;
    padding: 5px 14px 5px 5px;
    font-size: 0.825rem;
    font-weight: 600;
    color: #1f2937;
    transition: all 0.2s ease;
  }
  .nb-dashboard-btn:hover { background: #f3f4f6; border-color: #d1d5db; transform: translateY(-1px); }
  .nb-avatar {
    width: 28px; height: 28px;
    background: linear-gradient(135deg, #f97316, #c2410c);
    color: #fff;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    flex-shrink: 0;
  }

  /* Logout */
  .nb-logout-btn {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.825rem;
    font-weight: 500;
    color: #9ca3af;
    background: none;
    border: none;
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
  }
  .nb-logout-btn:hover { color: #ef4444; background: #fee2e2; }

  /* Ghost & Solid */
  .nb-ghost-btn {
    text-decoration: none;
    font-size: 0.825rem;
    font-weight: 600;
    color: #374151;
    border: 1.5px solid #e5e7eb;
    padding: 7px 16px;
    border-radius: 10px;
    transition: all 0.2s ease;
  }
  .nb-ghost-btn:hover { border-color: #f97316; color: #f97316; background: #fff7ed; }

  .nb-solid-btn {
    text-decoration: none;
    font-size: 0.825rem;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #f97316, #c2410c);
    padding: 7px 16px;
    border-radius: 10px;
    transition: all 0.2s ease;
    box-shadow: 0 1px 8px rgba(249,115,22,0.3);
  }
  .nb-solid-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(249,115,22,0.4); }

  /* Hamburger */
  .nb-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 36px; height: 36px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    margin-left: auto;
    transition: background 0.2s;
  }
  .nb-hamburger:hover { background: #f3f4f6; }
  .nb-hamburger span {
    display: block;
    height: 2px;
    background: #374151;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }
  .nb-hamburger-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nb-hamburger-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nb-hamburger-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Mobile drawer */
  .nb-drawer {
    display: none;
    flex-direction: column;
    padding: 8px 16px 16px;
    border-top: 1px solid #f3f4f6;
    background: #fff;
    animation: nb-slide-down 0.2s ease;
  }
  .nb-drawer-open { display: flex; }
  @keyframes nb-slide-down {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: none; }
  }
  .nb-drawer-link {
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
    padding: 11px 12px;
    border-radius: 10px;
    transition: background 0.15s, color 0.15s;
  }
  .nb-drawer-link:hover { background: #f9fafb; color: #f97316; }
  .nb-drawer-link-active { color: #c2410c; background: #fff7ed; font-weight: 600; }
  .nb-drawer-divider { height: 1px; background: #f3f4f6; margin: 8px 0; }
  .nb-drawer-logout {
    font-family: 'DM Sans', system-ui, sans-serif;
    text-align: left;
    font-size: 0.9rem;
    font-weight: 500;
    color: #ef4444;
    background: none;
    border: none;
    padding: 11px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s;
  }
  .nb-drawer-logout:hover { background: #fee2e2; }

  /* Responsive */
  @media (max-width: 768px) {
    .nb-links  { display: none; }
    .nb-auth   { display: none; }
    .nb-hamburger { display: flex; }
    .nb-logo { margin-right: 0; }
  }
`;

export default Navbar;
