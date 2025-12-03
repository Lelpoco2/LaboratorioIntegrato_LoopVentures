import React from 'react';
import './PropertiesPage.css';

const fieldOrder = [
  'tipologia',
  'indirizzo',
  'citta',
  'cap',
  'prezzo',
  'superficie',
  'stanze',
  'bagni',
  'piano',
  'ascensore',
  'balcone',
  'terrazzo',
  'giardino',
  'box',
  'superficieBox',
  'cantina',
  'riscaldamento',
  'condizione',
  'classeEnergetica',
];

const labelMap = {
  tipologia: 'Tipologia',
  indirizzo: 'Indirizzo',
  citta: 'Città',
  cap: 'CAP',
  prezzo: 'Prezzo',
  superficie: 'Superficie',
  stanze: 'Stanze',
  bagni: 'Bagni',
  piano: 'Piano',
  ascensore: 'Ascensore',
  balcone: 'Balcone',
  terrazzo: 'Terrazzo',
  giardino: 'Giardino',
  box: 'Box',
  superficieBox: 'Superficie Box',
  cantina: 'Cantina',
  riscaldamento: 'Riscaldamento',
  condizione: 'Condizione',
  classeEnergetica: 'Classe Energetica',
  creatoIl: 'Creato il',
};

export default function PropertyDetailModal({ data, onClose }) {
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
              <span className="modal-value">{data?.[key] ?? '-'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
