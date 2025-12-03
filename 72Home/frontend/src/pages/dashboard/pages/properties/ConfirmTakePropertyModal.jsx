import React from 'react';
import './ConfirmTakePropertyModal.css';

export default function ConfirmTakePropertyModal({ property, onConfirm, onCancel }) {
  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-card">
        <div className="confirm-modal-header">
          <h3>Conferma Presa in Carico</h3>
        </div>
        <div className="confirm-modal-content">
          <p>Sei sicuro di voler prendere in carico questo immobile?</p>
          {property && (
            <div className="property-summary">
              <div className="summary-row">
                <span className="summary-label">Tipologia:</span>
                <span className="summary-value">{property.tipologia}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Indirizzo:</span>
                <span className="summary-value">{property.indirizzo}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Città:</span>
                <span className="summary-value">{property.citta}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Prezzo:</span>
                <span className="summary-value">{property.prezzo}</span>
              </div>
            </div>
          )}
        </div>
        <div className="confirm-modal-footer">
          <button className="cancel-button" onClick={onCancel}>
            Annulla
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
}
