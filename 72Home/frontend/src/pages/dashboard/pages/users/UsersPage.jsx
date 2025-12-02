import React from 'react';
import DashboardLayout from '../../DashboardLayout';
import { PencilIcon, TrashIcon, EyeIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { apiRequest } from '../../../../services/api';
import './UsersPage.css';
import PropertyInfoModal from './PropertyInfoModal';

export default function UsersPage() {
    const [users, setUsers] = useState([
        { id: 1, nome: 'Andrea', cognome: 'Riva', email: 'andrea.riva@email.it', telefono: '3331234567' },
        { id: 2, nome: 'Laura', cognome: 'Moretti', email: 'laura.moretti@email.it', telefono: '3342345678' },
        { id: 3, nome: 'Giorgio', cognome: 'Ferrari', email: 'giorgio.ferrari@email.it', telefono: '3353456789' },
        { id: 4, nome: 'Elena', cognome: 'Bianchi', email: 'elena.bianchi@email.it', telefono: '3364567890' }
    ]);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const handleDelete = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    };

    const openPropertyModal = async (userId) => {
        try {
            // Fetch dashboard data and find property by user id (adjust mapping as needed)
            const data = await apiRequest('/api/admin/dashboard', { method: 'GET' });
            // Assume data.properties is an array; adjust based on actual response
            const property = (data?.properties || []).find(p => p.userId === userId) || null;
            // Fallback: if not found, keep null to show empty fields gracefully
            setSelectedProperty(property);
            setModalOpen(true);
        } catch (err) {
            console.error('Failed to load property details:', err);
            setSelectedProperty(null);
            setModalOpen(true);
        }
    };

    return (
        <DashboardLayout title="Gestione Utenti">
            <div className="users-container-dashboard">
                <div className="users-header">
                    <h1>Utenti</h1>
                    <div className="search-bar">
                        <input type="text" placeholder="Cerca cliente..." />
                        <button>Cerca</button>
                        <button className="add-user">Aggiungi Utente</button>
                    </div>
                </div>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.nome}</td>
                                <td>{user.cognome}</td>
                                <td>{user.email}</td>
                                <td>{user.telefono}</td>
                                <td className="actions">
                                    <button className="edit"><PencilIcon /></button>
                                    <button className="delete" onClick={() => handleDelete(user.id)}><TrashIcon /></button>
                                    <button className="view light-brown" onClick={() => openPropertyModal(user.id)}><EyeIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalOpen && selectedProperty && (
                <PropertyInfoModal
                    data={selectedProperty}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </DashboardLayout>
    );
}