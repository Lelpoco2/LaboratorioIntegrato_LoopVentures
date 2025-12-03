import "./ErrorPage.css";
import { Link } from "react-router-dom";
import { HouseIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="error-page-container">
        <div className="error-content">
          <div className="error-icon-wrapper">
            <HouseIcon size={120} weight="duotone" className="error-house-icon" />
            <span className="error-number">404</span>
          </div>
          
          <h1 className="error-title">Questa pagina non esiste</h1>
          <p className="error-message">
            Sembra che tu ti sia perso nella ricerca della casa perfetta! 
            La pagina che stai cercando non è disponibile o è stata spostata.
          </p>
          
          <div className="error-actions">
            <Link to="/" className="error-button primary">
              <HouseIcon size={20} weight="fill" />
              Torna alla Home
            </Link>
            <Link to="/evaluation" className="error-button secondary">
              Valuta la tua casa
            </Link>
          </div>

          <div className="error-help">
            <p>Hai bisogno di aiuto?</p>
            <Link to="/#footer" className="error-link">
              <ArrowLeftIcon size={16} />
              Contattaci
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
