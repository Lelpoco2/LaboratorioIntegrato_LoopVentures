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
    // Street: require more than two letters (≥3 letters)
    const street = (formData.street || "").trim();
    const streetLetters = street.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g)?.length || 0;
    if (!street || streetLetters < 3) errors.street = true;
    if (!formData.streetNumber || formData.streetNumber.trim() === "")
      errors.streetNumber = true;
    if (!formData.city || formData.city.trim() === "") errors.city = true;
    // CAP: exactly 5 digits
    const zip = (formData.zip || "").trim();
    if (!zip || !/^\d{5}$/.test(zip)) errors.zip = true;

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
        <Field
          label="Via / Piazza"
          touched={touched.street}
          error={
            touched.street && !(formData.street && formData.street.trim())
              ? "Campo obbligatorio"
              : touched.street && formData.street && formData.street.trim() &&
                ((formData.street.trim().match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g)?.length || 0) < 3)
              ? "Inserisci almeno 3 lettere"
              : null
          }
        >
          <input
            id="street"
            type="text"
            placeholder="Piazza Statuto"
            value={formData.street || ""}
            onChange={(e) => updateField("street", e.target.value)}
            onBlur={() => {
              if (formData.street) updateField("street", formData.street.trim());
              handleBlur("street");
            }}
          />
        </Field>

        <Field
          label="Numero civico"
          touched={touched.streetNumber}
          error={
            touched.streetNumber && !formData.streetNumber ? "Campo obbligatorio" : null
          }
        >
          <input
            id="streetNumber"
            type="text"
            className="short-field"
            placeholder="9"
            value={formData.streetNumber || ""}
            onChange={(e) => updateField("streetNumber", e.target.value)}
            onBlur={() => handleBlur("streetNumber")}
          />
        </Field>
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
          error={
            touched.zip && !(formData.zip && formData.zip.trim())
              ? "Campo obbligatorio"
              : touched.zip && formData.zip && formData.zip.trim() && !/^\d{5}$/.test(formData.zip.trim())
              ? "Inserisci un CAP corretto (5 cifre)"
              : null
          }
        >
          <input
            id="zip"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="10122"
            value={formData.zip || ""}
            onChange={(e) => {
              const v = e.target.value;
              if (!/^\d*$/.test(v)) return;
              if (v.length > 5) return;
              updateField("zip", v);
            }}
            onKeyDown={(e) => {
              if (["e", ".", ",", "+", "-", "E"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onBlur={() => handleBlur("zip")}
            className="short-field"
          />
        </Field>
      </div>
    </div>
  );
}
