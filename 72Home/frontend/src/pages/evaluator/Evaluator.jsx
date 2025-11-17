// Evaluator.jsx handles the flow.
// Manages currentStep, form validation, and the collected data.
import "./styles/Evaluator.css";
import FormNavigationButtons from "./components/FormNavigationButtons";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";

import {
  Step1Address,
  Step2PropertyType,
  Step3Features,
  Step4AddOns,
  Step5Contact,
  Feedback,
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
    Feedback,
  ];

  const StepComponent = steps[currentStep];

  return (
    <>
      <Navbar />
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
              onNext={() => {
                // If user is on Step2 (index 1), skips Step3
                if (currentStep === 1) {
                  setCurrentStep(3); // goes to Step4 (index 3)
                } else {
                  setCurrentStep((s) => s + 1);
                }
              }}
              onBack={() => {
                // If user is on Step4 (index 3), skips Step3
                if (currentStep === 3) {
                  setCurrentStep(1); // goes to Step2 (index 1)
                } else {
                  setCurrentStep((s) => s - 1);
                }
              }}
              onSubmit={() => {
                console.log("Submit", formData); // send data to backend
                setCurrentStep((s) => s + 1); // move to Feedback page
              }}
              hasErrors={Object.keys(stepErrors).length > 0}
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
