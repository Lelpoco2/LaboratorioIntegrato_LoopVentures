import { useState, useEffect } from "react";
import Field from "../components/Field";
import "../styles/Step1Address.css";
import "../styles/Evaluator.css";

export default function Step1Address({ formData, updateField, setStepErrors }) {
  // Track which fields have been touched
  const [touched, setTouched] = useState({});

  // Validate fields whenever formData changes
  useEffect(() => {
    const errors = {};
    if (!formData.street || formData.street.trim() === "") errors.street = true;
    if (!formData.streetNumber || formData.streetNumber.trim() === "")
      errors.streetNumber = true;
    if (!formData.city || formData.city.trim() === "") errors.city = true;
    if (!formData.zip || formData.zip.trim() === "") errors.zip = true;

    setStepErrors(errors);
  }, [formData, setStepErrors]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="step-card evaluator-card">
      <h2 className="step1-h2">Indirizzo dell'immobile</h2>

      {/* Row 1: Via / Piazza + Numero Civico */}
      <div className="form-row">
        <div
          className={`form-group ${
            touched.street && !formData.street ? "error" : ""
          }`}
        >
          <label htmlFor="street">Via / Piazza</label>
          <input
            id="street"
            type="text"
            placeholder="Piazza Statuto"
            value={formData.street || ""}
            onChange={(e) => updateField("street", e.target.value)}
            onBlur={() => handleBlur("street")}
          />
          {touched.street && !formData.street && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>

        <div
          className={`form-group short-field ${
            touched.streetNumber && !formData.streetNumber ? "error" : ""
          }`}
        >
          <label htmlFor="streetNumber">Numero civico</label>
          <input
            id="streetNumber"
            type="text"
            placeholder="9"
            value={formData.streetNumber || ""}
            onChange={(e) => updateField("streetNumber", e.target.value)}
            onBlur={() => handleBlur("streetNumber")}
          />
          {touched.streetNumber && !formData.streetNumber && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>
      </div>

      {/* Row 2: Comune + CAP */}
      <div className="form-row">
        <Field
          label="Comune"
          touched={touched.city}
          error={touched.city && !formData.city ? "Campo obbligatorio" : null}
          >
          <select
            id="city"
            value={formData.city || ""}
            onChange={(e) => updateField("city", e.target.value)}
            onBlur={() => handleBlur("city")}
          >
            <option value="" disabled>
              Seleziona la città
            </option>
            <option value="Alessandria">Alessandria</option>
            <option value="Asti">Asti</option>
            <option value="Cuneo">Cuneo</option>
            <option value="Torino">Torino</option>
          </select>
        </Field>

        <Field
          label="CAP"
          touched={touched.zip}
          error={touched.zip && !formData.zip ? "Campo obbligatorio" : null}
        >
          <input
            id="zip"
            type="text"
            placeholder="10122"
            value={formData.zip || ""}
            onChange={(e) => updateField("zip", e.target.value)}
            onBlur={() => handleBlur("zip")}
            className="short-field"
          />
        </Field>
      </div>
    </div>
  );
}
