import React, { useEffect, useState } from 'react';
import './DashBoard.css';

import Sidebar from '../dashboard/components/sidebar/SideBar';
import Header from '../dashboard/components/header/Header';
import StatsCard from '../dashboard/components/statscard/StatsCard';
import PropertyList from '../dashboard/components/propertylist/PropertyList';
import { apiRequest } from '../../services/api';

const DashBoard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalEvaluations: 0,
    totalOmiZones: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await apiRequest('/api/admin/dashboard');
        
        if (data.statistics) {
          setStats(data.statistics);
        }
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento dei dati della dashboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-body">
          {error && <div className="error-message">Errore: {error}</div>}
          <div className="stats-section">
            <StatsCard 
              title="Totale Immobili" 
              value={loading ? '...' : stats.totalProperties} 
            />
            <StatsCard 
              title="Totale Zone OMI" 
              value={loading ? '...' : stats.totalOmiZones} 
            />
            <StatsCard 
              title="Valore medio degli immobili" 
              value={loading ? '...' : stats.averageEvaluationPrice + ' €'} 
            />
          </div>
          <div className="stats-section centered">
            <StatsCard 
              title="Utenti Totali" 
              value={loading ? '...' : stats.totalUsers} 
            />
          </div>
          <PropertyList />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
