import "./WhyUs.css";
import AtticImg from "../../assets/attic-glimpse.png";
import LivingRoomImg from "../../assets/living-room-glimpse.png";
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
                <h3>MOTIVO 1</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit.
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
                <h3>MOTIVO 2</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                  ipsum dolor sit.
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
                <h3>MOTIVO 3</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                  dolor sit.
                </p>
              </div>
            </div>
          </div>

          {/* Images section */}
          <div className="why-us-images-container">
            <div className="image-container flex-start">
              {/* CIAO1 */}
              <img
                className="why-us-image "
                src={AtticImg}
                alt="Una mansarda piena di luce con una lampada ed un divano."
              />
            </div>
            <div className="image-container flex-end">
              {/* CIAO2 */}
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
