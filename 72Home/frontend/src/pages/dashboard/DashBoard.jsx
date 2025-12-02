import React from 'react';
import './DashBoard.css';

import Sidebar from '../dashboard/components/sidebar/SideBar';
import Header from '../dashboard/components/header/Header';
import StatsCard from '../dashboard/components/statscard/StatsCard';
import PropertyList from '../dashboard/components/propertylist/PropertyList';

const DashBoard = () => {
  const stats = {
    immobili: 3,
    utenti: 3,
    agenti: 3,
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-body">
          <div className="stats-section">
            <StatsCard title="Totale Immobili" value={stats.immobili} />
            <StatsCard title="Prezzo Medio" value="€300,000" />
            <StatsCard title="Valutazioni in Sospeso" value="15" />
          </div>
          <div className="stats-section centered">
            <StatsCard title="Utenti" value={stats.utenti} />
            <StatsCard title="Agenti" value={stats.agenti} />
          </div>
          <PropertyList />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
