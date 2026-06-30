import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { navLinks, company } from "../data/site.js";
import ThemeToggle from "./ThemeToggle.jsx";
import LanguageSelector from "./LanguageSelector.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="brand" aria-label={`${company.name} home`} onClick={() => setOpen(false)}>
          <img className="brand__logo" src="/logo.png" alt={company.name} width="80" height="40" />
        </Link>

        <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? "is-active" : "")}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="nav__cta" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
        </nav>

        <div className="nav__right">
          <LanguageSelector />
          <ThemeToggle />
          <button
            className={`nav__toggle ${open ? "is-open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
