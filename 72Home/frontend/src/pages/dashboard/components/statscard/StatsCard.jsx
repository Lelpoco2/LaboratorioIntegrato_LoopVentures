import React from 'react';
import './StatsCard.css';

export default function StatsCard({ title, value }) {
  return (
    <div className="stats-card">
      <div className="stats-card-title">{title}</div>
      <div className="stats-card-value">{value}</div>
    </div>
  );
}
