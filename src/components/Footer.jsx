import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { navLinks, company, products, social } from "../data/site.js";

/* Inline social icons (no external deps) */
const ICONS = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z" />
  ),
  x: (
    <path d="M17.53 3H20.5l-6.5 7.43L21.75 21H15.8l-4.66-6.1L5.8 21H2.83l6.96-7.95L2.5 3h6.1l4.21 5.57zm-1.04 16.2h1.65L7.6 4.71H5.83z" />
  ),
  github: (
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
  ),
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);
  const statusRef = useRef(null);

  const onSubscribe = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubscribed(true);
    form.reset();
    // The form (with the focused submit button) unmounts — move focus to the
    // status message so keyboard focus stays coherent with the SR announcement.
    requestAnimationFrame(() => statusRef.current?.focus());
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="footer">
      {/* Newsletter / CTA strip */}
      <div className="footer__cta">
        <div className="container footer__cta-inner">
          <div className="footer__cta-text">
            <h3>Stay ahead of the threat curve</h3>
            <p>Security insights, product updates, and threat intelligence — straight to your inbox.</p>
          </div>
          {subscribed ? (
            <p ref={statusRef} tabIndex={-1} className="footer__news-ok" role="status">
              ✓ You're subscribed — watch your inbox.
            </p>
          ) : (
            <form className="footer__news" onSubmit={onSubscribe} noValidate>
              <input
                type="email"
                name="email"
                required
                placeholder="you@company.com"
                aria-label="Email address"
              />
              <button type="submit" className="btn btn--primary">Subscribe</button>
            </form>
          )}
        </div>
      </div>

      <div className="container footer__grid">
        {/* Brand + tagline + social */}
        <div className="footer__brand">
          <Link to="/" className="brand" aria-label={`${company.name} home`}>
            <img className="brand__logo" src="/logo.png" alt={company.name} width="120" height="60" />
          </Link>
          <p className="footer__tagline">{company.tagline}.</p>
          <ul className="footer__social" aria-label="Social media">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    {ICONS[s.icon]}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company nav */}
        <nav className="footer__col" aria-label="Company">
          <h4 className="footer__heading">Company</h4>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Products */}
        <nav className="footer__col" aria-label="Products">
          <h4 className="footer__heading">Products</h4>
          {products.map((p) => (
            <Link key={p.id} to="/products">
              {p.name}
            </Link>
          ))}
          <Link to="/grc">GRC Services</Link>
        </nav>

        {/* Contact details */}
        <div className="footer__col footer__contact">
          <h4 className="footer__heading">Get in touch</h4>
          <ul>
            <li>
              <span aria-hidden="true">✉️</span>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <span aria-hidden="true">📞</span>
              <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
            </li>
            <li>
              <span aria-hidden="true">📍</span>
              <span>{company.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {year} {company.name}. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link to="/contact">Privacy</Link>
            <span aria-hidden="true">·</span>
            <Link to="/contact">Terms</Link>
            <span aria-hidden="true">·</span>
            <a href={company.site} target="_blank" rel="noopener noreferrer">
              {company.site.replace(/^https?:\/\//, "")}
            </a>
          </div>
          <button
            type="button"
            className="footer__top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
