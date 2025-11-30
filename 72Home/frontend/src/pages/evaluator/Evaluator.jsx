// Evaluator.jsx handles the flow.
// Manages currentStep, form validation, and the collected data.
import "./styles/Evaluator.css";
import FormNavigationButtons from "./components/FormNavigationButtons";
import StepNavigation from "./components/StepNavigation";

import { useState } from "react";
import useEvaluatorForm from "./hooks/useEvaluatorForm";
import { submitPropertyEvaluation } from "../../services/api";

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
  
  // Use the custom hook that builds JSON progressively
  const { formData, updateField, buildJSON, getJSONString } = useEvaluatorForm();

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
        <section>
          <div className="evaluator-layout">
            {currentStep !== steps.length - 1 && (
              <aside className="evaluator-stepper">
                <StepNavigation currentStep={currentStep} />
              </aside>
            )}
            <div className="evaluator-container">
              <main className="form-area">
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
                  onSubmit={async () => {
                    // Build the final JSON payload
                    const payload = buildJSON();
                    console.log("Sending to backend:", payload);
                    console.log("JSON String:", JSON.stringify(payload, null, 2));
                    console.log("Full address:", `${payload.property.address}, ${payload.property.zipCode} ${payload.property.city}`);
                    
                    try {
                      // Submit to backend using API service
                      const result = await submitPropertyEvaluation(payload);
                      console.log('Server response:', result);
                      
                      // Move to Feedback page on success
                      setCurrentStep((s) => s + 1);
                    } catch (error) {
                      console.error('Submission error:', error);
                      
                      // Better error messages
                      let errorMessage = 'Errore durante l\'invio del form.';
                      if (error.message.includes('zona OMI')) {
                        errorMessage = 'Non è stato possibile trovare una valutazione per questo indirizzo. Verifica che l\'indirizzo sia corretto e che si trovi in una zona coperta dal servizio.';
                      } else if (error.message.includes('coordinate')) {
                        errorMessage = 'Impossibile localizzare l\'indirizzo fornito. Verifica che sia corretto.';
                      } else {
                        errorMessage = `Errore: ${error.message}`;
                      }
                      
                      alert(errorMessage);
                    }
                  }}
                  hasErrors={Object.keys(stepErrors).length > 0}
                />
              </main>
            </div>
          </div>
        </section>
    </>
  );
}
