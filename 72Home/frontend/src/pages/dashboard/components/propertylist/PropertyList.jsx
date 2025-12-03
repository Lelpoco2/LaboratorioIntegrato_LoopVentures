import React from 'react';
import './PropertyList.css';

export default function PropertyList() {
  const dummy = [
    { id: 1, address: "Via Roma 10", price: "€ 250.000" },
    { id: 2, address: "Corso Milano 45", price: "€ 320.000" },
  ];

  return (
    <div className="property-list">
      <h2 className="property-list-title">Immobili presi in carico</h2>
      <table className="property-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Indirizzo</th>
            <th>Prezzo stimato</th>
          </tr>
        </thead>
        <tbody>
          {dummy.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.address}</td>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
