import React from "react";
import Hero from "../components/Hero";

const Home = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8765/api/auth/google";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="hm-root">
        <Hero />

        {/* ── Intro ── */}
        <section className="hm-intro">
          <div className="hm-intro-inner">
            <div className="hm-section-pill">Who We Are</div>
            <h2 className="hm-intro-title">Welcome to Ansu Provisional</h2>
            <p className="hm-intro-text">
              We provide all types of{" "}
              <strong>grocery and provision items</strong>. Our shop is also an
              authorized <strong>Rajesh Masala agency</strong>. If you want
              products in bulk, we also provide{" "}
              <strong>wholesale supply</strong> for shops and businesses.
            </p>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="hm-services">
          <div className="hm-section-pill">What We Offer</div>
          <div className="hm-services-grid">
            {[
              {
                icon: "🛒",
                title: "Provision Store",
                desc: "All daily grocery items available in one place with best quality.",
                color: "#fff7ed",
                border: "#fed7aa",
              },
              {
                icon: "🌶️",
                title: "Rajesh Masala Products",
                desc: "Premium quality spices from Rajesh Masala available here.",
                color: "#fef2f2",
                border: "#fecaca",
              },
              {
                icon: "📦",
                title: "Wholesale Supply",
                desc: "Bulk supply available for shops and retailers at best prices.",
                color: "#f0fdf4",
                border: "#bbf7d0",
              },
            ].map(({ icon, title, desc, color, border }) => (
              <div
                key={title}
                className="hm-service-card"
                style={{ "--card-bg": color, "--card-border": border }}
              >
                <div className="hm-service-icon">{icon}</div>
                <h3 className="hm-service-title">{title}</h3>
                <p className="hm-service-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── About Store ── */}
        <section className="hm-about">
          <div className="hm-about-inner">
            <div className="hm-about-text">
              <div className="hm-section-pill">Our Story</div>
              <h2 className="hm-about-title">About Ansu Provisional</h2>
              <p className="hm-about-para">
                <strong>Ansu Provisional</strong> is a trusted grocery and
                wholesale store known for providing high-quality provision items
                at affordable prices. We supply a wide variety of daily
                household groceries and essential products.
              </p>
              <p className="hm-about-para">
                Our store proudly operates the{" "}
                <strong>Rajesh Masala Agency</strong>, providing authentic and
                premium quality masala products. Customers can find all
                varieties of Rajesh Masala along with many other spices that
                enhance the flavor of everyday cooking.
              </p>
              <p className="hm-about-para">
                Whether you are a household customer or a business looking for
                wholesale grocery supply, Ansu Provisional is your trusted
                partner for quality and reliability.
              </p>
            </div>
            <div className="hm-about-img-wrap">
              <img
                src="/images/store.jpg"
                alt="Ansu Provisional Store"
                className="hm-about-img"
              />
              <div className="hm-about-img-badge">
                <span>🏪</span> Est. since day one
              </div>
            </div>
          </div>
        </section>

        {/* ── Founders ── */}
        <section className="hm-founders">
          <div className="hm-founders-inner">
            <div className="hm-section-pill hm-pill-center">The Team</div>
            <h2 className="hm-founders-title">Our Co-Founders</h2>
            <p className="hm-founders-sub">
              The vision behind Ansu Provisional is driven by passionate
              founders dedicated to delivering the best grocery experience.
            </p>

            <div className="hm-founders-grid">
              {[
                {
                  img: "/images/PHOTO-2026-03-13-21-50-35.jpg",
                  name: "Rajnish Singh",
                  role: "Co-Founder",
                  desc: "Rajnish Singh plays a key role in managing store operations and ensuring customers receive quality products with excellent service.",
                },
                {
                  img: "/images/vikash.jpg",
                  name: "Vikash Singh",
                  role: "Co-Founder",
                  desc: "Vikash Singh focuses on expanding the business and strengthening the Rajesh Masala Agency while maintaining strong supplier relationships.",
                },
              ].map(({ img, name, role, desc }) => (
                <div key={name} className="hm-founder-card">
                  <div className="hm-founder-img-wrap">
                    <img src={img} alt={name} className="hm-founder-img" />
                  </div>
                  <div className="hm-founder-info">
                    <div className="hm-founder-name">{name}</div>
                    <div className="hm-founder-role">{role}</div>
                    <p className="hm-founder-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="hm-why">
          <div className="hm-why-inner">
            <div className="hm-section-pill hm-pill-light">Why Us</div>
            <h2 className="hm-why-title">Why Choose Ansu Provisional?</h2>
            <div className="hm-why-grid">
              {[
                {
                  icon: "🛒",
                  title: "All Grocery Items",
                  desc: "Wide range of daily provision products available.",
                },
                {
                  icon: "🌶️",
                  title: "Rajesh Masala Agency",
                  desc: "Authentic and premium quality masala products.",
                },
                {
                  icon: "📦",
                  title: "Wholesale Supply",
                  desc: "Best prices for bulk grocery and shop owners.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="hm-why-item">
                  <div className="hm-why-icon">{icon}</div>
                  <div className="hm-why-item-title">{title}</div>
                  <p className="hm-why-item-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact CTA ── */}
        <section className="hm-cta">
          <div className="hm-cta-inner">
            <div className="hm-cta-icon">💬</div>
            <h2 className="hm-cta-title">Contact Ansu Provisional</h2>
            <p className="hm-cta-sub">
              Want grocery items or wholesale masala products? Reach us directly
              on WhatsApp.
            </p>
            <a
              href="https://wa.me/917667816204"
              target="_blank"
              rel="noopener noreferrer"
              className="hm-cta-btn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </section>

        {/* Floating WhatsApp */}
        <a
          href="https://wa.me/917667816204"
          target="_blank"
          rel="noopener noreferrer"
          className="hm-float-wa"
          aria-label="WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </>
  );
};

/* ─── Styles ─────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --spice:     #f97316;
    --spice-dk:  #c2410c;
    --spice-lt:  #fff7ed;
    --green:     #16a34a;
    --green-lt:  #f0fdf4;
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
    --tr: all 0.25s cubic-bezier(0.4,0,0.2,1);
    --shadow: 0 2px 16px rgba(0,0,0,0.07);
    --shadow-h: 0 8px 32px rgba(0,0,0,0.12);
    --r-xl: 24px;
    --r-lg: 16px;
    --r-md: 12px;
  }

  .hm-root { background: var(--white); font-family: var(--font-b); }

  /* ── Section pill ── */
  .hm-section-pill {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--spice-dk);
    background: var(--spice-lt);
    border: 1px solid #fed7aa;
    border-radius: 100px;
    padding: 5px 14px;
    margin-bottom: 16px;
  }
  .hm-pill-center { display: block; width: fit-content; margin: 0 auto 16px; }
  .hm-pill-light  { color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.25); }

  /* ── Intro ── */
  .hm-intro {
    padding: 80px 24px;
    background: var(--white);
    border-bottom: 1px solid var(--gray-100);
  }
  .hm-intro-inner { max-width: 720px; margin: 0 auto; text-align: center; }
  .hm-intro-title {
    font-family: var(--font-d);
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    color: var(--gray-900);
    margin: 0 0 20px;
    letter-spacing: -0.02em;
  }
  .hm-intro-text {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--gray-600);
    font-weight: 300;
  }
  .hm-intro-text strong { color: var(--gray-900); font-weight: 600; }

  /* ── Services ── */
  .hm-services {
    padding: 80px 24px;
    background: var(--gray-50);
    text-align: center;
  }
  .hm-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    max-width: 960px;
    margin: 0 auto;
  }
  .hm-service-card {
    background: var(--card-bg, var(--white));
    border: 1px solid var(--card-border, var(--gray-200));
    border-radius: var(--r-xl);
    padding: 36px 28px;
    text-align: center;
    transition: var(--tr);
    box-shadow: var(--shadow);
  }
  .hm-service-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-h); }
  .hm-service-icon  { font-size: 2.6rem; margin-bottom: 16px; }
  .hm-service-title {
    font-family: var(--font-d);
    font-size: 1.15rem;
    color: var(--gray-900);
    margin-bottom: 10px;
  }
  .hm-service-desc  { font-size: 0.875rem; color: var(--gray-600); line-height: 1.65; font-weight: 300; }

  /* ── About ── */
  .hm-about { padding: 96px 24px; background: var(--white); }
  .hm-about-inner {
    max-width: 1060px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }
  .hm-about-title {
    font-family: var(--font-d);
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    color: var(--gray-900);
    margin: 0 0 24px;
    letter-spacing: -0.02em;
  }
  .hm-about-para {
    font-size: 0.925rem;
    line-height: 1.8;
    color: var(--gray-600);
    font-weight: 300;
    margin-bottom: 16px;
  }
  .hm-about-para:last-child { margin-bottom: 0; }
  .hm-about-para strong { color: var(--gray-900); font-weight: 600; }
  .hm-about-img-wrap {
    position: relative;
  }
  .hm-about-img {
    width: 100%;
    border-radius: var(--r-xl);
    object-fit: cover;
    aspect-ratio: 4/3;
    box-shadow: var(--shadow-h);
  }
  .hm-about-img-badge {
    position: absolute;
    bottom: -14px;
    left: 24px;
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: 100px;
    padding: 8px 18px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--gray-700);
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 7px;
  }

  /* ── Founders ── */
  .hm-founders {
    padding: 96px 24px;
    background: var(--gray-50);
  }
  .hm-founders-inner { max-width: 860px; margin: 0 auto; text-align: center; }
  .hm-founders-title {
    font-family: var(--font-d);
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    color: var(--gray-900);
    margin: 0 0 12px;
    letter-spacing: -0.02em;
  }
  .hm-founders-sub {
    font-size: 0.925rem;
    color: var(--gray-400);
    font-weight: 300;
    margin-bottom: 48px;
  }
  .hm-founders-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .hm-founder-card {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--r-xl);
    padding: 36px 28px;
    transition: var(--tr);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hm-founder-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-h); }
  .hm-founder-img-wrap {
    width: 110px; height: 110px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #fed7aa;
    margin-bottom: 20px;
    flex-shrink: 0;
  }
  .hm-founder-img { width: 100%; height: 100%; object-fit: cover; }
  .hm-founder-name {
    font-family: var(--font-d);
    font-size: 1.15rem;
    color: var(--gray-900);
    margin-bottom: 4px;
  }
  .hm-founder-role {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--spice);
    margin-bottom: 14px;
  }
  .hm-founder-desc { font-size: 0.865rem; color: var(--gray-600); line-height: 1.7; font-weight: 300; }

  /* ── Why Us ── */
  .hm-why {
    background: linear-gradient(135deg, #431407 0%, #7c2d12 50%, #9a3412 100%);
    padding: 80px 24px;
    position: relative;
    overflow: hidden;
  }
  .hm-why::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 50% 60% at 80% 40%, rgba(249,115,22,0.15) 0%, transparent 60%);
    pointer-events: none;
  }
  .hm-why-inner { max-width: 860px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
  .hm-why-title {
    font-family: var(--font-d);
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    color: var(--white);
    margin: 0 0 48px;
    letter-spacing: -0.02em;
  }
  .hm-why-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .hm-why-item {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: var(--r-lg);
    padding: 32px 20px;
    backdrop-filter: blur(8px);
    transition: var(--tr);
  }
  .hm-why-item:hover { background: rgba(255,255,255,0.14); transform: translateY(-3px); }
  .hm-why-icon  { font-size: 2rem; margin-bottom: 14px; }
  .hm-why-item-title { font-weight: 600; color: var(--white); font-size: 0.95rem; margin-bottom: 8px; }
  .hm-why-item-desc  { font-size: 0.825rem; color: rgba(255,255,255,0.65); line-height: 1.6; font-weight: 300; }

  /* ── CTA ── */
  .hm-cta {
    padding: 96px 24px;
    background: var(--white);
    border-top: 1px solid var(--gray-100);
  }
  .hm-cta-inner {
    max-width: 560px;
    margin: 0 auto;
    text-align: center;
    background: var(--green-lt);
    border: 1px solid #bbf7d0;
    border-radius: var(--r-xl);
    padding: 56px 40px;
    box-shadow: var(--shadow);
  }
  .hm-cta-icon  { font-size: 2.5rem; margin-bottom: 16px; }
  .hm-cta-title {
    font-family: var(--font-d);
    font-size: 1.8rem;
    color: var(--gray-900);
    margin: 0 0 12px;
    letter-spacing: -0.02em;
  }
  .hm-cta-sub {
    font-size: 0.925rem;
    color: var(--gray-600);
    font-weight: 300;
    margin-bottom: 28px;
    line-height: 1.7;
  }
  .hm-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--green);
    color: var(--white);
    text-decoration: none;
    font-size: 0.925rem;
    font-weight: 600;
    padding: 14px 28px;
    border-radius: var(--r-lg);
    box-shadow: 0 2px 12px rgba(22,163,74,0.3);
    transition: var(--tr);
  }
  .hm-cta-btn:hover { background: #15803d; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(22,163,74,0.35); }

  /* ── Floating WhatsApp ── */
  .hm-float-wa {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px; height: 56px;
    background: #22c55e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    box-shadow: 0 4px 20px rgba(34,197,94,0.45);
    transition: var(--tr);
    z-index: 99;
    text-decoration: none;
  }
  .hm-float-wa:hover { background: #16a34a; transform: scale(1.1); }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .hm-about-inner  { grid-template-columns: 1fr; gap: 40px; }
    .hm-about-img-wrap { order: -1; }
    .hm-founders-grid { grid-template-columns: 1fr; }
    .hm-why-grid     { grid-template-columns: 1fr; }
    .hm-cta-inner    { padding: 40px 24px; }
  }
`;

export default Home;
