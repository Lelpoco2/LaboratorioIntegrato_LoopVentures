import { useEffect, useState } from "react";
import "../styles/Step3Features.css";

export default function Step3Features({
  propertyType,
  formData,
  updateField,
  setStepErrors,
}) {
  const [touched, setTouched] = useState({});

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // ---- VALIDATION ----
  useEffect(() => {
    const errors = {};

    // Conditional fields
    if (propertyType === "appartamento") {
      if (!formData.apartmentFloor)
        errors.apartmentFloor = "Campo obbligatorio";
    }

    // Generic fields
    if (!formData.surface) errors.surface = "Campo obbligatorio";
    if (!formData.bathrooms) errors.bathrooms = "Campo obbligatorio";
    if (!formData.rooms) errors.rooms = "Campo obbligatorio";
    if (!formData.condition) errors.condition = "Campo obbligatorio";
    if (!formData.energyClass) errors.energyClass = "Campo obbligatorio";
    if (!formData.heating) errors.heating = "Campo obbligatorio";

    setStepErrors(errors);
  }, [formData, propertyType, setStepErrors]);

  const isEmpty = (field) => !formData[field];

  const showError = (field) => touched[field] && isEmpty(field);

  return (
    <div className="step-card evaluator-card" style={{ marginTop: "40px" }}>
      <h3>Caratteristiche dell’immobile</h3>

      <div className="form-column">
        {/* INPUT FIELDS JUST FOR "CASA": fow not it's empty*/}

        {/* INPUT FIELDS JUST FOR "APPARTAMENTO" */}
        {propertyType === "appartamento" && (
          <>
            <div
              className={`form-group ${
                showError("apartmentFloor") ? "error" : ""
              }`}
            >
              <label>Piano dell'appartamento</label>
              <select
                value={formData.apartmentFloor || ""}
                onChange={(e) => updateField("apartmentFloor", e.target.value)}
                onBlur={() => markTouched("apartmentFloor")}
              >
                <option value="" disabled>
                  Seleziona…
                </option>
                <option value="Terra">Terra</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4-or-more">4 o più</option>
              </select>
              {showError("apartmentFloor") && (
                <span className="error-message">Campo obbligatorio</span>
              )}
            </div>
          </>
        )}

        {/* Numero di locali */}
        <div className={`form-group ${showError("rooms") ? "error" : ""}`}>
          <label>Numero di locali</label>
          <select
            value={formData.rooms || ""}
            onChange={(e) => updateField("rooms", e.target.value)}
            onBlur={() => markTouched("rooms")}
          >
            <option value="" disabled>
              Seleziona…
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5-or-more">5 o più</option>
          </select>
          {showError("rooms") && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>

        {/* Numero di bagni */}
        <div className={`form-group ${showError("bathrooms") ? "error" : ""}`}>
          <label>Numero di bagni</label>
          <select
            value={formData.bathrooms || ""}
            onChange={(e) => updateField("bathrooms", e.target.value)}
            onBlur={() => markTouched("bathrooms")}
          >
            <option value="" disabled>
              Seleziona…
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3-or-more">3 o più</option>
          </select>
          {showError("bathrooms") && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>

        {/* Superficie abitabile */}
        <div className={`form-group ${showError("surface") ? "error" : ""}`}>
          <label>Superficie abitabile (mq)</label>
          <input
            type="number"
            value={formData.surface || ""}
            onChange={(e) => updateField("surface", e.target.value)}
            onBlur={() => markTouched("surface")}
          />
          {showError("surface") && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>

        {/* SELECT */}
        <div className={`form-group ${showError("condition") ? "error" : ""}`}>
          <label>Condizioni</label>
          <select
            value={formData.condition || ""}
            onChange={(e) => updateField("condition", e.target.value)}
            onBlur={() => markTouched("condition")}
          >
            <option value="" disabled>
              Seleziona…
            </option>
            <option value="unknown">Non lo so</option>
            <option value="new">Nuovo o Ristrutturato</option>
            <option value="excellent">Ottime condizioni</option>
            <option value="decent">Discreto</option>
            <option value="toberenovated">Da ristrutturare</option>
          </select>
          {showError("condition") && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>

        <div
          className={`form-group ${showError("energyClass") ? "error" : ""}`}
        >
          <label>Classe energetica</label>
          <select
            value={formData.energyClass || ""}
            onChange={(e) => updateField("energyClass", e.target.value)}
            onBlur={() => markTouched("energyClass")}
          >
            <option value="" disabled>
              Seleziona…
            </option>
            {["A4", "A3", "A2", "A1", "A", "B", "C", "D", "E", "F", "G"].map(
              (cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              )
            )}
            <option value="unknown">Non lo so</option>
          </select>
          {showError("energyClass") && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>

        <div className={`form-group ${showError("heating") ? "error" : ""}`}>
          <label>Riscaldamento</label>
          <select
            value={formData.heating || ""}
            onChange={(e) => updateField("heating", e.target.value)}
            onBlur={() => markTouched("heating")}
          >
            <option value="" disabled>
              Seleziona…
            </option>
            <option value="unknown">Non lo so</option>
            <option value="autonomo">Autonomo</option>
            <option value="centralizzato">Centralizzato</option>
          </select>
          {showError("heating") && (
            <span className="error-message">Campo obbligatorio</span>
          )}
        </div>
      </div>
    </div>
  );
}
