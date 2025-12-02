import "../../../Evaluator/Evaluator.css";
import "./Step5Contact.css";
import { useState, useEffect } from "react";
import Field from "../../field/Field.jsx";

const isValidEmail = (email) => { const regexEmail = /^[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/mgi; return regexEmail.test(email); };
const getEmailError = (email) => { if (!email) return null; if (/\s/.test(email)) return "L'email non può contenere spazi"; if (/[àèéìòù]/i.test(email)) return "L'email non può contenere lettere accentate"; if (!email.includes('@')) return "L'email deve contenere il simbolo @"; const parts = email.split('@'); if (parts.length !== 2 || !parts[1] || !parts[1].includes('.')) return "Formato email non valido (es. nome@esempio.com)"; return "Formato email non valido (es. nome@esempio.com)"; };
const isValidPhone = (phone) => { if (!phone) return false; if (/[()]/.test(phone)) return false; let cleaned = phone.replace(/[\s-]+/g, ""); if (!/^\+?\d+$/.test(cleaned) && !/^00\d+$/.test(cleaned)) return false; let hadCountryPrefix = false; if (cleaned.startsWith("+")) { hadCountryPrefix = true; cleaned = cleaned.slice(1); } else if (cleaned.startsWith("00")) { hadCountryPrefix = true; cleaned = cleaned.slice(2); } if (cleaned.startsWith("39") && (hadCountryPrefix || cleaned.length > 10)) cleaned = cleaned.slice(2); if (!/^\d+$/.test(cleaned)) return false; if (/^3\d{9}$/.test(cleaned)) return true; if (/^\d{6,10}$/.test(cleaned)) return true; return false; };
const getPhoneError = (phone) => { if (!phone) return null; if (/[()]/.test(phone)) return "Il numero non può contenere parentesi"; if (/[^0-9+\s-]/.test(phone)) return "Caratteri non ammessi: usa solo cifre, spazi, trattini e +"; if (phone.includes('+') && !phone.trim().startsWith('+')) return "Il simbolo + deve essere all'inizio"; let cleaned = phone.replace(/[\s-]+/g, ""); let hadCountryPrefix = false; if (cleaned.startsWith('+')) { hadCountryPrefix = true; cleaned = cleaned.slice(1); } else if (cleaned.startsWith('00')) { hadCountryPrefix = true; cleaned = cleaned.slice(2); } if (/[^0-9]/.test(cleaned)) return "Formato non valido dopo il prefisso"; if (cleaned.startsWith('39') && (hadCountryPrefix || cleaned.length > 10)) cleaned = cleaned.slice(2); if (cleaned.length < 6) return "Numero troppo corto (min 6 cifre)"; if (cleaned.length > 10) return "Numero troppo lungo (max 10 cifre senza prefisso)"; if (cleaned.startsWith('3') && cleaned.length !== 10) return "Numero mobile: 10 cifre e inizia con 3"; if (/^3\d{9}$/.test(cleaned)) return null; if (/^\d{6,10}$/.test(cleaned)) return null; return "Formato numero non valido (es. +39 333 1234567)"; };
const isValidName = (name) => { if (!name) return false; const trimmed = name.trim(); return trimmed.length >= 2; };

export default function Step5Contact({ formData, updateField, setStepErrors }) {
  const [touched, setTouched] = useState({});
  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  useEffect(() => {
    const errors = {}; if (!formData.firstName || !isValidName(formData.firstName)) errors.firstName = true; if (!formData.lastName || !isValidName(formData.lastName)) errors.lastName = true; if (!formData.email || !isValidEmail(formData.email)) errors.email = true; if (!formData.phone || !isValidPhone(formData.phone)) errors.phone = true; if (!formData.acceptPrivacy) errors.acceptPrivacy = true; setStepErrors(errors);
  }, [formData, setStepErrors]);

  return (
    <div className="step-card evaluator-card">
      <h2>Informazioni di Contatto</h2>
      <p className="step-subtitle">Inserisci i tuoi dati: ti contatteremo con la valutazione completa.</p>
      <div className="form-row">
        <Field label="Nome" touched={touched.firstName} error={touched.firstName && !formData.firstName ? "Campo obbligatorio" : touched.firstName && formData.firstName && !isValidName(formData.firstName) ? "Il nome deve contenere almeno 2 caratteri" : null}>
          <input type="text" value={formData.firstName || ""} onChange={(e) => updateField("firstName", e.target.value)} onBlur={() => { if (formData.firstName) updateField("firstName", formData.firstName.trim()); handleBlur("firstName"); }} />
        </Field>
        <Field label="Cognome" touched={touched.lastName} error={touched.lastName && !formData.lastName ? "Campo obbligatorio" : touched.lastName && formData.lastName && !isValidName(formData.lastName) ? "Il cognome deve contenere almeno 2 caratteri" : null}>
          <input type="text" value={formData.lastName || ""} onChange={(e) => updateField("lastName", e.target.value)} onBlur={() => { if (formData.lastName) updateField("lastName", formData.lastName.trim()); handleBlur("lastName"); }} />
        </Field>
      </div>
      <div className="form-row">
        <Field label="Email" touched={touched.email} error={touched.email && !formData.email ? "Campo obbligatorio" : touched.email && formData.email && !isValidEmail(formData.email) ? getEmailError(formData.email) : null}>
          <input type="email" placeholder="esempio@mail.com" value={formData.email || ""} onChange={(e) => updateField("email", e.target.value.trim())} onBlur={() => handleBlur("email")} />
        </Field>
        <Field label="Cellulare" touched={touched.phone} error={touched.phone && !formData.phone ? "Campo obbligatorio" : touched.phone && formData.phone && !isValidPhone(formData.phone) ? getPhoneError(formData.phone) : null}>
          <input type="tel" placeholder="+39 333 1234567" value={formData.phone || ""} onChange={(e) => updateField("phone", e.target.value)} onBlur={() => handleBlur("phone")} />
        </Field>
      </div>
      <label className={`checkbox-row ${touched.acceptPrivacy && !formData.acceptPrivacy ? "error" : ""}`}>
        <input type="checkbox" checked={formData.acceptPrivacy || false} onChange={() => updateField("acceptPrivacy", !formData.acceptPrivacy)} onBlur={() => handleBlur("acceptPrivacy")} />
        <div>Autorizzo al trattamento dei miei dati secondo la normativa GDPR e accetto la <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="inline-link">privacy policy</a> e le <a href="/termini-condizioni" target="_blank" rel="noopener noreferrer" className="inline-link">condizioni di utilizzo</a>.</div>
      </label>
      {touched.acceptPrivacy && !formData.acceptPrivacy && (<span className="less-margin error-message">Campo obbligatorio</span>)}
      <label className="less-margin-top checkbox-row">
        <input type="checkbox" checked={formData.acceptNewsletter || false} onChange={() => updateField("acceptNewsletter", !formData.acceptNewsletter)} />
        Voglio ricevere aggiornamenti via newsletter
      </label>
    </div>
  );
}
