import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import { TrashIcon, PencilIcon } from '@phosphor-icons/react';
import './AgentsPage.css';
import { apiRequest } from '../../../../services/api';

export default function AgentsPage() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAgents = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await apiRequest('/api/admin/special-users', { method: 'GET' });
                const formattedAgents = (Array.isArray(data) ? data : []).map(user => ({
                    id: user.id,
                    nome: user.firstName || '-',
                    cognome: user.lastName || '-',
                    email: user.email || '-',
                    telefono: user.phone || '-',
                    citta: '-', // Not available in backend model
                    roles: user.roles || []
                }));
                setAgents(formattedAgents);
            } catch (err) {
                console.error('Failed to fetch agents:', err);
                setError(`Impossibile caricare gli agenti: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

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
                        {/* <button className="add-agent">Aggiungi Agente</button> */}
                    </div>
                </div>
                {error && <div className="error-banner">{error}</div>}
                <table className="agents-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            {/* <th>Città</th> */}
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr><td colSpan={6}>Caricamento…</td></tr>
                        )}
                        {!loading && agents.length === 0 && (
                            <tr><td colSpan={6}>Nessun agente trovato</td></tr>
                        )}
                        {!loading && agents.map((agent) => (
                            <tr key={agent.id}>
                                <td>{agent.nome}</td>
                                <td>{agent.cognome}</td>
                                <td>{agent.email}</td>
                                <td>{agent.telefono}</td>
                                {/* <td>{agent.citta}</td> */}
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