import { useState } from "react";
import BottoneCTA from "../cta-button/BottoneCTA";
import { CaretDownIcon } from "@phosphor-icons/react";
import "./Navbar.css";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSubmenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const toggleHamburger = () => {
    setMenuOpen(!menuOpen);
    setActiveMenu(null);
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">logo</div>

      {/* hamburger icon */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={toggleHamburger}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* nav links */}
      <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#chi-siamo" onClick={() => setMenuOpen(false)}>Chi siamo</a>

        <div
          className="navbar-item"
          onMouseEnter={() => window.innerWidth > 768 && toggleSubmenu("servizi")}
          onMouseLeave={() => window.innerWidth > 768 && toggleSubmenu(null)}
          onClick={() => window.innerWidth <= 768 && toggleSubmenu("servizi")}
        >
          <button className="navbar-button">
            Servizi{" "}
            <CaretDownIcon size={16} weight="bold" className="navbar-icon" />
          </button>
          {activeMenu === "servizi" && (
            <div className="submenu">
              <a href="#web" onClick={() => setMenuOpen(false)}>Blog</a>
              <a href="#grafica" onClick={() => setMenuOpen(false)}>Grafica</a>
              <a href="#seo" onClick={() => setMenuOpen(false)}>SEO</a>
            </div>
          )}
        </div>

        <div
          className="navbar-item"
          onMouseEnter={() => window.innerWidth > 768 && toggleSubmenu("progetti")}
          onMouseLeave={() => window.innerWidth > 768 && toggleSubmenu(null)}
          onClick={() => window.innerWidth <= 768 && toggleSubmenu("progetti")}
        >
          <button className="navbar-button">
            Progetti{" "}
            <CaretDownIcon size={16} weight="bold" className="navbar-icon" />
          </button>
          {activeMenu === "progetti" && (
            <div className="submenu">
              <a href="#aziendali" onClick={() => setMenuOpen(false)}>Aziendali</a>
              <a href="#personali" onClick={() => setMenuOpen(false)}>Personali</a>
            </div>
          )}
        </div>

        <a href="#contatti" onClick={() => setMenuOpen(false)}>Contatti</a>
      </nav>

      {/* Bottone CTA spostato fuori dal nav links */}
      <div className="navbar-cta">
        <BottoneCTA />
      </div>
    </header>
  );
}