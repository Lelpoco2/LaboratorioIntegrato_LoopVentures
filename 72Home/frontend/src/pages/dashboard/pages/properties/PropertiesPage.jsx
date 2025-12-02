import React from 'react';
import DashboardLayout from '../../DashboardLayout';
import { TrashIcon, PencilIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import './PropertiesPage.css';

export default function PropertiesPage() {
    const [properties, setProperties] = useState([
        { id: 1, tipologia: 'Appartamento', indirizzo: 'Via Dante 12', citta: 'Asti', prezzo: '€ 350.000', disponibilita: 'Disponibile' },
        { id: 2, tipologia: 'Casa', indirizzo: 'Via Appia 45', citta: 'Asti', prezzo: '€ 180.000', disponibilita: 'Non Disponibile' },
        { id: 3, tipologia: 'Appartamento', indirizzo: 'Corso Francia 220', citta: 'Torino', prezzo: '€ 480.000', disponibilita: 'Disponibile' },
    ]);

    const handleDelete = (id) => {
        setProperties((prevProperties) => prevProperties.filter((property) => property.id !== id));
    };

    return (
        <DashboardLayout title="Gestione Immobili">
            <div className="properties-container-dashboard">
                <div className="properties-header">
                    <h1>Immobili</h1>
                    <div className="search-bar">
                        <input type="text" placeholder="Cerca immobile (es. città, indirizzo)..." />
                        <button>Cerca</button>
                        <button className="add-property">Aggiungi immobile</button>
                    </div>
                </div>
                <table className="properties-table">
                    <thead>
                        <tr>
                            <th>Tipologia</th>
                            <th>Indirizzo</th>
                            <th>Città</th>
                            <th>Prezzo (€)</th>
                            <th>Disponibilità</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr key={property.id}>
                                <td>{property.tipologia}</td>
                                <td>{property.indirizzo}</td>
                                <td>{property.citta}</td>
                                <td>{property.prezzo}</td>
                                <td>{property.disponibilita}</td>
                                <td className="actions">
                                    <button className="edit"><PencilIcon /></button>
                                    <button className="delete" onClick={() => handleDelete(property.id)}><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}