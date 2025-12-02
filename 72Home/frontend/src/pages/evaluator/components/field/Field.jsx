//handles style, label, error messages

import "./Field.css";
import { CaretDownIcon } from "@phosphor-icons/react";
import { Children } from "react";

export default function Field({ label, error, touched, children }) {
  const isValid = touched && !error;
  const hasSelect = Children.toArray(children).some(
    (child) => child && child.type === "select"
  );

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

        {isValid && <span className="valid-icon">✓</span>}

        {hasSelect && !isValid && (
          <CaretDownIcon className="field-caret" size={20} />
        )}
      </div>

      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
