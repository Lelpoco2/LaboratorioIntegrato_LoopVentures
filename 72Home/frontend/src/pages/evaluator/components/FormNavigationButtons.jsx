import "../styles/FormNavigationButtons.css";

export default function FormNavigationButtons({
  currentStep,
  stepsLength,
  onNext,
  onBack,
  onSubmit,
  hasErrors
}) {
  return (
    <div className="navigation-buttons">
      {currentStep > 0 && (
        <button className="btn back" onClick={onBack}>
          Indietro
        </button>
      )}

      {currentStep < stepsLength - 1 ? (
        <button className="btn next" onClick={onNext} disabled={hasErrors}>
          Continua
        </button>
      ) : (
        <button className="btn submit" onClick={onSubmit} disabled={hasErrors}>
          Invia
        </button>
      )}
    </div>
  );
}