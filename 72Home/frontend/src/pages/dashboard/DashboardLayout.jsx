import React from 'react';
import Sidebar from './components/sidebar/SideBar';
import './DashBoard.css';

export default function DashboardLayout({ title, children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <h1 className="header-title">{title}</h1>
        </header>
        <div className="dashboard-body">
          {children}
        </div>
      </div>
    </div>
  );
}