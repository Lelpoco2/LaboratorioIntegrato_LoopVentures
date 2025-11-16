// Evaluator.jsx handles the flow.
// Manages currentStep, form validation, and the collected data.

import { useState } from "react";
import {
  Step1Address,
  Step2PropertyType,
  Step3Features,
  Step4AddOns,
  Step5Contact,
} from "./steps";

export default function Evaluator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    address: "",
    propertyType: "",
    features: {},
    addOns: {},
    contact: {},
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    Step1Address,
    Step2PropertyType,
    Step3Features,
    Step4AddOns,
    Step5Contact,
  ];

  const StepComponent = steps[currentStep];

  return (
    <div className="evaluator-container">
      <StepComponent formData={formData} updateField={updateField} />

      <div className="navigation-buttons">
        {currentStep > 0 && (
          <button onClick={() => setCurrentStep((s) => s - 1)}>Back</button>
        )}

        {currentStep < steps.length - 1 ? (
          <button onClick={() => setCurrentStep((s) => s + 1)}>Next</button>
        ) : (
          <button onClick={() => console.log("Submit", formData)}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
