import React, { useEffect, useState } from 'react';
import './PropertyList.css';
import { apiRequest } from '../../../../services/api';

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

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
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={4}>Caricamento...</td>
            </tr>
          )}
          {!loading && properties.length === 0 && (
            <tr>
              <td colSpan={4}>Nessun immobile preso in carico</td>
            </tr>
          )}
          {!loading && properties.map(p => (
            <tr key={p.id}>
              <td>{mapBuildingType(p.buildingType)}</td>
              <td>{formatAddress(p.address, p.civicNumber, p.zipCode)}</td>
              <td>{p.city || '-'}</td>
              <td>{formatPrice(p.latestEvaluationPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
