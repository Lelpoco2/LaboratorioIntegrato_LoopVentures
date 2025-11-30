import "../styles/StepNavigation.css";
import { CheckCircleIcon } from "@phosphor-icons/react";

export default function StepNavigation({ currentStep = 0 }) {
  // Visual steps: Tipologia and Caratteristiche are presented as a single combined step
  const visualSteps = [
    { title: "Indirizzo", subtitle: "Dove si trova l'immobile" },
    { title: "Tipologia & Caratteristiche", subtitle: "Tipo e dettagli principali" },
    { title: "Dotazioni aggiuntive", subtitle: "Servizi e accessori" },
    { title: "Informazioni di contatto", subtitle: "Dati per il contatto" },
  ];

  // Map actual currentStep (which includes separate Tipologia and Caratteristiche indexes)
  // to the visual step index used by the stepper UI.
  // actual indexes: 0:Indirizzo, 1:Tipologia, 2:Caratteristiche, 3:AddOns, 4:Contact, 5:Feedback
  const mapToVisual = (step) => {
    if (step === 0) return 0;
    if (step === 1 || step === 2) return 1;
    if (step === 3) return 2;
    if (step === 4) return 3;
    return 0;
  };

  const visualCurrent = mapToVisual(currentStep);

  return (
    <div className="step-navigation">
      {/* Vertical stepper for tablet/desktop */}
      <div className="vertical-steps">
        {visualSteps.map((s, i) => {
          const completed = i < visualCurrent;
          const active = i === visualCurrent;

          return (
            <div
              className={`step-item ${active ? "active" : ""} ${completed ? "completed" : ""}`}
              key={i}
            >
              <div className="step-left">
                <div className={`step-icon ${completed ? "completed" : ""}`}>
                  {completed ? (
                    <CheckCircleIcon size={44} weight="fill" color="#1e6e53" />
                  ) : (
                    <span className="step-number">{i + 1}</span>
                  )}
                </div>
                {/* connector stretches to fill available space between icons */}
                {i < visualSteps.length - 1 && (
                  <div className={`step-connector ${completed ? "filled" : ""}`} />
                )}
              </div>

              <div className="step-text">
                <div className="step-title">{s.title}</div>
                <div className="step-sub">{s.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Horizontal progress for small devices: only bar with colored segments, no text */}
      <div className="horizontal-progress" aria-hidden>
        {visualSteps.map((_, i) => (
          <div key={i} className={`hp-segment ${i <= visualCurrent ? "filled" : ""}`}></div>
        ))}
      </div>
    </div>
  );
}
