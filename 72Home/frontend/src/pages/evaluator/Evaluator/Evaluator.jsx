import "./Evaluator.css";
import FormNavigationButtons from "../components/form-navigation-buttons/FormNavigationButtons.jsx";
import StepNavigation from "../components/step-navigation/StepNavigation.jsx";
import LoadingScreen from "../components/loading-screen/LoadingScreen.jsx";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useEvaluatorForm from "../hooks/useEvaluatorForm.js";
import { submitPropertyEvaluation } from "../../../services/api.js";
import { Step1Address, Step2PropertyType, Step3Features, Step4AddOns, Step5Contact, Feedback } from "../components/steps/index.js";

export default function Evaluator() {
  const location = useLocation();
  const initialAddress = location.state?.initialAddress || "";
  const [stepErrors, setStepErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, updateField, buildJSON } = useEvaluatorForm(initialAddress ? { street: initialAddress } : {});

  const steps = [Step1Address, Step2PropertyType, Step3Features, Step4AddOns, Step5Contact, Feedback];
  const StepComponent = steps[currentStep];

  return (
    <section className="evaluator-section">
      {isSubmitting && <LoadingScreen />}
      <div className="evaluator-layout">
        {currentStep !== steps.length - 1 && (
          <aside className="evaluator-stepper"><StepNavigation currentStep={currentStep} /></aside>
        )}
        <div className="evaluator-container">
          <main className="form-area">
            <StepComponent formData={formData} updateField={updateField} setStepErrors={setStepErrors} />
            <FormNavigationButtons
              currentStep={currentStep}
              stepsLength={steps.length}
              onNext={() => { if (currentStep === 1) setCurrentStep(3); else setCurrentStep((s) => s + 1); }}
              onBack={() => { if (currentStep === 3) setCurrentStep(1); else setCurrentStep((s) => s - 1); }}
              onSubmit={async () => {
                setIsSubmitting(true);
                const payload = buildJSON();
                console.log("Sending to backend:", payload);
                console.log("Full address:", `${payload.property.address}, ${payload.property.zipCode} ${payload.property.city}`);
                try {
                  const result = await submitPropertyEvaluation(payload);
                  console.log('Server response:', result);
                  setIsSubmitting(false);
                  setCurrentStep((s) => s + 1);
                } catch (error) {
                  console.error('Submission error:', error);
                  setIsSubmitting(false);
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
  );
}
