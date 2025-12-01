import "../../../Evaluator/Evaluator.css";
import "./Step2PropertyType.css";
import { useEffect, useState } from "react";
import Step3Features from "../step3-features/Step3Features.jsx";
import { HouseIcon, BuildingIcon } from "@phosphor-icons/react";

export default function Step2PropertyType({ formData, updateField, setStepErrors }) {
  const [selected, setSelected] = useState(formData.propertyType || "");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const errors = {}; if (!selected) errors.propertyType = "Seleziona una tipologia di immobile"; setStepErrors(errors);
  }, [selected, setStepErrors]);

  const handleSelect = (type) => { setSelected(type); updateField("propertyType", type); setTouched(true); };

  return (
    <div className="step-card">
      <h2 className="step2-h2">Tipologia di Immobile</h2>
      <div className="property-type-cards">
        <div className={`property-card ${selected === "casa" ? "selected" : ""}`} onClick={() => handleSelect("casa")}>
          <HouseIcon size={62} /> <p>Casa</p>
        </div>
        <div className={`property-card ${selected === "appartamento" ? "selected" : ""}`} onClick={() => handleSelect("appartamento")}>
          <BuildingIcon size={62} /> <p>Appartamento</p>
        </div>
      </div>
      {touched && !selected && (<p className="error-message">Seleziona un'opzione per continuare</p>)}
      {selected && (
        <Step3Features propertyType={selected} formData={formData} updateField={updateField} setStepErrors={setStepErrors} />
      )}
    </div>
  );
}
