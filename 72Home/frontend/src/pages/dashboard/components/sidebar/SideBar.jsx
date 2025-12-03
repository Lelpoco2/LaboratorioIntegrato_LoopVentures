import React from 'react';
import './SideBar.css';
import { GaugeIcon, UsersThreeIcon, UserIcon, BuildingsIcon, SignOutIcon } from '@phosphor-icons/react';
import { Link, NavLink } from 'react-router-dom';
import EstimoraLogo from "../../../../assets/logo/estimora-logo.svg";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={EstimoraLogo} alt="Logo di Estimora" className="logo-sidebar" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/dashboard" end>
              <GaugeIcon className="icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/agenti">
              <UserIcon className="icon" /> Agenti
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/utenti">
              <UsersThreeIcon className="icon" /> Utenti
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/immobili">
              <BuildingsIcon className="icon" /> Immobili
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <Link to="/" className="logout-button">
          <SignOutIcon className="icon" /> Logout
        </Link>
      </div>
    </aside>
  );
}
