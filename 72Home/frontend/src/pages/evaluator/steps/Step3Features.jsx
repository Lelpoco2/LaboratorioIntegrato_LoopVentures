import { useEffect } from "react";
import "../styles/Step3Features.css";

export default function Step3Features({
  propertyType,
  formData,
  updateField,
  setStepErrors
}) {

  // ---- VALIDATION ----
  useEffect(() => {
    const errors = {};

    // Conditional fields
    if (propertyType === "casa") {
      if (!formData.houseFloors) errors.houseFloors = "Campo obbligatorio";
    }

    if (propertyType === "appartamento") {
      if (!formData.buildingFloors) errors.buildingFloors = "Campo obbligatorio";
      if (!formData.apartmentFloor) errors.apartmentFloor = "Campo obbligatorio";
    }

    // Generic fields
    if (!formData.surface) errors.surface = "Campo obbligatorio";
    if (!formData.bathrooms) errors.bathrooms = "Campo obbligatorio";
    if (!formData.rooms) errors.rooms = "Campo obbligatorio";
    if (!formData.year) errors.year = "Campo obbligatorio";
    if (!formData.condition) errors.condition = "Campo obbligatorio";
    if (!formData.energyClass) errors.energyClass = "Campo obbligatorio";
    if (!formData.heating) errors.heating = "Campo obbligatorio";

    setStepErrors(errors);
  }, [formData, propertyType, setStepErrors]);

  // helper
  const isEmpty = (field) => !formData[field];

  return (
    <div className="step-card" style={{ marginTop: "40px" }}>
      <h3>Caratteristiche dell’immobile</h3>

      <div className="form-column">

        {/* CASA */}
        {propertyType === "casa" && (
          <div className={`form-group ${isEmpty("houseFloors") ? "error" : ""}`}>
            <label>Numero di piani della casa</label>
            <input
              type="number"
              value={formData.houseFloors || ""}
              onChange={(e) => updateField("houseFloors", e.target.value)}
            />
            {isEmpty("houseFloors") && <span className="error-message">Campo obbligatorio</span>}
          </div>
        )}

        {/* APPARTAMENTO */}
        {propertyType === "appartamento" && (
          <>
            <div className={`form-group ${isEmpty("buildingFloors") ? "error" : ""}`}>
              <label>Piani dell'edificio</label>
              <input
                type="number"
                value={formData.buildingFloors || ""}
                onChange={(e) => updateField("buildingFloors", e.target.value)}
              />
              {isEmpty("buildingFloors") && <span className="error-message">Campo obbligatorio</span>}
            </div>

            <div className={`form-group ${isEmpty("apartmentFloor") ? "error" : ""}`}>
              <label>Piano dell'appartamento</label>
              <input
                type="number"
                value={formData.apartmentFloor || ""}
                onChange={(e) => updateField("apartmentFloor", e.target.value)}
              />
              {isEmpty("apartmentFloor") && <span className="error-message">Campo obbligatorio</span>}
            </div>
          </>
        )}

        {/* COMMON FIELDS */}
        {[
          ["surface", "Superficie abitabile (mq)"],
          ["bathrooms", "Numero di bagni"],
          ["rooms", "Numero di locali"],
          ["year", "Anno di costruzione"],
        ].map(([field, label]) => (
          <div key={field} className={`form-group ${isEmpty(field) ? "error" : ""}`}>
            <label>{label}</label>
            <input
              type="number"
              value={formData[field] || ""}
              onChange={(e) => updateField(field, e.target.value)}
            />
            {isEmpty(field) && <span className="error-message">Campo obbligatorio</span>}
          </div>
        ))}

        {/* SELECTS */}

        {/* Condition */}
        <div className={`form-group ${isEmpty("condition") ? "error" : ""}`}>
          <label>Condizioni</label>
          <select
            value={formData.condition || ""}
            onChange={(e) => updateField("condition", e.target.value)}
          >
            <option value="" disabled>Seleziona…</option>
            <option value="unknown">Non lo so</option>
            <option value="new">Nuovo</option>
            <option value="excellent">Ottimo / Ristrutturato</option>
            <option value="good">Abitabile / Buono</option>
            <option value="toberenovated">Da ristrutturare</option>
          </select>
          {isEmpty("condition") && <span className="error-message">Campo obbligatorio</span>}
        </div>

        {/* Energy class */}
        <div className={`form-group ${isEmpty("energyClass") ? "error" : ""}`}>
          <label>Classe energetica</label>
          <select
            value={formData.energyClass || ""}
            onChange={(e) => updateField("energyClass", e.target.value)}
          >
            <option value="" disabled>Seleziona…</option>
            {["A+", "A", "B", "C", "D", "E", "F", "G"].map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
            <option value="unknown">Non lo so</option>
          </select>
          {isEmpty("energyClass") && <span className="error-message">Campo obbligatorio</span>}
        </div>

        {/* Heating */}
        <div className={`form-group ${isEmpty("heating") ? "error" : ""}`}>
          <label>Riscaldamento</label>
          <select
            value={formData.heating || ""}
            onChange={(e) => updateField("heating", e.target.value)}
          >
            <option value="" disabled>Seleziona…</option>
            <option value="unknown">Non lo so</option>
            <option value="autonomo">Autonomo</option>
            <option value="centralizzato">Centralizzato</option>
            <option value="none">Inesistente</option>
          </select>
          {isEmpty("heating") && <span className="error-message">Campo obbligatorio</span>}
        </div>
      </div>
    </div>
  );
}
