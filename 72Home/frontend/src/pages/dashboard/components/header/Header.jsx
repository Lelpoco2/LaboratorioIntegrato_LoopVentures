import React from 'react';
import './Header.css';
import userAvatar from '../../../../assets/background/user.png';


export default function Header({ userName = "Admin" }) {
  return (
    <header className="header">
      <h1 className="header-title">Dashboard Immobili</h1>
      <div className="header-user-info">
        <span className="welcome-message">Benvenuto, {userName}</span>
        <img src={userAvatar} alt="Avatar" className="user-avatar" />
      </div>
    </header>
  );
}
