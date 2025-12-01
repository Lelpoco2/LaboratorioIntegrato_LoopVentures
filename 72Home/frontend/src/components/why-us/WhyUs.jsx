import "./WhyUs.css";
import AtticImg from "../../assets/background/attic-glimpse.png";
import LivingRoomImg from "../../assets/background/living-room-glimpse.png";
import {
  QuotesIcon,
  NumberCircleOneIcon,
  NumberCircleTwoIcon,
  NumberCircleThreeIcon,
} from "@phosphor-icons/react";

const WhyUs = () => {
  return (
    <div className="why-us-section-container">
      <section id="why-choose-us">
        <div className="why-us-container">
          <div className="why-us-reasons-container">
            <div className="why-us-header">
              <h2>Perché Sceglierci</h2>
            </div>

            <div className="single-reason-container">
              <NumberCircleOneIcon
                className="reason-icon"
                size={60}
                weight="thin"
              />
              <div className="reason-text">
                <h3>PRECISIONE E RAPIDITÀ</h3>
                <p>
                  Estimora combina dati immobiliari aggiornati con la conoscenza
                  del territorio dei nostri esperti, per offrirti una stima
                  accurata e affidabile in sole 72 ore.
                </p>
              </div>
            </div>

            <div className="single-reason-container">
              <NumberCircleTwoIcon
                className="reason-icon"
                size={60}
                weight="thin"
              />
              <div className="reason-text">
                <h3>SEMPLICE E TRASPARENTE</h3>
                <p>
                  Un percorso guidato, semplice e veloce, senza documenti
                  complicati né tecnicismi. Un form intuitivo e informazioni
                  chiare, trasparenti, dall’inizio alla fine.
                </p>
              </div>
            </div>

            <div className="single-reason-container">
              <NumberCircleThreeIcon
                className="reason-icon"
                size={60}
                weight="thin"
              />
              <div className="reason-text">
                <h3>PERSONE REALI, SEMPRE AL TUO FIANCO</h3>
                <p>
                  Anche online, non sei mai solo. Dopo la valutazione, il tuo
                  agente dedicato ti contatterà personalmente, pronto a
                  rispondere alle tue domande e a guidarti in ogni fase.
                </p>
              </div>
            </div>
          </div>

          {/* Images section */}
          <div className="why-us-images-container">
            <div className="image-container flex-start">
              <img
                className="why-us-image "
                src={AtticImg}
                alt="Una mansarda piena di luce con una lampada ed un divano."
              />
            </div>
            <div className="image-container flex-end">
              <img
                className="why-us-image border-radius-inverted"
                src={LivingRoomImg}
                alt="Un salotto luminoso con una libreria piena di libri"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
