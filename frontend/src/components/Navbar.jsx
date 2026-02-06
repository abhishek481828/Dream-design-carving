import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on navigation
  React.useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Dream Design Logo" className="logo-image" />
          <span className="company-name">Dream Design Carving</span>
        </div>
        <nav>
          <div
            className="navbar-hamburger"
            onClick={() => setMenuOpen(open => !open)}
            aria-label="Toggle navigation"
            tabIndex={0}
          >
            <span style={{ transform: menuOpen ? "rotate(45deg) translateY(8px)" : "" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "" }} />
          </div>
          <ul className={`navbar-links${menuOpen ? " open" : ""}`}>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">{t('home')}</Link>
            </li>
            <li className={location.pathname === "/order" ? "active" : ""}>
              <Link to="/order">{t('order')}</Link>
            </li>
            <li className={location.pathname === "/designs" ? "active" : ""}>
              <Link to="/designs">{t('designs')}</Link>
            </li>
            <li className={location.pathname === "/about" ? "active" : ""}>
              <Link to="/about">{t('about')}</Link>
            </li>
            <li className={location.pathname === "/contact" ? "active" : ""}>
              <Link to="/contact">{t('contact')}</Link>
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
