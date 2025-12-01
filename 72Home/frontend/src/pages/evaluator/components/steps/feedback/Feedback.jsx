import "../../../Evaluator/Evaluator.css";
import "./Feedback.css";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@phosphor-icons/react";

export default function Feedback({ formData }) {
  const firstName = formData?.firstName || "Utente";
  const email = formData?.email || "";
  const phone = formData?.phone || "";

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <h2 className="feedback-title">
          Grazie {firstName} per aver condiviso i dettagli del tuo immobile!
        </h2>
        <CheckCircleIcon
          size={130}
          weight="fill"
          color="#1c4e3cff"
          style={{ margin: "15px 0" }}
        />
        <p className="feedback-text">
          Abbiamo ricevuto tutte le informazioni e le stiamo analizzando con
          cura.
        </p>
        <p className="feedback-text">
          <strong>Entro 72 ore</strong> riceverai il tuo report personalizzato.
          Successivamente, un nostro agente ti contatterà per completare insieme
          la valutazione.
        </p>
        {(email || phone) && (
          <div className="feedback-contact-info">
            <p className="feedback-text">Invieremo il report a:</p>
            {email && (
              <p className="feedback-contact-detail">
                <strong>Email:</strong> {email}
              </p>
            )}
            {phone && (
              <p className="feedback-contact-detail">
                <strong>Cellulare:</strong> {phone}
              </p>
            )}
          </div>
        )}
        <p className="feedback-text secondary">
          Nel frattempo, se vuoi parlare con un consulente o ricevere supporto
          immediato, siamo sempre a tua disposizione.
        </p>
        <Link to="/" className="home-button">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
