import "../../../Evaluator/Evaluator.css";
import "./Step4AddOns.css";
import { useState, useEffect } from "react";

export default function Step4AddOns({ formData, updateField, setStepErrors }) {
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const errors = {}; if (formData.garage && !formData.garageSize) errors.garageSize = "Inserisci un numero intero maggiore di zero."; setStepErrors(errors);
  }, [formData.garage, formData.garageSize, setStepErrors]);

  const toggleCheckbox = (field) => updateField(field, !formData[field]);
  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  return (
    <div className="step-card evaluator-card">
      <h2>Dotazioni Aggiuntive</h2>
      <p className="step-subtitle">Seleziona le dotazioni che valorizzano il tuo immobile</p>
      <div className="addons-grid">
        <label className="checkbox-row"><input type="checkbox" checked={formData.basement || false} onChange={() => toggleCheckbox("basement")}/>Cantina</label>
        <label className="checkbox-row"><input type="checkbox" checked={formData.elevator || false} onChange={() => toggleCheckbox("elevator")}/>Ascensore</label>
        <label className="checkbox-row"><input type="checkbox" checked={formData.balcony || false} onChange={() => toggleCheckbox("balcony")}/>Balcone</label>
        <label className="checkbox-row"><input type="checkbox" checked={formData.garden || false} onChange={() => toggleCheckbox("garden")}/>Giardino</label>
        <label className="checkbox-row"><input type="checkbox" checked={formData.garage || false} onChange={() => toggleCheckbox("garage")}/>Box auto</label>
        <label className="checkbox-row"><input type="checkbox" checked={formData.terrace || false} onChange={() => toggleCheckbox("terrace")}/>Terrazza</label>
      </div>
      {formData.garage && (
        <div className="form-group garage-size-group">
          <label>Dimensione box auto (m²)</label>
          <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Es. 18" value={formData.garageSize || ""} onChange={(e) => { const v = e.target.value; if (!/^\d*$/.test(v)) return; if (v === "") { updateField("garageSize", ""); return; } if (Number(v) < 1) return; updateField("garageSize", v); }} onKeyDown={(e) => { if (["e", ".", ",", "+", "-", "E"].includes(e.key)) e.preventDefault(); }} onBlur={() => handleBlur("garageSize")}/>
          {touched.garageSize && formData.garageSize === "" && (<span className="error-message">Inserisci un numero intero maggiore di zero.</span>)}
        </div>
      )}
    </div>
  );
}
