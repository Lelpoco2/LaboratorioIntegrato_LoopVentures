import React, { useEffect } from 'react';
import DashboardLayout from '../../DashboardLayout';
import { PencilIcon, TrashIcon, EyeIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { apiRequest } from '../../../../services/api';
import './UsersPage.css';
import UsersInfoModale from './UsersInfoModale';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletionInfo, setDeletionInfo] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await apiRequest('/api/users', { method: 'GET' });
                const userList = (Array.isArray(data) ? data : []).map((u, index) => ({
                    id: u.id ?? index,
                    firstName: u.firstName ?? '-',
                    lastName: u.lastName ?? '-',
                    email: u.email ?? '-',
                    phone: u.phone ?? '-',
                }));
                setUsers(userList);
            } catch (err) {
                console.error('Failed to load users:', err);
                setError('Impossibile caricare gli utenti.');
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        setError('');
        try {
            console.log('Fetching deletion info for user ID:', id);
            // First, fetch deletion info
            const info = await apiRequest(`/api/users/${id}/deletion-info`, { method: 'GET' });
            console.log('Deletion info received:', info);
            setDeletionInfo(info);
            setDeleteModalOpen(true);
        } catch (err) {
            console.error('Failed to fetch deletion info:', err);
            setError(`Impossibile recuperare le informazioni di eliminazione: ${err.message}`);
        }
    };

    const confirmDelete = async () => {
        if (!deletionInfo) return;
        
        setDeleting(true);
        setError('');
        try {
            console.log('Deleting user ID:', deletionInfo.userId);
            const response = await apiRequest(`/api/users/${deletionInfo.userId}`, { method: 'DELETE' });
            console.log('Delete response:', response);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deletionInfo.userId));
            setDeleteModalOpen(false);
            setDeletionInfo(null);
        } catch (err) {
            console.error('Failed to delete user:', err);
            setError(`Impossibile eliminare l'utente: ${err.message}`);
            setDeleteModalOpen(false);
        } finally {
            setDeleting(false);
        }
    };

    const cancelDelete = () => {
        setDeleteModalOpen(false);
        setDeletionInfo(null);
    };

    const openUserModal = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    return (
        <DashboardLayout title="Gestione Utenti">
            <div className="users-container-dashboard">
                <div className="users-header">
                    <h1>Utenti</h1>
                    <div className="search-bar">
                        <input type="text" placeholder="Cerca cliente..." />
                        <button>Cerca</button>
                        {/* <button className="add-user">Aggiungi Utente</button> */}
                    </div>
                </div>
                {error && <div className="error-banner">{error}</div>}
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
                        {loading && (
                            <tr><td colSpan={5}>Caricamento…</td></tr>
                        )}
                        {!loading && users.length === 0 && (
                            <tr><td colSpan={5}>Nessun utente trovato</td></tr>
                        )}
                        {!loading && users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td className="actions">
                                    {/* <button className="edit"><PencilIcon /></button> */}
                                    <button className="delete" onClick={() => handleDelete(user.id)}><TrashIcon /></button>
                                    <button className="view light-brown" onClick={() => openUserModal(user)}><EyeIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalOpen && selectedUser && (
                <UsersInfoModale
                    data={selectedUser}
                    onClose={() => setModalOpen(false)}
                />
            )}
            {deleteModalOpen && deletionInfo && (
                <DeleteConfirmationModal
                    data={deletionInfo}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </DashboardLayout>
    );
}