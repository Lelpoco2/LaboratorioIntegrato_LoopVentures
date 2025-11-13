import "./Steps.css"
import { PencilIcon, MailboxIcon, ChatsCircleIcon, ClockIcon } from "@phosphor-icons/react"

const Steps = () => {
    return (
        <div className="bg-container">
            <section>
                <div className="steps-container">
                    <div className="steps-header">
                        <h1 className="title">Tre semplici passi</h1>
                        <h3 className="subtitle">Pochi click, tanto valore! Scopri come ricevere un report a 360° ed aumentare il valore del tuo immobile!</h3>
                    </div>

                    <div className="cards-container grid-wrapper">
                        <div className="card">
                            <div className="cards-timer-container">
                                <ClockIcon className="timer-icon" size={24} />
                                <p>5 minuti</p>
                            </div>
                            <div className="card-text">
                                <h4 className="card-title">Descrivi il tuo immobile</h4>
                                <p className="card-description">Descrivi la tua casa in pochi semplici passaggi. Ogni dettaglio ci aiuta a stimarne il valore con la massima precisione.</p>
                            </div>
                            <PencilIcon size={100} weight="regular" className="card-icon" />
                        </div>

                        <div className="card">
                            <div className="cards-timer-container">
                                <ClockIcon className="timer-icon" size={24} />
                                <p>Entro 72 ore</p>
                            </div>
                            <div className="card-text">
                                <h4 className="card-title">Ricevi il report</h4>
                                <p className="card-description">Ti invieremo tramite email o WhatsApp un report personalizzato con la stima del tuo immobile, basata sui dati reali del mercato. </p>
                            </div>
                            <MailboxIcon size={100} weight="regular" className="card-icon" />
                        </div>

                        <div className="card">
                            <div className="cards-timer-container">
                                <ClockIcon className="timer-icon" size={24} />
                                <p>Scegli tu l'orario!</p>
                            </div>
                            <div className="card-text">
                                <h4 className="card-title">Parla con un esperto</h4>
                                <p className="card-description">Un nostro agente ti ricontatterà per approfondire tutto ciò che può influire sul valore del tuo immobile, fornendo suggerimenti preziosi per esprimerne al meglio il potenziale.</p>
                            </div>
                            <ChatsCircleIcon size={100} weight="regular" className="card-icon" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Steps;