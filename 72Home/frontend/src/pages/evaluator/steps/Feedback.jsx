import "../styles/Feedback.css";
import "../styles/evaluator.css";

import { Link } from "react-router-dom";

export default function Feedback() {
  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <h2 className="feedback-title">Grazie per averci raccontato del tuo immobile!</h2>

        <p className="feedback-text">
          Stiamo analizzando tutte le informazioni che ci hai fornito.
          <br />
          <strong>Entro 72 ore</strong> riceverai il tuo report personalizzato
          direttamente via <strong>email</strong> e <strong>cellulare</strong>.
        </p>

        <p className="feedback-text secondary">
          Nel frattempo, se hai bisogno di parlare con un consulente o desideri un supporto immediato, siamo sempre a tua disposizione.
        </p>

        <Link to="/" className="home-button">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}