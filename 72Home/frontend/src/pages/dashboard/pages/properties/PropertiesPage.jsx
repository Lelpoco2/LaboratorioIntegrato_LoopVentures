import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import { TrashIcon, PencilIcon, EyeIcon } from '@phosphor-icons/react';
import './PropertiesPage.css';
import { apiRequest } from '../../../../services/api';
import PropertyDetailModal from './PropertyDetailModal';

export default function PropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await apiRequest('/api/properties', { method: 'GET' });
                // Response is an array directly, not wrapped in .properties
                const items = (Array.isArray(data) ? data : []).map((p, index) => ({
                    id: p.id || index, // Fallback to index if no id
                    tipologia: mapBuildingType(p.buildingType),
                    indirizzo: formatAddress(p.address, p.civicNumber),
                    citta: p.city,
                    prezzo: formatPrice(p.latestEvaluationPrice),
                    // TODO: disponibilita is not connected to backend yet, default to "Disponibile"
                    disponibilita: 'Disponibile',
                    // Full details for modal
                    fullData: {
                        tipologia: mapBuildingType(p.buildingType),
                        indirizzo: formatAddress(p.address, p.civicNumber),
                        citta: p.city,
                        prezzo: formatPrice(p.latestEvaluationPrice),
                        cap: p.zipCode,
                        stanze: p.rooms,
                        bagni: p.bathrooms,
                        superficie: formatSurface(p.surfaceArea),
                        piano: formatFloor(p.floor),
                        ascensore: boolToLabel(p.hasElevator),
                        balcone: boolToLabel(p.hasBalcony),
                        terrazzo: boolToLabel(p.hasTerrace),
                        giardino: boolToLabel(p.hasGarden),
                        box: boolToLabel(p.hasBox),
                        superficieBox: formatSurface(p.boxSurfaceArea),
                        cantina: boolToLabel(p.hasCanteen),
                        riscaldamento: mapHeatingType(p.heatingType),
                        condizione: mapCondition(p.condition),
                        classeEnergetica: p.energeticClass || '-',
                        creatoIl: formatDate(p.createdAt),
                    }
                }));
                setProperties(items);
            } catch (err) {
                console.error('Dashboard fetch failed', err);
                setError('Impossibile caricare gli immobili.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const formatAddress = (address, civic) => {
        if (!address) return '-';
        return civic ? `${address} ${civic}` : address;
    };

    const formatPrice = (price) => {
        if (price === null || price === undefined) return '-';
        const n = Number(price);
        if (!Number.isFinite(n)) return '-';
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(n);
    };

    const formatSurface = (sqm) => {
        if (sqm === null || sqm === undefined) return '-';
        const n = Number(sqm);
        return Number.isFinite(n) ? `${n} m²` : String(sqm);
    };

    const formatFloor = (floor) => {
        if (floor === null || floor === undefined) return '-';
        const n = Number(floor);
        if (!Number.isFinite(n)) return String(floor);
        if (n === 0) return 'Terra';
        return n;
    };

    const boolToLabel = (v) => (v ? 'Sì' : 'No');

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        try {
            const d = new Date(dateStr);
            return d.toLocaleDateString('it-IT');
        } catch {
            return dateStr;
        }
    };

    const buildingTypeMap = useMemo(() => ({
        APARTMENT: 'Appartamento',
        INDEPENDENT_HOUSE: 'Casa indipendente',
        VILLA: 'Villa',
    }), []);

    const mapBuildingType = (bt) => {
        if (!bt) return '-';
        const key = String(bt).toUpperCase();
        return buildingTypeMap[key] || bt;
    };

    const heatingMap = useMemo(() => ({
        CENTRALIZED: 'Centralizzato',
        INDEPENDENT: 'Autonomo',
        NONE: 'Nessuno',
    }), []);

    const mapHeatingType = (h) => {
        if (!h) return '-';
        const key = String(h).toUpperCase();
        return heatingMap[key] || h;
    };

    const conditionMap = useMemo(() => ({
        NEW: 'Nuovo',
        GOOD: 'Buono',
        NEEDS_RENOVATION: 'Da ristrutturare',
        BAD: 'Scarsa',
    }), []);

    const mapCondition = (c) => {
        if (!c) return '-';
        const key = String(c).toUpperCase();
        return conditionMap[key] || c;
    };

    const handleDelete = (id) => {
        setProperties((prevProperties) => prevProperties.filter((property) => property.id !== id));
    };

    const openDetailModal = (property) => {
        setSelectedProperty(property.fullData);
        setModalOpen(true);
    };

    return (
        <DashboardLayout title="Gestione Immobili">
            <div className="properties-container-dashboard">
                <div className="properties-header">
                    <h1>Immobili</h1>
                    <div className="search-bar">
                        <input type="text" placeholder="Cerca immobile (es. città, indirizzo)..." />
                        <button>Cerca</button>
                        {/* <button className="add-property">Aggiungi immobile</button> */}
                    </div>
                </div>
                {error && <div className="error-banner">{error}</div>}
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
                        {loading && (
                            <tr><td colSpan={6}>Caricamento…</td></tr>
                        )}
                        {!loading && properties.length === 0 && (
                            <tr><td colSpan={6}>Nessun immobile trovato</td></tr>
                        )}
                        {!loading && properties.map((property) => (
                            <tr key={property.id}>
                                <td>{property.tipologia}</td>
                                <td>{property.indirizzo}</td>
                                <td>{property.citta}</td>
                                <td>{property.prezzo}</td>
                                <td>{property.disponibilita}</td>
                                <td className="actions">
                                    <button className="edit"><PencilIcon /></button>
                                    <button className="delete" onClick={() => handleDelete(property.id)}><TrashIcon /></button>
                                    <button className="view light-brown" onClick={() => openDetailModal(property)}><EyeIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalOpen && selectedProperty && (
                <PropertyDetailModal
                    data={selectedProperty}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </DashboardLayout>
    );
}
