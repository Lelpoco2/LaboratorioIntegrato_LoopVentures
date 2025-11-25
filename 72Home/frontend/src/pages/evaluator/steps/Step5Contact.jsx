import "../styles/Evaluator.css";

import { useState, useEffect } from "react";
import "../styles/Step5Contact.css";
import Field from "../components/Field";

const isValidEmail = (email) => {
  // regex per validazione email
  const regexEmail = /^[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/mgi;
  return regexEmail.test(email);
};

/**
 * Validates Italian phone numbers with flexible formatting.
 * 
 * Accepts:
 * - International prefix: + or 00
 * - Separators: spaces and hyphens
 * - Mobile numbers: 10 digits starting with '3' (e.g., 333 1234567)
 * - Landline numbers: 6-10 digits
 * 
 * Rejects:
 * - Parentheses
 * - Non-digit characters (except + prefix and allowed separators)
 * 
 * Country code '39' handling:
 * - Removed only when explicitly prefixed with +/00 OR when total length > 10 digits
 * - This prevents treating local numbers starting with '39' as having country code
 * 
 * Examples of valid inputs:
 * +39 333 1234567, 00393331234567, 333-123-4567, 3331234567, 06 12345678
 */
const isValidPhone = (phone) => {
  if (!phone) return false;

  // Non consentire parentesi
  if (/[()]/.test(phone)) return false;

  // Rimuoviamo spazi e trattini (accettati come separatori)
  let cleaned = phone.replace(/[\s-]+/g, "");

  // Permettiamo eventuale + oppure 00 per indicare prefisso internazionale
  if (!/^\+?\d+$/.test(cleaned) && !/^00\d+$/.test(cleaned)) {
    // se contiene altri caratteri (ad esempio lettere) => non valido
    return false;
  }

  // Rileviamo la presenza esplicita di prefisso internazionale
  let hadCountryPrefix = false;
  if (cleaned.startsWith("+")) {
    hadCountryPrefix = true;
    cleaned = cleaned.slice(1);
  } else if (cleaned.startsWith("00")) {
    hadCountryPrefix = true;
    cleaned = cleaned.slice(2);
  }

  // cleaned è ora solo cifre; se inizia per '39' può essere prefisso nazionale:
  // rimuoviamolo solo se c'era un prefisso internazionale oppure se la lunghezza è > 10 (quindi include CC)
  if (cleaned.startsWith("39") && (hadCountryPrefix || cleaned.length > 10)) {
    cleaned = cleaned.slice(2);
  }

  // Ora cleaned deve essere solo cifre
  if (!/^\d+$/.test(cleaned)) return false;

  // Lunghezze di riferimento per Italia (dopo aver rimosso eventuale CC)
  // - Mobile (es. 333...): 10 cifre e inizia con '3'
  // - Fisso: tra 6 e 10 cifre
  if (/^3\d{9}$/.test(cleaned)) return true; // mobile 10 cifre inizianti con 3
  if (/^\d{6,10}$/.test(cleaned)) return true; // fissi tra 6 e 10 cifre

  return false;
};

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
    if (!formData.email) errors.email = true;
    else if (!isValidEmail(formData.email)) errors.email = true;

    if (!formData.phone) errors.phone = true;
    else if (!isValidPhone(formData.phone)) errors.phone = true;

    if (!formData.purpose) errors.purpose = true;
    const requiresTiming = formData.purpose === "rent_out" || formData.purpose === "sell";
    if (requiresTiming && !formData.timeframe) errors.timeframe = true;
    if (!formData.acceptPrivacy) errors.acceptPrivacy = true;

    setStepErrors(errors);
  }, [formData, setStepErrors]);


  const requiresTiming = formData.purpose === "rent_out" || formData.purpose === "sell";

  return (
    <div className="step-card evaluator-card">
      <h2>Informazioni di Contatto</h2>
      <p className="step-subtitle">
        Inserisci i tuoi dati: ti contatteremo con la valutazione completa.
      </p>

      {/* Row 1: Name + Surname */}
      <div className="form-row">
        <Field
          label="Nome"
          touched={touched.firstName}
          error={touched.firstName && !formData.firstName ? "Campo obbligatorio" : null}
        >
          <input
            type="text"
            value={formData.firstName || ""}
            onChange={(e) => updateField("firstName", e.target.value)}
            onBlur={() => handleBlur("firstName")}
          />
        </Field>

        <Field
          label="Cognome"
          touched={touched.lastName}
          error={touched.lastName && !formData.lastName ? "Campo obbligatorio" : null}
        >
          <input
            type="text"
            value={formData.lastName || ""}
            onChange={(e) => updateField("lastName", e.target.value)}
            onBlur={() => handleBlur("lastName")}
          />
        </Field>
      </div>

      {/* Row 2: Email + Phone */}
      <div className="form-row">
        <Field
          label="Email"
          touched={touched.email}
          error={
            touched.email && !formData.email
              ? "Campo obbligatorio"
              : touched.email && formData.email && !isValidEmail(formData.email)
              ? 'Formato email non valido. L\'email non può contenere spazi e lettere accentate. Sono ammessi i seguenti caratteri speciali: "-", "+", "_", "%", "$", "&", "=", "!", "~", "*", "`", "?", "." (non come primo o ultimo carattere).'
              : null
          }
        >
          <input
            type="email"
            placeholder="esempio@mail.com"
            value={formData.email || ""}
            onChange={(e) => updateField("email", e.target.value.trim())}
            onBlur={() => handleBlur("email")}
          />
        </Field>

        <Field
          label="Cellulare"
          touched={touched.phone}
          error={
            touched.phone && !formData.phone
              ? "Campo obbligatorio"
              : touched.phone && formData.phone && !isValidPhone(formData.phone)
              ? 'Formato numero non valido. Accetta + o 00 prefisso internazionale; spazi e trattini permessi; NO parentesi. Esempio: +39 333 1234567 o 333-1234567. Numeri che iniziano per "39" non vengono trattati come prefisso a meno che non ci sia +/00 o il numero risulti più lungo di 10 cifre.'
              : null
          }
        >
          <input
            type="tel"
            placeholder="+39 333 1234567"
            value={formData.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
          />
        </Field>
      </div>

      {/* Purpose */}
      <div className="more-margin">
        <Field
          label="Motivo della valutazione"
          touched={touched.purpose}
          error={touched.purpose && !formData.purpose ? "Campo obbligatorio" : null}
        >
          <select
            value={formData.purpose || ""}
            onChange={(e) => updateField("purpose", e.target.value)}
            onBlur={() => handleBlur("purpose")}
          >
            <option value="" disabled>
              Seleziona…
            </option>
            <option value="sell">Voglio venderlo</option>
            <option value="rent_out">Voglio darlo in affitto</option>
            <option value="info">Mi sto solo informando</option>
          </select>
        </Field>
      </div>

      {/* Sub-question: timeframe */}
      {requiresTiming && (
        <div className="more-margin">
          <Field
            label="Entro quando?"
            touched={touched.timeframe}
            error={touched.timeframe && !formData.timeframe ? "Campo obbligatorio" : null}
          >
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
          </Field>
        </div>
      )}

      {/* Privacy */}
      <label
        className={`checkbox-row ${touched.acceptPrivacy && !formData.acceptPrivacy ? "error" : ""}`}
      >
        <input
          type="checkbox"
          checked={formData.acceptPrivacy || false}
          onChange={() => updateField("acceptPrivacy", !formData.acceptPrivacy)}
          onBlur={() => handleBlur("acceptPrivacy")}
        />
        <div>
          Autorizzo al trattamento dei miei dati secondo la normativa GDPR e
          accetto la{" "}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            privacy policy
          </a>{" "}
          e le{" "}
          <a
            href="/termini-condizioni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            condizioni di utilizzo
          </a>
          .
        </div>
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