import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";
import BottoneCTA from "../../components/cta-button/BottoneCTA";
import "./HomePage.css"
import Steps from "../../components/steps/Steps";

export default function Homepage() {
    return (
        <>
            <Navbar />
            <div className="homepage">
                <div className="overlay">
                    <div className="content-box">
                        <h1>Il valore della tua casa, a distanza di un click</h1>
                        <p>
                            Descrivici le caratteristiche del tuo immobile per ottenere una valutazione gratuita creata su misura per te!
                        </p>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Inserisci l'indirizzo del tuo immobile"
                                className="address-input"
                            />
                            <div className="button-container">

                                <BottoneCTA />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Steps />
            <Footer />
        </>
    );
}