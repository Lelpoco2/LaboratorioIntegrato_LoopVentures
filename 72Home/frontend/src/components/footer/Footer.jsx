import "./Footer.css";
import BottoneCTA from "../cta-button/BottoneCTA";
import EstimoraLogo from "../../assets/logo/estimora-logo.svg";
import { InstagramLogoIcon, FacebookLogoIcon, TiktokLogoIcon, PhoneCallIcon, EnvelopeSimpleIcon, WhatsappLogoIcon, MapPinIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Footer = () => {
  const ContactItem = ({ Icon, title, value }) => (
    <div className="contact-item">
      <div className="contact-icon-wrapper">
        <Icon size={20} className="contact-icon" />
      </div>
      <div>
        <p className="contact-title">{title}</p>
        <p className="contact-value">{value}</p>
      </div>
    </div>
  );

  return (
    <footer id="footer" className="footer container" role="contentinfo">
      <div className="footer-up">
        <div className="footer-logo-section">
          <Link to="/#home">
            <img src={EstimoraLogo} alt="Logo di Estimora" className="footer-logo" />
          </Link>
          <BottoneCTA />
        </div>

        <div className="footer-links-group">
          <div className="footer-links">
            <h4>Chi siamo</h4>
            <ul>
              <li><Link to="/evaluation">Valuta la tua casa</Link></li>
              <li><Link to="/#steps">Come funziona</Link></li>
              <li><Link to="/#agents">Agenti</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Servizi</h4>
            <ul>
              <li><Link to="/cookies">Cookies</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/termini-condizioni">Condizioni d'utilizzo</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-contact-and-social">
          <div className="footer-contact-section">
            <h4>Contatti</h4>
            <div className="contact-details">
              <ContactItem Icon={WhatsappLogoIcon} title="WhatsApp:" value="+39 342 768 9154" />
              <ContactItem Icon={PhoneCallIcon} title="Telefono:" value="+39 011 764 2385" />
              <ContactItem Icon={EnvelopeSimpleIcon} title="Email:" value="estimora.info@gmail.com" />
              <ContactItem Icon={MapPinIcon} title="Sede:" value="Via Jacopo Durandi 33, TO" />
            </div>
          </div>

          <div className="footer-social-section-top">
            <h4>Seguici</h4>
            <div className="social-icons" aria-label="Social media">
              <a href="#" target="_blank" rel="noreferrer" aria-label="TikTok">
                <TiktokLogoIcon size={20} />
              </a>
              <a href="#" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FacebookLogoIcon size={20} />
              </a>
              <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramLogoIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="footer-down">
          <p>
            Copyright © {new Date().getFullYear()} Estimora. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;