import React from "react";
import "./Footer.css";
// import logo from "../../assets/logo.png";


const Footer = () => {
    return (
        <footer className="footer container" role="contentinfo">
            <div className="footer-up">
                <div className="footer-logo-section">
                    
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, id.</p>
                    <button className="footer-btn" aria-label="Partiamo">Partiamo </button>
                </div>

                <nav className="container" aria-label="Footer navigation">
                    <div className="footer-links">
                        <h4>Chi siamo</h4>
                        <ul>
                            <li><a href="#">Mission</a></li>
                            <li><a href="#">Consegne</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Servizi</h4>
                        <ul>
                            <li><a href="#">Come funziona</a></li>
                            <li><a href="#">Valuta la tua casa</a></li>
                        </ul>
                    </div>
                </nav>

                <div className="footer-links">
                    <h4>Contatti</h4>
                    <ul>
                        <li><a href="mailto:contact@us.com">contact@us.com</a></li>
                        <li><a href="tel:+14146875892">+41 468 758 92</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Seguici</h4>
                    <div className="social-icons" aria-label="Social media">
                        <a href="https://www.facebook.com/?locale=it_IT" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
                        <a href="https://www.instagram.com/?hl=it" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
                        <a href="https://twitter.com/?lang=it" target="_blank" rel="noreferrer" aria-label="Twitter">t</a>
                    </div>
                </div>
            </div>

            <div className="footer-down">
                <p>
                    Copyright © {new Date().getFullYear()} - Tutti i diritti riservati.
                    <a href="#"> Termini e Condizioni</a>
                    <a href="#"> Privacy Policy</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
