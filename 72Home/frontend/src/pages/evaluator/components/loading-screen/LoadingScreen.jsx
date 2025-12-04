import React from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading-screen-overlay">
      <div className="loading-screen-content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h2 className="loading-title">Stiamo processando la tua richiesta</h2>
        <p className="loading-message">
          Attendere prego, stiamo valutando il tuo immobile...
        </p>
      </div>
    </div>
  );
}
