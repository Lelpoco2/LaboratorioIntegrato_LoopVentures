import "../styles/FormNavigationButtons.css";

export default function FormNavigationButtons({
  currentStep,
  stepsLength,
  onNext,
  onBack,
  onSubmit,
  hasErrors,
}) {
  // If we are on the feedback page → render NOTHING
  if (currentStep === stepsLength - 1) {
    return null;
  }

  return (
    <div className="navigation-buttons">
      {currentStep > 0 && (
        <button className="btn back" onClick={onBack}>
          INDIETRO
        </button>
      )}

      {currentStep < stepsLength - 2 ? (
        <button className="btn next" onClick={onNext} disabled={hasErrors}>
          CONTINUA
        </button>
      ) : (
        <button className="btn submit" onClick={onSubmit} disabled={hasErrors}>
          INVIA
        </button>
      )}
    </div>
  );
}
