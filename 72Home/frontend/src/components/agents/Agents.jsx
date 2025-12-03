import React, { useState, useEffect } from "react";
import "./Agents.css";
import { HouseLineIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import agent1Img from "../../assets/agents/agente_uomo1.avif";
import agent2Img from "../../assets/agents/agente_donna1.avif";
import agent3Img from "../../assets/agents/agente_donna2.avif";
import agent4Img from "../../assets/agents/agente_uomo2.avif";
import agent5Img from "../../assets/agents/agente_donna3.avif";
import agent6Img from "../../assets/agents/agente_uomo3.avif";

const agentsData = [
    {
        name: "Leonardo Ferrari",
        description: "Esperto di vendite immobiliari con anni di esperienza nel settore.",
        housesSold: 21,
        location: "Alessandria",
        image: agent1Img,
    },
    
    {
        name: "Lucia Moretti",
        description: "Specializzata in ville di lusso e architettura moderna.",
        housesSold: 46,
        location: "Torino",
        image: agent2Img,
    },
    {
        name: "Luisa Fioretti",
        description: "Professionista nel mercato urbano e appartamenti accoglienti.",
        housesSold: 7,
        location: "Asti",
        image: agent3Img,
    },
    {
        name: "Marco Bianchi",
        description: "Specialista in immobili commerciali e industriali.",
        housesSold: 15,
        location: "Torino",
        image: agent4Img,
    },
    {
        name: "Giulia Rossi",
        description: "Esperta in case vacanza e proprietà al mare.",
        housesSold: 30,
        location: "Asti",
        image: agent5Img,
    },
    {
        name: "Alessandro Verdi",
        description: "Consulente per investimenti immobiliari e proprietà di lusso.",
        housesSold: 25,
        location: "Alessandria",
        image: agent6Img,
    },
    
];

const Agents = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [agentsPerPage, setAgentsPerPage] = useState(window.innerWidth <= 768 ? 1 : 3); // Imposta il numero di agenti visibili in base alla larghezza iniziale

    useEffect(() => {
        const handleResize = () => {
            setAgentsPerPage(window.innerWidth <= 768 ? 1 : 3); // Aggiorna il numero di agenti visibili al ridimensionamento
            setCurrentIndex(0); // Resetta l'indice corrente per evitare incongruenze
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(agentsData.length / agentsPerPage));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(agentsData.length / agentsPerPage)) % Math.ceil(agentsData.length / agentsPerPage));
    };

    const visibleAgents = agentsData.slice(currentIndex * agentsPerPage, currentIndex * agentsPerPage + agentsPerPage);

    return (
        <section id="agents" className="agents-section">
            <h2>Agenti</h2>
            <p>Vendi in fretta e senza preoccupazioni con l'aiuto dei nostri professionisti!</p>
            <div className="carousel-container">
                <button className="carousel-button prev" onClick={handlePrev}>
                    <CaretLeftIcon size={40} weight="bold" />
                </button>
                <div className="agents-container">
                    {visibleAgents.map((agent, index) => (
                        <div key={index} className="agent-card">
                            <img src={agent.image} alt={agent.name} className="agent-image" loading="lazy" />
                            <h3>{agent.name}</h3>
                            <p>{agent.description}</p>
                            <div className="agent-info">
                                <span>
                                    {agent.housesSold} <HouseLineIcon size={20} weight="fill" />
                                </span>
                                <span>{agent.location}</span>
                            </div>
                            <button className="contact-button">Contatta</button>
                        </div>
                    ))}
                </div>
                <button className="carousel-button next" onClick={handleNext}>
                    <CaretRightIcon size={40} weight="bold" />
                </button>
            </div>
            <div className="carousel-dots">
                {Array.from({ length: Math.ceil(agentsData.length / agentsPerPage) }).map((_, pageIndex) => (
                    <span
                        key={pageIndex}
                        className={`dot ${pageIndex === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(pageIndex)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default Agents;