import "./HeroSection.css";
import BottoneCTA from "../../components/cta-button/BottoneCTA";
import { useState } from "react";

export default function HeroSection() {
  const [address, setAddress] = useState("");

  return (
    <>
      <section id="home" className="hero-section-container">
        <div className="homepage">
          <div className="overlay">
            <div className="content-box">
              <h1>Il valore della tua casa, a distanza di un click</h1>
              <p>
                Descrivici le caratteristiche del tuo immobile per ottenere una
                valutazione gratuita creata su misura per te!
              </p>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Inserisci l'indirizzo del tuo immobile"
                  className="address-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="button-container">
                  <BottoneCTA address={address} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
