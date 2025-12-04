import React from 'react';
import './UsersPage.css';

const fieldOrder = ['firstName', 'lastName', 'email', 'phone'];

const labelMap = {
  firstName: 'Nome',
  lastName: 'Cognome',
  email: 'Email',
  phone: 'Telefono',
};

export default function UsersInfoModale({ data, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Dettagli Utente</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          {fieldOrder.map((key) => (
            <div className="modal-row" key={key}>
              <span className="modal-label">{labelMap[key]}</span>
              <span className="modal-value">{data?.[key] ?? '-'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
