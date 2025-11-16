// Evaluator.jsx handles the flow.
// Manages currentStep, form validation, and the collected data.
import "./styles/evaluator.css";
import FormNavigationButtons from "./components/FormNavigationButtons";

import { useState } from "react";
import {
  Step1Address,
  Step2PropertyType,
  Step3Features,
  Step4AddOns,
  Step5Contact,
} from "./steps";

export default function Evaluator() {
  const [stepErrors, setStepErrors] = useState({});
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
    <div className="evaluator-section-container">
      <section>
        <div className="evaluator-container">
          <StepComponent
            formData={formData}
            updateField={updateField}
            setStepErrors={setStepErrors}
          />

          <FormNavigationButtons
            currentStep={currentStep}
            stepsLength={steps.length}
            onBack={() => setCurrentStep((s) => s - 1)}
            onNext={() => setCurrentStep((s) => s + 1)}
            onSubmit={() => console.log("Submit", formData)}
            hasErrors={Object.keys(stepErrors).length > 0}
          />
        </div>
      </section>
    </div>
  );
}
