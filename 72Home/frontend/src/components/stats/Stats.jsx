import './Stats.css';
import { HouseLine, Confetti, Detective, CalendarCheck } from "@phosphor-icons/react";

const StatsCard = ({ icon, value, symbol, description }) => {
    return (
        <div className="stats-card">
            <div className="stats-icon">{icon}</div>

            <div className="stats-value-row">
                <span className="stats-value">{value}</span>
                <span className="stats-symbol">{symbol}</span>
            </div>

            <p className="stats-description"> {description}</p>

        </div>
    );
};

const Stats = () => {
return (
    <div className="stats-section-wrapper">
            <div className="stats-container">
                
                <StatsCard 
                    // Sostituisci l'emoji con la vera icona
                    icon={<HouseLine />} 
                    value="250"
                    symbol="+"
                    description="Immobili venduti"
                />
                
                <StatsCard 
                    icon={<Confetti />} 
                    value="98"
                    symbol="%"
                    description="Clienti soddisfatti"
                />
                
                <StatsCard 
                    icon={<Detective />} 
                    value="53"
                    symbol=""
                    description="Agenti sul territorio"
                />
                
                <StatsCard 
                    icon={<CalendarCheck />} 
                    value="36"
                    symbol="gg"
                    description="Tempi medi di vendita"
                />
                
            </div>
        </div>
    );
};

export default Stats