import "./StepNavigation.css";
import { CheckCircleIcon } from "@phosphor-icons/react";
import estimoraLogo from "../../../../assets/logo/estimora-logo.svg";
import houseSilhouette from "../../../../assets/background/houseSilhouetteLongVer.svg";

export default function StepNavigation({ currentStep = 0 }) {
  const visualSteps = [
    { title: "Indirizzo", subtitle: "Dove si trova l'immobile" },
    { title: "Tipologia & Caratteristiche", subtitle: "Tipo e dettagli principali" },
    { title: "Dotazioni aggiuntive", subtitle: "Servizi e accessori" },
    { title: "Informazioni di contatto", subtitle: "Dati per il contatto" },
  ];
  const mapToVisual = (step) => { if (step === 0) return 0; if (step === 1 || step === 2) return 1; if (step === 3) return 2; if (step === 4) return 3; return 0; };
  const visualCurrent = mapToVisual(currentStep);

  return (
    <div className="step-navigation">
      <div className="stepper-logo-container"><img src={estimoraLogo} alt="Estimora" className="stepper-logo" /></div>
      <div className="vertical-steps">
        {visualSteps.map((s, i) => {
          const completed = i < visualCurrent; const active = i === visualCurrent;
          return (
            <div className={`step-item ${active ? "active" : ""} ${completed ? "completed" : ""}`} key={i}>
              <div className="step-left">
                <div className={`step-icon ${completed ? "completed" : ""}`}>
                  {completed ? (<CheckCircleIcon size={44} weight="fill" color="#612916" />) : (<span className="step-number">{i + 1}</span>)}
                </div>
                {i < visualSteps.length - 1 && (<div className={`step-connector ${completed ? "filled" : ""}`} />)}
              </div>
              <div className="step-text">
                <div className="step-title">{s.title}</div>
                <div className="step-sub">{s.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="stepper-decoration-container"><img src={houseSilhouette} alt="House Silhouette" className="stepper-decoration" /></div>
      <div className="horizontal-progress" aria-hidden>{visualSteps.map((_, i) => (<div key={i} className={`hp-segment ${i <= visualCurrent ? "filled" : ""}`}></div>))}</div>
    </div>
  );
}
