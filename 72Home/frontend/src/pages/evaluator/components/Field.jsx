//handles style, label, error messages

import "../styles/Field.css";

export default function Field({ label, error, touched, children }) {
  const isValid = touched && !error;

  return (
    <div
      className={`
        form-group
        ${touched ? "touched" : "untouched"}
        ${error ? "error" : ""}
        ${isValid ? "valid" : ""}
      `}
    >
      <label>{label}</label>

      <div className="field-input-wrapper">
        {children}

        {/* Icona di validazione */}
        {isValid && <span className="valid-icon">✓</span>}
      </div>

      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
