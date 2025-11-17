import "../styles/Evaluator.css";
import { useState, useEffect } from "react";
import "../styles/Step4AddOns.css";

export default function Step4AddOns({ formData, updateField, setStepErrors }) {
  const [touched, setTouched] = useState({});

  // Step without required fields → always clear errors
  useEffect(() => {
    setStepErrors({});
  }, [setStepErrors]);

  const toggleCheckbox = (field) => {
    updateField(field, !formData[field]);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="step-card evaluator-card">
      <h2>Caratteristiche Aggiuntive</h2>
      <p className="step-subtitle">
        Seleziona i plus che valorizzano al meglio il tuo immobile
      </p>

      <div className="addons-grid">
        {/* Swimming pool */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={formData.pool || false}
            onChange={() => toggleCheckbox("pool")}
          />
          Piscina
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

        {/* Terrace */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={formData.terrace || false}
            onChange={() => toggleCheckbox("terrace")}
          />
          Terrazza
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

        {/* Garage */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={formData.garage || false}
            onChange={() => toggleCheckbox("garage")}
          />
          Box auto
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
      </div>

      {/* MQ of car garage */}
      {formData.garage && (
        <div className="form-group garage-size-group">
          <label>Dimensione box auto (mq)</label>
          <input
            type="number"
            placeholder="Es. 18"
            value={formData.garageSize || ""}
            onChange={(e) => updateField("garageSize", e.target.value)}
            onBlur={() => handleBlur("garageSize")}
          />
        </div>
      )}
    </div>
  );
}
