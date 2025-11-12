import "./Steps.css"

const Steps = () => {
    return (
        <div className="steps-container">
            <div className="steps-header">
                <h1 className="title">Tre semplici passi</h1>
                <h3 className="subtitle">Pochi click, tanto valore! Ricevi una valutazione per il tuo immobile!</h3>
            </div>
            <div className="cards-container">
                <div className="card">
                    <h4 className="card-title">Card 1</h4>
                    <p className="card-text">Testo della card 1</p>
                </div>
                <div className="card">
                    <h4 className="card-title">Card 2</h4>
                    <p className="card-text">Testo della card 2</p>
                </div>
                <div className="card">
                    <h4 className="card-title">Card 3</h4>
                    <p className="card-text">Testo della card 3</p>
                </div>
            </div>
        </div>
    );
};

export default Steps;