import "./Navbar.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import BottoneCTA from "../cta-button/BottoneCTA";
import EstimoraLogo from "../../assets/logo/estimora-logo.svg";
import { CaretDownIcon } from "@phosphor-icons/react";

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
      <div className="navbar-logo">
        <Link to="/#home">
          <img src={EstimoraLogo} alt="Logo di Estimora" className="logo" />
        </Link>
      </div>

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
        <Link to="/#home" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/#steps" onClick={() => setMenuOpen(false)}>
          Come funziona
        </Link>

        <div
          className="navbar-item"
          onMouseEnter={() =>
            window.innerWidth > 768 && toggleSubmenu("about-us")
          }
          onMouseLeave={() => window.innerWidth > 768 && toggleSubmenu(null)}
          onClick={() => window.innerWidth <= 768 && toggleSubmenu("about-us")}
        >
          <button className="navbar-button">
            Chi siamo{" "}
            <CaretDownIcon size={16} weight="bold" className="navbar-icon" />
          </button>
          {activeMenu === "about-us" && (
            <div className="submenu">
              <Link to="/#why-choose-us" onClick={() => setMenuOpen(false)}>
                Perché sceglierci
              </Link>
              <Link to="/#footer" onClick={() => setMenuOpen(false)}>
                Contatti
              </Link>
            </div>
          )}
        </div>

        <Link to="/#agents" onClick={() => setMenuOpen(false)}>
          Agenti
        </Link>
      </nav>

      {/* Bottone CTA spostato fuori dal nav links */}
      <div className="navbar-cta">
        <BottoneCTA />
      </div>
    </header>
  );
}
