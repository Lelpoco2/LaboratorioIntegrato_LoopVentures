import "../styles/Evaluator.css";
import { useState, useEffect } from "react";
import "../styles/Step4AddOns.css";

export default function Step4AddOns({ formData, updateField, setStepErrors }) {
  const [touched, setTouched] = useState({});

  // Validation: if garage selected, garageSize becomes required (>0 like surface field logic)
  useEffect(() => {
    const errors = {};
    if (formData.garage) {
      if (!formData.garageSize) {
        errors.garageSize = "Inserisci un numero intero maggiore di zero.";
      }
    }
    setStepErrors(errors);
  }, [formData.garage, formData.garageSize, setStepErrors]);

  const toggleCheckbox = (field) => {
    updateField(field, !formData[field]);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="step-card evaluator-card">
      <h2>Dotazioni Aggiuntive</h2>
      <p className="step-subtitle">
        Seleziona le dotazioni che valorizzano il tuo immobile
      </p>

      <div className="addons-grid">
        {/* Basement */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={formData.basement || false}
            onChange={() => toggleCheckbox("basement")}
          />
          Cantina
        </label>

        {/* Elevator */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={formData.elevator || false}
            onChange={() => toggleCheckbox("elevator")}
          />
          Ascensore
        </label>

        {/* Balcony */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={formData.balcony || false}
            onChange={() => toggleCheckbox("balcony")}
          />
          Balcone
        </label>

        {/* Garden */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={formData.garden || false}
            onChange={() => toggleCheckbox("garden")}
          />
          Giardino
        </label>

        {/* Garage */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={formData.garage || false}
            onChange={() => toggleCheckbox("garage")}
          />
          Box auto
        </label>

        {/* Terrace */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={formData.terrace || false}
            onChange={() => toggleCheckbox("terrace")}
          />
          Terrazza
        </label>
      </div>

      {/* Garage size (required if garage checked) */}
      {formData.garage && (
        <div className="form-group garage-size-group">
          <label>Dimensione box auto (m²)</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Es. 18"
            value={formData.garageSize || ""}
            onChange={(e) => {
              const v = e.target.value;
              // Allow only digits
              if (!/^\d*$/.test(v)) return;
              // If empty keep empty (will trigger required error on blur)
              if (v === "") {
                updateField("garageSize", "");
                return;
              }
              // Must be >=1
              if (Number(v) < 1) return;
              updateField("garageSize", v);
            }}
            onKeyDown={(e) => {
              if (["e", ".", ",", "+", "-", "E"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onBlur={() => handleBlur("garageSize")}
          />
          {touched.garageSize && formData.garageSize === "" && (
            <span className="error-message">Inserisci un numero intero maggiore di zero.</span>
          )}
        </div>
      )}
    </div>
  );
}
