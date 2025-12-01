import "../styles/Evaluator.css";

import { useState, useEffect } from "react";
import "../styles/Step5Contact.css";
import Field from "../components/Field";

const isValidEmail = (email) => {
  // Regex for email validation
  const regexEmail = /^[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/mgi;
  return regexEmail.test(email);
};

/**
 * Returns a specific error message based on what's wrong with the email format.
 * Checks are performed in order of specificity to provide targeted feedback.
 * 
 * Email validation rules:
 * - Cannot contain spaces or accented letters (à, è, é, ì, ò, ù)
 * - Must include the @ symbol
 * - Allowed special characters: "-", "+", "_", "%", "$", "&", "=", "!", "~", "*", "`", "?", "."
 * - Special characters cannot be first or last character in local part or domain
 * 
 * @param {string} email - The email address to validate
 * @returns {string|null} Specific Italian error message, or null if email is empty
 * 
 * @example
 * getEmailError("user @email.com") // "L'email non può contenere spazi"
 * getEmailError("utènte@email.com") // "L'email non può contenere lettere accentate"
 * getEmailError("useremail.com") // "L'email deve contenere il simbolo @"
 * getEmailError("user@domain") // "Formato email non valido (es. nome@esempio.com)"
 */
const getEmailError = (email) => {
  if (!email) return null;
  
  // Check for spaces
  if (/\s/.test(email)) return "L'email non può contenere spazi";
  
  // Check for accented characters
  if (/[àèéìòù]/i.test(email)) return "L'email non può contenere lettere accentate";
  
  // Check if @ is missing
  if (!email.includes('@')) return "L'email deve contenere il simbolo @";
  
  // Check if domain is missing
  const parts = email.split('@');
  if (parts.length !== 2 || !parts[1] || !parts[1].includes('.')) {
    return "Formato email non valido (es. nome@esempio.com)";
  }
  
  // Generic invalid format
  return "Formato email non valido (es. nome@esempio.com)";
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

/**
 * Returns a specific error message for the phone number.
 * The order of checks favors clear, easily correctable issues.
 * Accepted rules:
 * - Optional international prefix: '+' or '00'
 * - Allowed separators: spaces and hyphens
 * - Digits only (after removing prefix/separators); NO parentheses
 * - Mobile: 10 digits starting with '3'
 * - Landline: 6–10 digits
 * Provides tailored messages for: parentheses, invalid characters, misplaced '+', length out of range, incorrect mobile format.
 * @param {string} phone Phone number entered by the user
 * @returns {string|null} Error message or null if no specific issue
 */
const getPhoneError = (phone) => {
  if (!phone) return null;

  // Parentheses not allowed
  if (/[()]/.test(phone)) return "Il numero non può contenere parentesi";

  // Invalid characters (letters or symbols other than +, space, hyphen, digits)
  if (/[^0-9+\s-]/.test(phone)) return "Caratteri non ammessi: usa solo cifre, spazi, trattini e +";

  // '+' in wrong position
  if (phone.includes('+') && !phone.trim().startsWith('+')) return "Il simbolo + deve essere all'inizio";

  // Normalize for length analysis
  let cleaned = phone.replace(/[\s-]+/g, "");
  let hadCountryPrefix = false;
  if (cleaned.startsWith('+')) {
    hadCountryPrefix = true;
    cleaned = cleaned.slice(1);
  } else if (cleaned.startsWith('00')) {
    hadCountryPrefix = true;
    cleaned = cleaned.slice(2);
  }

  // If non-numeric characters remain after prefix removal => error
  if (/[^0-9]/.test(cleaned)) return "Formato non valido dopo il prefisso";

  // Remove '39' only if international prefix present or length > 10
  if (cleaned.startsWith('39') && (hadCountryPrefix || cleaned.length > 10)) {
    cleaned = cleaned.slice(2);
  }

  // Basic length checks
  if (cleaned.length < 6) return "Numero troppo corto (min 6 cifre)";
  if (cleaned.length > 10) return "Numero troppo lungo (max 10 cifre senza prefisso)";

  // Mobile: must start with 3 and be exactly 10 digits
  if (cleaned.startsWith('3') && cleaned.length !== 10) return "Numero mobile: 10 cifre e inizia con 3";
  if (!cleaned.startsWith('3') && cleaned.length === 10) {
    // 10 cifre ma non mobile potrebbe comunque essere valido fisso, quindi nessun errore
  }

  // Valid mobile format
  if (/^3\d{9}$/.test(cleaned)) return null;
  // Valid landline format (6-10 digits)
  if (/^\d{6,10}$/.test(cleaned)) return null;

  return "Formato numero non valido (es. +39 333 1234567)";
};

const isValidName = (name) => {
  if (!name) return false;
  const trimmed = name.trim();
  return trimmed.length >= 2;
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
    else if (!isValidName(formData.firstName)) errors.firstName = true;
    if (!formData.lastName) errors.lastName = true;
    else if (!isValidName(formData.lastName)) errors.lastName = true;
    if (!formData.email) errors.email = true;
    else if (!isValidEmail(formData.email)) errors.email = true;

    if (!formData.phone) errors.phone = true;
    else if (!isValidPhone(formData.phone)) errors.phone = true;

    if (!formData.acceptPrivacy) errors.acceptPrivacy = true;

    setStepErrors(errors);
  }, [formData, setStepErrors]);

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
          error={
            touched.firstName && !formData.firstName
              ? "Campo obbligatorio"
              : touched.firstName && formData.firstName && !isValidName(formData.firstName)
              ? "Il nome deve contenere almeno 2 caratteri"
              : null
          }
        >
          <input
            type="text"
            value={formData.firstName || ""}
            onChange={(e) => updateField("firstName", e.target.value)}
            onBlur={() => {
              if (formData.firstName) {
                updateField("firstName", formData.firstName.trim());
              }
              handleBlur("firstName");
            }}
          />
        </Field>

        <Field
          label="Cognome"
          touched={touched.lastName}
          error={
            touched.lastName && !formData.lastName
              ? "Campo obbligatorio"
              : touched.lastName && formData.lastName && !isValidName(formData.lastName)
              ? "Il cognome deve contenere almeno 2 caratteri"
              : null
          }
        >
          <input
            type="text"
            value={formData.lastName || ""}
            onChange={(e) => updateField("lastName", e.target.value)}
            onBlur={() => {
              if (formData.lastName) {
                updateField("lastName", formData.lastName.trim());
              }
              handleBlur("lastName");
            }}
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
              ? getEmailError(formData.email)
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
              ? getPhoneError(formData.phone)
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