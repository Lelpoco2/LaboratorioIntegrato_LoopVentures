import React from 'react';
import DashboardLayout from '../../DashboardLayout';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import './UsersPage.css';

export default function UsersPage() {
    const [users, setUsers] = useState([
        { id: 1, nome: 'Andrea', cognome: 'Riva', email: 'andrea.riva@email.it', telefono: '3331234567', codiceFiscale: 'RVAAND98A01H501J' },
        { id: 2, nome: 'Laura', cognome: 'Moretti', email: 'laura.moretti@email.it', telefono: '3342345678', codiceFiscale: 'MRRLRA90C45F205T' },
        { id: 3, nome: 'Giorgio', cognome: 'Ferrari', email: 'giorgio.ferrari@email.it', telefono: '3353456789', codiceFiscale: 'FRRGRG85M12L219U' },
        { id: 4, nome: 'Elena', cognome: 'Bianchi', email: 'elena.bianchi@email.it', telefono: '3364567890', codiceFiscale: 'BNCLNE92D56G789H' }
    ]);

    const handleDelete = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
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
                            <th>Codice Fiscale</th>
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
                                <td>{user.codiceFiscale}</td>
                                <td className="actions">
                                    <button className="edit"><PencilIcon /></button>
                                    <button className="delete" onClick={() => handleDelete(user.id)}><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}