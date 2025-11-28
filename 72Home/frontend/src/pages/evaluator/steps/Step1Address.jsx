import { useState, useEffect } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
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
      <h2>Indirizzo dell'immobile</h2>

      {/* Row 1: Via / Piazza + Numero Civico */}
      <div className="form-row">
        <div
          className={`form-group long-field ${
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
        <div
          className={`form-group long-field ${
            touched.city && !formData.city ? "error" : ""
          }`}
        >
          <label htmlFor="city">Comune</label>
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
          <CaretDownIcon className="caret-down-icon" size={24} />
          {touched.city && !formData.city && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>

        <div
          className={`form-group short-field ${
            touched.zip && !formData.zip ? "error" : ""
          }`}
        >
          <label htmlFor="zip">CAP</label>
          <input
            id="zip"
            type="text"
            placeholder="10122"
            value={formData.zip || ""}
            onChange={(e) => updateField("zip", e.target.value)}
            onBlur={() => handleBlur("zip")}
          />
          {touched.zip && !formData.zip && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>
      </div>
    </div>
  );
}
