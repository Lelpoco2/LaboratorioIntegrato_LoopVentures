import "./Steps.css"

const Steps = () => {
    return (
        <div className="steps-container">
            <div className="steps-header">
                <h1 className="title">Tre semplici passi</h1>
                <h3 className="subtitle">Pochi click, tanto valore! Scopri come ricevere un report a 360° ed aumentare il valore del tuo immobile!</h3>
            </div>

            <div className="cards-container grid-wrapper">
                <div className="card">
                    <div className="card-text">
                        <h4 className="card-title">Descrivi il tuo immobile</h4>
                        <p className="card-description">Descrivi la tua casa in pochi semplici passaggi. Ogni dettaglio ci aiuta a stimarne il valore con la massima precisione.</p>
                    </div>
                    <p className="card-icon">IMG</p>
                </div>

                <div className="card">
                    <div className="card-text">
                        <h4 className="card-title">Ricevi il report</h4>
                        <p className="card-description">Ti invieremo tramite email o WhatsApp un report personalizzato con la stima del tuo immobile, basata sui dati reali del mercato. Ti invieremo tramite email o WhatsApp un report personalizzato con la stima del tuo immobile, basata sui dati reali del mercato. Ti invieremo tramite email o WhatsApp un report personalizzato con la stima del tuo immobile, basata sui dati reali del mercato.</p>
                    </div>
                    <p className="card-icon">IMG</p>
                </div>

                <div className="card">
                    <div className="card-text">
                        <h4 className="card-title">Parla con un esperto</h4>
                        <p className="card-description">Un nostro agente ti ricontatterà per approfondire tutto ciò che può influire sul valore del tuo immobile, fornendo suggerimenti preziosi per esprimerne al meglio il potenziale.</p>
                    </div>
                    <p className="card-icon">IMG</p>
                </div>
            </div>
        </div>
    );
};

export default Steps;