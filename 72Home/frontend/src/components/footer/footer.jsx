import "./Footer.css";
import BottoneCTA from "../cta-button/BottoneCTA";
import EstimoraLogo from "../../assets/logo/estimora-logo.svg";
import { InstagramLogoIcon, FacebookLogoIcon, TiktokLogoIcon, PhoneCallIcon, EnvelopeSimpleIcon, WhatsappLogoIcon, MapPinIcon } from "@phosphor-icons/react";

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
    <footer className="footer container" role="contentinfo">
      <div className="footer-up">
        <div className="footer-logo-section">
          <a href="#home">
            <img src={EstimoraLogo} alt="Logo di Estimora" className="footer-logo" />
          </a>
          <BottoneCTA />
        </div>

        <div className="footer-links-group">
          <div className="footer-links">
            <h4>Chi siamo</h4>
            <ul>
              <li><a href="#">Valuta la tua casa</a></li>
              <li><a href="#">Come funziona</a></li>
              <li><a href="#">Agenti</a></li>
              <li><a href="#">Login</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Cookies</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Condizioni d'utilizzo</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-contact-and-social">
          <div className="footer-contact-section">
            <h4>Contact us</h4>
            <div className="contact-details">
              <ContactItem Icon={WhatsappLogoIcon} title="WhatsApp:" value="(414) 687 - 5892" />
              <ContactItem Icon={PhoneCallIcon} title="Phone:" value="(414) 687 - 5892" />
              <ContactItem Icon={EnvelopeSimpleIcon} title="Email:" value="contact@brix.com" />
              <ContactItem Icon={MapPinIcon} title="Location:" value="Via Jacopo Durandi 33, TO" />
            </div>
          </div>

          <div className="footer-social-section-top">
            <h4>Follow us</h4>
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
            Copyright © {new Date().getFullYear()} Estimora. Tutti i diritti riservati. &nbsp;|&nbsp;
            <a href="/termini">Termini e Condizioni</a> &nbsp;|&nbsp;
            <a href="/privacy-policy">Privacy Policy</a>

          </p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;