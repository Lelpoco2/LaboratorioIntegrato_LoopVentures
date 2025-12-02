import React from 'react';
import './UsersPage.css';

// Order fields for human-friendly overview and translate labels (exclude id, created_at)
const fieldOrder = [
  'address',
  'city',
  'zip_code',
  'civic_number',
  'building_type',
  'property_condition',
  'surface_area',
  'rooms',
  'bathrooms',
  'floor',
  'has_elevator',
  'has_balcony',
  'has_terrace',
  'has_garden',
  'has_box',
  'box_surface_area',
  'heating_type',
  'energetic_class',
];

const labelMap = {
  address: 'Indirizzo',
  city: 'Città',
  zip_code: 'CAP',
  civic_number: 'Numero Civico',
  building_type: 'Tipologia Edificio',
  property_condition: 'Condizione Immobile',
  surface_area: 'Superficie (mq)',
  rooms: 'Stanze',
  bathrooms: 'Bagni',
  floor: 'Piano',
  has_elevator: 'Ascensore',
  has_balcony: 'Balcone',
  has_terrace: 'Terrazzo',
  has_garden: 'Giardino',
  has_box: 'Box',
  box_surface_area: 'Superficie Box (mq)',
  heating_type: 'Tipo di Riscaldamento',
  energetic_class: 'Classe Energetica',
};

const formatValue = (key, value) => {
  if (typeof value === 'boolean') return value ? 'Sì' : 'No';
  if (key === 'created_at') {
    try {
      const d = new Date(value);
      return d.toLocaleString('it-IT');
    } catch {
      return value;
    }
  }
  return value;
};

export default function PropertyInfoModal({ data, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Dettagli Immobile</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          {fieldOrder.map((key) => (
            <div className="modal-row" key={key}>
              <span className="modal-label">{labelMap[key]}</span>
              <span className="modal-value">{formatValue(key, data?.[key]) ?? '-'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
