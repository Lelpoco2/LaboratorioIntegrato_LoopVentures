import React, { useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import { TrashIcon, PencilIcon } from '@phosphor-icons/react';
import './AgentsPage.css';

export default function AgentsPage() {
    const [agents, setAgents] = useState([
        { id: 1, nome: 'Marco', cognome: 'Verdi', email: 'marco.verdi@gmail.com', telefono: '3456789012', citta: 'Alessandria' },
        { id: 2, nome: 'Chiara', cognome: 'Neri', email: 'chiara.neri@gmail.com', telefono: '3471234567', citta: 'Torino' },
        { id: 3, nome: 'Giulia', cognome: 'Conti', email: 'giulia.conti@gmail.com', telefono: '3499876543', citta: 'Torino' },
        { id: 4, nome: 'Luca', cognome: 'Rossi', email: 'luca.rossi@gmail.com', telefono: '3465432198', citta: 'Asti' },
    ]);

    const handleDelete = (id) => {
        setAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== id));
    };

    return (
        <DashboardLayout title="Gestione Agenti">
            <div className="agents-container-dashboard">
                <div className="agents-header">
                    <h1>Agenti</h1>
                    <div className="search-bar">
                        <input type="text" placeholder="Cerca agente..." />
                        <button>Cerca</button>
                        <button className="add-agent">Aggiungi Agente</button>
                    </div>
                </div>
                <table className="agents-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Città</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map((agent) => (
                            <tr key={agent.id}>
                                <td>{agent.nome}</td>
                                <td>{agent.cognome}</td>
                                <td>{agent.email}</td>
                                <td>{agent.telefono}</td>
                                <td>{agent.citta}</td>
                                <td className="actions">
                                    <button className="edit"><PencilIcon /></button>
                                    <button className="delete" onClick={() => handleDelete(agent.id)}><TrashIcon  /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}