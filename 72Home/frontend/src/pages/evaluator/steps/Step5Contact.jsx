import "../styles/evaluator.css";

import { useState, useEffect } from "react";
import "../styles/Step5Contact.css";

export default function Step5Contact({ formData, updateField, setStepErrors }) {
  const [touched, setTouched] = useState({});

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validation
  useEffect(() => {
    const errors = {};

    if (!formData.firstName) errors.firstName = true;
    if (!formData.lastName) errors.lastName = true;

    // Email must be filled
    if (!formData.email) errors.email = true;

    // Phone required
    if (!formData.phone) errors.phone = true;

    // Role required
    if (!formData.role) errors.role = true;

    // Motive required
    if (!formData.purpose) errors.purpose = true;

    // Second-level question required if needed
    const requiresTiming =
      formData.purpose === "rent_out" || formData.purpose === "sell";
    if (requiresTiming && !formData.timeframe) errors.timeframe = true;

    // Privacy acceptance required
    if (!formData.acceptPrivacy) errors.acceptPrivacy = true;

    setStepErrors(errors);
  }, [formData, setStepErrors]);

  const requiresTiming =
    formData.purpose === "rent_out" || formData.purpose === "sell";

  return (
    <div className="step-card evaluator-card">
      <h2>Informazioni di Contatto</h2>
      <p className="step-subtitle">
        Inserisci i tuoi dati: ti contatteremo con la valutazione completa.
      </p>

      {/* Row 1: Name + Surname */}
      <div className="form-row">
        <div
          className={`form-group ${
            touched.firstName && !formData.firstName ? "error" : ""
          }`}
        >
          <label>Nome</label>
          <input
            type="text"
            value={formData.firstName || ""}
            onChange={(e) => updateField("firstName", e.target.value)}
            onBlur={() => handleBlur("firstName")}
          />
          {touched.firstName && !formData.firstName && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>

        <div
          className={`form-group ${
            touched.lastName && !formData.lastName ? "error" : ""
          }`}
        >
          <label>Cognome</label>
          <input
            type="text"
            value={formData.lastName || ""}
            onChange={(e) => updateField("lastName", e.target.value)}
            onBlur={() => handleBlur("lastName")}
          />
          {touched.lastName && !formData.lastName && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>
      </div>

      {/* Row 2: Email + Phone */}
      <div className="form-row">
        <div
          className={`form-group ${
            touched.email && !formData.email ? "error" : ""
          }`}
        >
          <label>Email</label>
          <input
            type="email"
            placeholder="esempio@mail.com"
            value={formData.email || ""}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => handleBlur("email")}
          />
          {touched.email && !formData.email && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>

        <div
          className={`form-group ${
            touched.phone && !formData.phone ? "error" : ""
          }`}
        >
          <label>Cellulare</label>
          <input
            type="tel"
            placeholder="+39 333 1234567"
            value={formData.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
          />
          {touched.phone && !formData.phone && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>
      </div>

      {/* Role */}
      <div
        className={`more-margin form-group ${
          touched.role && !formData.role ? "error" : ""
        }`}
      >
        <label>Qual è il tuo ruolo in relazione all’immobile?</label>
        <select
          value={formData.role || ""}
          onChange={(e) => updateField("role", e.target.value)}
          onBlur={() => handleBlur("role")}
        >
          <option value="" disabled>
            Seleziona…
          </option>
          <option value="owner">Proprietario</option>
          <option value="tenant">Inquilino</option>
          <option value="buyer">Acquirente</option>
          <option value="agent">Agente immobiliare</option>
          <option value="other">Altro</option>
        </select>
        {touched.role && !formData.role && (
          <span className="error-message">Campo obbligatorio</span>
        )}
      </div>

      {/* Purpose */}
      <div
        className={`more-margin form-group ${
          touched.purpose && !formData.purpose ? "error" : ""
        }`}
      >
        <label>Motivo della valutazione</label>
        <select
          value={formData.purpose || ""}
          onChange={(e) => updateField("purpose", e.target.value)}
          onBlur={() => handleBlur("purpose")}
        >
          <option value="" disabled>
            Seleziona…
          </option>
          <option value="rent_out">Voglio darlo in affitto</option>
          <option value="sell">Voglio venderlo</option>
          <option value="buy">Voglio comprarlo</option>
          <option value="rent">Voglio prenderlo in affitto</option>
          <option value="info">Mi sto solo informando</option>
        </select>
        {touched.purpose && !formData.purpose && (
          <span className="error-message">Campo obbligatorio</span>
        )}
      </div>

      {/* Sub-question: timeframe */}
      {requiresTiming && (
        <div
          className={`more-margin form-group ${
            touched.timeframe && !formData.timeframe ? "error" : ""
          }`}
        >
          <label>Entro quando?</label>
          <select
            value={formData.timeframe || ""}
            onChange={(e) => updateField("timeframe", e.target.value)}
            onBlur={() => handleBlur("timeframe")}
          >
            <option value="" disabled>
              Seleziona…
            </option>
            <option value="asap">Il prima possibile</option>
            <option value="6months">Entro 6 mesi</option>
            <option value="later">Fra più di 6 mesi</option>
          </select>
          {touched.timeframe && !formData.timeframe && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>
      )}

      {/* Privacy */}
      <label
        className={`checkbox-row ${
          touched.acceptPrivacy && !formData.acceptPrivacy ? "error" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={formData.acceptPrivacy || false}
          onChange={() => updateField("acceptPrivacy", !formData.acceptPrivacy)}
          onBlur={() => handleBlur("acceptPrivacy")}
        />
        Accetto la politica sulla privacy e i termini di utilizzo
      </label>
      {touched.acceptPrivacy && !formData.acceptPrivacy && (
        <span className="less-margin error-message">Campo obbligatorio</span>
      )}

      {/* Newsletter */}
      <label className="less-margin-top checkbox-row">
        <input
          type="checkbox"
          checked={formData.acceptNewsletter || false}
          onChange={() =>
            updateField("acceptNewsletter", !formData.acceptNewsletter)
          }
        />
        Voglio ricevere aggiornamenti via newsletter
      </label>
    </div>
  );
}
