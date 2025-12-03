import React, { useEffect, useState } from 'react';
import './PropertyList.css';
import { apiRequest } from '../../../../services/api';
import { EyeIcon } from '@phosphor-icons/react';
import PropertyDetailModal from '../../pages/properties/PropertyDetailModal';
import UsersInfoModale from '../../pages/users/UsersInfoModale';

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const loadTakenProperties = async () => {
      setLoading(true);
      try {
        const data = await apiRequest('/api/admin/taken-properties', { method: 'GET' });
        setProperties(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load taken properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    loadTakenProperties();
  }, []);

  const formatAddress = (address, civicNumber, zipCode) => {
    if (!address) return '-';
    let result = civicNumber ? `${address} ${civicNumber}` : address;
    if (zipCode) {
      result += `, ${zipCode}`;
    }
    return result;
  };

  const formatPrice = (price) => {
    if (!price) return '-';
    return `€ ${price}`;
  };

  const buildingTypeMap = {
    APARTMENT: 'Appartamento',
    INDEPENDENT_HOUSE: 'Casa indipendente',
    VILLA: 'Villa',
  };

  const mapBuildingType = (bt) => {
    if (!bt) return '-';
    const key = String(bt).toUpperCase();
    return buildingTypeMap[key] || bt;
  };

  const heatingMap = {
    CENTRALIZED: 'Centralizzato',
    INDEPENDENT: 'Autonomo',
    NONE: 'Nessuno',
  };

  const mapHeatingType = (h) => {
    if (!h) return '-';
    const key = String(h).toUpperCase();
    return heatingMap[key] || h;
  };

  const conditionMap = {
    NEW: 'Nuovo',
    GOOD: 'Buono',
    NEEDS_RENOVATION: 'Da ristrutturare',
    BAD: 'Scarsa',
  };

  const mapCondition = (c) => {
    if (!c) return '-';
    const key = String(c).toUpperCase();
    return conditionMap[key] || c;
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

  const openPropertyModal = (property) => {
    const fullData = {
      tipologia: mapBuildingType(property.buildingType),
      indirizzo: formatAddress(property.address, property.civicNumber, property.zipCode),
      citta: property.city,
      prezzo: formatPrice(property.latestEvaluationPrice),
      cap: property.zipCode,
      stanze: property.rooms,
      bagni: property.bathrooms,
      superficie: formatSurface(property.surfaceArea),
      piano: formatFloor(property.floor),
      ascensore: boolToLabel(property.hasElevator),
      balcone: boolToLabel(property.hasBalcony),
      terrazzo: boolToLabel(property.hasTerrace),
      giardino: boolToLabel(property.hasGarden),
      box: boolToLabel(property.hasBox),
      superficieBox: formatSurface(property.boxSurfaceArea),
      cantina: boolToLabel(property.hasCanteen),
      riscaldamento: mapHeatingType(property.heatingType),
      condizione: mapCondition(property.condition),
      classeEnergetica: property.energeticClass || '-',
      creatoIl: formatDate(property.createdAt),
    };
    setSelectedProperty(fullData);
    setPropertyModalOpen(true);
  };

  const openUserModal = async (property) => {
    if (!property.id) return;
    
    setLoadingUser(true);
    try {
      // Fetch user by property ID using the new endpoint
      const userData = await apiRequest(`/api/users/by-property/${property.id}`, { method: 'GET' });
      
      if (userData) {
        setSelectedUser(userData);
        setUserModalOpen(true);
      } else {
        alert('Nessun utente associato a questa proprietà');
      }
    } catch (error) {
      console.error('Failed to load user details:', error);
      alert('Nessun utente associato a questa proprietà');
    } finally {
      setLoadingUser(false);
    }
  };

  return (
    <div className="property-list">
      <h2 className="property-list-title">Immobili presi in carico</h2>
      <table className="property-table">
        <thead>
          <tr>
            <th>Tipologia</th>
            <th>Indirizzo</th>
            <th>Città</th>
            <th>Prezzo stimato</th>
            <th>Dettaglio Utente</th>
            <th>Dettaglio Immobile</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6}>Caricamento...</td>
            </tr>
          )}
          {!loading && properties.length === 0 && (
            <tr>
              <td colSpan={6}>Nessun immobile preso in carico</td>
            </tr>
          )}
          {!loading && properties.map(p => (
            <tr key={p.id}>
              <td>{mapBuildingType(p.buildingType)}</td>
              <td>{formatAddress(p.address, p.civicNumber, p.zipCode)}</td>
              <td>{p.city || '-'}</td>
              <td>{formatPrice(p.latestEvaluationPrice)}</td>
              <td className="action-cell">
                <button 
                  className="view-button"
                  onClick={() => openUserModal(p)}
                  disabled={loadingUser}
                  title="Visualizza dettagli utente"
                >
                  <EyeIcon size={20} />
                </button>
              </td>
              <td className="action-cell">
                <button 
                  className="view-button"
                  onClick={() => openPropertyModal(p)}
                  title="Visualizza dettagli immobile"
                >
                  <EyeIcon size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {propertyModalOpen && selectedProperty && (
        <PropertyDetailModal
          data={selectedProperty}
          onClose={() => setPropertyModalOpen(false)}
        />
      )}
      {userModalOpen && selectedUser && (
        <UsersInfoModale
          data={selectedUser}
          onClose={() => setUserModalOpen(false)}
        />
      )}
    </div>
  );
}
