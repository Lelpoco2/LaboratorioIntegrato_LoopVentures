import React, { useState, useEffect } from "react";
import "./Agents.css";
import { HouseLineIcon, CaretLeftIcon, CaretRightIcon, MapPinIcon, WhatsappLogoIcon, XIcon } from "@phosphor-icons/react";
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
        whatsapp: "+39 342 765 8421",
    },

    {
        name: "Lucia Moretti",
        description: "Specializzata in ville di lusso e architettura moderna.",
        housesSold: 46,
        location: "Torino",
        image: agent2Img,
        whatsapp: "+39 348 921 3456",
    },
    {
        name: "Luisa Fioretti",
        description: "Professionista nel mercato urbano e appartamenti accoglienti.",
        housesSold: 7,
        location: "Asti",
        image: agent3Img,
        whatsapp: "+39 345 678 2190",
    },
    {
        name: "Marco Bianchi",
        description: "Specialista in immobili commerciali e industriali.",
        housesSold: 15,
        location: "Torino",
        image: agent4Img,
        whatsapp: "+39 349 087 5432",
    },
    {
        name: "Giulia Rossi",
        description: "Esperta in case vacanza e proprietà al mare.",
        housesSold: 30,
        location: "Asti",
        image: agent5Img,
        whatsapp: "+39 347 234 9876",
    },
    {
        name: "Alessandro Verdi",
        description: "Consulente per investimenti immobiliari e proprietà di lusso.",
        housesSold: 25,
        location: "Alessandria",
        image: agent6Img,
        whatsapp: "+39 346 512 8765",
    },

];

const Agents = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [agentsPerPage, setAgentsPerPage] = useState(() => {
        const width = window.innerWidth;
        if (width <= 780) return 1;
        if (width <= 1200) return 2;
        return 3;
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let newAgentsPerPage;
            if (width <= 780) {
                newAgentsPerPage = 1;
            } else if (width <= 1200) {
                newAgentsPerPage = 2;
            } else {
                newAgentsPerPage = 3;
            }
            setAgentsPerPage(newAgentsPerPage);
            setCurrentIndex(0);
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

    const openModal = (agent) => {
        setSelectedAgent(agent);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedAgent(null);
    };

    const visibleAgents = agentsData.slice(currentIndex * agentsPerPage, currentIndex * agentsPerPage + agentsPerPage);

    return (
        <div className="agents-section-container">

            <section id="agents" className="agents-section">
                <div className="agents-header">
                    <h1 className="title">Agenti</h1>
                    <h3 className="subtitle">Vendi in fretta e senza preoccupazioni con l'aiuto dei nostri professionisti!</h3>
                </div>
                <div className="carousel-container">
                    <button className="carousel-button prev" onClick={handlePrev}>
                        <CaretLeftIcon size={40} weight="bold" />
                    </button>
                    <div className="agents-container">
                        {visibleAgents.map((agent, index) => (
                            <div key={index} className="agent-card">
                                <img src={agent.image} alt={agent.name} className="agent-image" loading="lazy" />
                                <h3>{agent.name}</h3>
                                <p className="agent-description">{agent.description}</p>
                                <div className="agent-separator"></div>
                                <div className="agent-info">
                                    <span className="agent-houses">
                                        <HouseLineIcon size={20} weight="fill" /> {agent.housesSold}
                                    </span>
                                    <span className="agent-location">
                                        <MapPinIcon size={16} weight="fill" />
                                        {agent.location}
                                    </span>
                                </div>
                                <button className="contact-button" onClick={() => openModal(agent)}>Contatta</button>
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

            {modalOpen && selectedAgent && (
                <div className="agent-modal-overlay" onClick={closeModal}>
                    <div className="agent-modal-card" onClick={(e) => e.stopPropagation()}>
                        <button className="agent-modal-close" onClick={closeModal}>
                            <XIcon size={24} weight="bold" />
                        </button>
                        <div className="agent-modal-content">
                            <WhatsappLogoIcon size={60} weight="fill" className="agent-modal-icon" />
                            <h3>Contatta {selectedAgent.name}</h3>
                            <p className="agent-modal-subtitle">Chatta direttamente su WhatsApp</p>
                            <a 
                                href={`https://wa.me/${selectedAgent.whatsapp.replace(/\s/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="agent-modal-whatsapp-button"
                            >
                                <WhatsappLogoIcon size={20} weight="fill" />
                                {selectedAgent.whatsapp}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Agents;