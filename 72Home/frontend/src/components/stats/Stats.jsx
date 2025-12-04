import './Stats.css';
import { HouseLineIcon, ConfettiIcon, DetectiveIcon, CalendarCheckIcon } from "@phosphor-icons/react";

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
                    icon={<HouseLineIcon />} 
                    value="250"
                    symbol="+"
                    description="Immobili venduti"
                />
                
                <StatsCard 
                    icon={<ConfettiIcon />} 
                    value="98"
                    symbol="%"
                    description="Clienti soddisfatti"
                />
                
                <StatsCard 
                    icon={<DetectiveIcon />} 
                    value="53"
                    symbol=""
                    description="Agenti sul territorio"
                />
                
                <StatsCard 
                    icon={<CalendarCheckIcon />} 
                    value="36"
                    symbol="gg"
                    description="Tempi medi di vendita"
                />
                
            </div>
        </div>
    );
};

export default Stats